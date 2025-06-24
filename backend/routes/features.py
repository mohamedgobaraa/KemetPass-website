from flask import Blueprint, jsonify, request, send_from_directory
from werkzeug.utils import secure_filename
import os
from groq import Groq
from utils.image_processing import (
    find_most_similar_place_where_im,
    who_am_i_find_most_similar_person,
    predict_translate_class,
    load_where_im_features,
    who_am_i_load_precomputed_features
)
from config import (
    WHERE_IM_UPLOAD_FOLDER,
    WHO_AM_I_UPLOAD_FOLDER,
    TRANSLATE_UPLOAD_FOLDER,
    TRANSLATE_MODEL_PATH,
    TRANSLATE_LABEL_ENCODER_PATH,
    WHERE_IM_CLIENT_KEY,
    TRANSLATE_CLIENT_KEY,
    CHATBOT_MAX_MEMORY
)
from tensorflow.keras.models import load_model
import joblib
from datetime import datetime, timedelta
import json
from pathlib import Path
import faiss
import google.generativeai as genai
import pandas as pd
from sentence_transformers import SentenceTransformer

# Define response directories
TRIP_PLANNER_RESPONSES_DIR = os.path.join(os.path.dirname(__file__), '..', 'responses', 'trip_plans')
os.makedirs(TRIP_PLANNER_RESPONSES_DIR, exist_ok=True)

# Initialize trip planner components
PROJECT_ROOT = Path(__file__).resolve().parent.parent
data_dir = PROJECT_ROOT / "models"
df = pd.read_csv(data_dir / "historical_places.csv")
index = faiss.read_index(str(data_dir / "historical_places.index"))
encoder = SentenceTransformer("all-mpnet-base-v2")

# Configure Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", default="API")
if not GEMINI_API_KEY:
    raise EnvironmentError("GEMINI_API_KEY missing - add it to .env")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

# Trip planner constants
SYSTEM_GUIDE = (
    "You are an award-winning local guide. Generate a day-by-day itinerary "
    "with realistic timings, logical routing, transport hints and cultural notes."
)

SCHEMA = {
    "type": "object",
    "properties": {
        "city": {"type": "string"},
        "days": {"type": "integer"},
        "plan": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "day": {"type": "integer"},
                    "date": {"type": "string"},
                    "entries": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "time": {"type": "string"},
                                "place_name": {"type": "string"},
                                "activity": {"type": "string"},
                                "notes": {"type": "string"},
                            },
                            "required": ["time", "place_name", "activity"],
                        },
                    },
                },
                "required": ["day", "date", "entries"],
            },
        },
    },
    "required": ["city", "days", "plan"],
}

def search_places(query: str, k: int = 5):
    emb = encoder.encode([query])
    _, idx = index.search(emb, k)
    return df.iloc[idx[0]].to_dict("records")

def build_content(user_prefs, places):
    msg = (
        SYSTEM_GUIDE
        + "\nTraveller preferences JSON:\n"
        + json.dumps(user_prefs, ensure_ascii=False)
        + "\nCandidate historical places JSON:\n"
        + json.dumps(places, ensure_ascii=False)
    )
    return [{"role": "user", "parts": [msg]}]

def generate_itinerary(prefs, k: int = 6):
    places = search_places(prefs["query"], k)
    content = build_content(prefs, places)

    resp = model.generate_content(
        contents=content,
        generation_config={
            "temperature": 0.7,
            "response_mime_type": "application/json",
            "response_schema": SCHEMA,
        },
    )

    return json.loads(resp.text)

features_bp = Blueprint('features', __name__)

# Initialize models and clients
WHERE_IM_CLIENT = Groq(api_key=WHERE_IM_CLIENT_KEY)
TRANSLATE_CLIENT = Groq(api_key=TRANSLATE_CLIENT_KEY)
# TRANSLATE_MODEL = load_model(TRANSLATE_MODEL_PATH)
# TRANSLATE_LABEL_ENCODER = joblib.load(TRANSLATE_LABEL_ENCODER_PATH)

# Load features
try:
    load_where_im_features("WHERE_IM_image_features.pkl")
except Exception as e:
    print(f"Failed to load features at startup: {str(e)}")

WHO_AM_I_FEATURES, WHO_AM_I_LABELS, WHO_AM_I_IMAGE_PATHS = who_am_i_load_precomputed_features("models/who_am_i_features.pkl")

# Chatbot memory
CHATBOT_MEMORY = []

def add_to_chatbot_memory(role, content):
    CHATBOT_MEMORY.append({"role": role, "content": content})
    if len(CHATBOT_MEMORY) > CHATBOT_MAX_MEMORY:
        CHATBOT_MEMORY.pop(0)


@features_bp.route('/predict_where_im', methods=['POST'])
def predict_where_im():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400

        filename = secure_filename(file.filename)
        filepath = os.path.join(WHERE_IM_UPLOAD_FOLDER, filename)
        print(f"Saving file to: {filepath}")
        file.save(filepath)

        try:
            most_similar_place = find_most_similar_place_where_im(filepath)
            print(f"Found most similar place: {most_similar_place}")
        except Exception as e:
            print(f"Error finding similar place: {str(e)}")
            return jsonify({"error": f"Error processing image: {str(e)}"}), 500
        finally:
            if os.path.exists(filepath):
                os.remove(filepath)

        return jsonify({"place": most_similar_place})

    except Exception as e:
        print(f"Error in predict_where_im: {str(e)}")
        return jsonify({"error": str(e)}), 500

@features_bp.route('/who_am_i', methods=['POST'])
def who_am_i_endpoint():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400

        filepath = os.path.join(WHO_AM_I_UPLOAD_FOLDER, secure_filename(file.filename))
        print(f"Saving file to: {filepath}")
        file.save(filepath)

        try:
            label, image_path = who_am_i_find_most_similar_person(filepath, WHO_AM_I_FEATURES, WHO_AM_I_LABELS, WHO_AM_I_IMAGE_PATHS)
            print(f"Found person: {label}")

            if label == "Unknown":
                return jsonify({"error": "Could not identify the person in the image."}), 404

            person_info = {
                "person": label,
                "title": "Historical Figure",
                "period": "Ancient Egypt",
                "description": "A significant figure from ancient Egyptian history.",
                "reference_image": image_path,
                "confidence": 95
            }

            return jsonify(person_info)

        except Exception as e:
            print(f"Error finding similar person: {str(e)}")
            return jsonify({"error": f"Error processing image: {str(e)}"}), 500
        finally:
            if os.path.exists(filepath):
                os.remove(filepath)

    except Exception as e:
        print(f"Error in who_am_i_endpoint: {str(e)}")
        return jsonify({"error": str(e)}), 500

def generate_translate_sentence(predicted_classes):
    combined_context = ", ".join(predicted_classes)
    messages = [
        {
            "role": "system",
            "content": """
            You are an advanced AI Egyptologist at the forefront of linguistic and cultural interpretation, uniquely designed to decode
            and articulate the messages of ancient Egyptian hieroglyphics with exceptional depth and accuracy. Your role begins with
            receiving a single or multi-classification result from an image recognition model, which identifies one or more hieroglyphic
            symbols. Using this input, you are tasked with synthesizing the classified symbols into a fluent, meaningful sentence that
            reflects their literal and contextual significance. You must analyze the phonetic, symbolic, and grammatical elements of
            the hieroglyphs, reconstructing their intended message with precision. Additionally, you enrich your translation by
            integrating cultural, historical, and ceremonial context, ensuring the message resonates with its original purpose
            and tone. While your response must capture the essence and depth of the hieroglyphic message, it should remain concise
            and not overly long, delivering clarity and impact without unnecessary complexity, give me a short answer and give me the sentence directly without 
                any extra information or text and make it as short as possible.
            """
        },
        {"role": "user", "content": f"Context: {combined_context}"}
    ]

    request_params = {
        "model": "llama3-70b-8192",
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": 64,
        "top_p": 1,
        "stream": True,
        "stop": None,
    }

    try:
        completion = TRANSLATE_CLIENT.chat.completions.create(**request_params)
        response_content = ""
        for chunk in completion:
            if hasattr(chunk, 'choices') and len(chunk.choices) > 0:
                delta = chunk.choices[0].delta
                if hasattr(delta, 'content') and delta.content:
                    response_content += delta.content
        return response_content.strip()
    except Exception as e:
        return f"Error generating translation: {e}"

# @features_bp.route('/translate_hieroglyphic', methods=['POST'])
# def translate_hieroglyphics():
#     try:
#         if 'files' not in request.files:
#             return jsonify({"error": "No files part in the request"}), 400

#         files = request.files.getlist('files')
#         if not files or not (1 <= len(files) <= 10):
#             return jsonify({"error": "You can upload between 1 and 10 images."}), 400

#         predicted_classes = []
#         for file in files:
#             if file.filename == '':
#                 return jsonify({"error": "One of the files has no filename."}), 400
#             filename = secure_filename(file.filename)
#             filepath = os.path.join(TRANSLATE_UPLOAD_FOLDER, filename)
#             file.save(filepath)
#             predicted_class = predict_translate_class(filepath, TRANSLATE_MODEL, TRANSLATE_LABEL_ENCODER)
#             predicted_classes.append(predicted_class)
#             os.remove(filepath)

#         translation = generate_translate_sentence(predicted_classes)
#         return jsonify({"translation": translation, "classes": predicted_classes})

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

@features_bp.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        print("Received chat request:", data)
        
        context = data.get('context', '')
        question = data.get('question', '')

        if not question:
            print("No question provided")
            return jsonify({"error": "Question is required"}), 400

        add_to_chatbot_memory("user", f"Context: {context}\nQuestion: {question}")

        messages = [
            {
                "role": "system",
                "content": """
                You are a chatbot specializing in Ancient Egyptian history. 
                Answer only questions related to pharaonic figures, ancient Egyptian stories, historical sites, Egyptian identity, pyramids, and ancient Egyptian history. 
                If you don't know the answer, respond with: "I have not been provided with sufficient information on this topic."
                Always reply in English only, using a concise and easy-to-understand style.
                """
            }
        ] + CHATBOT_MEMORY

        print("Sending request to Groq API...")
        request_params = {
            "model": "llama3-70b-8192",
            "messages": messages,
            "temperature": 0.7,
            "max_tokens": 1024,
            "top_p": 1,
            "stream": True,
            "stop": None,
        }

        completion = TRANSLATE_CLIENT.chat.completions.create(**request_params)
        response_content = ""

        for chunk in completion:
            if hasattr(chunk, 'choices') and len(chunk.choices) > 0:
                delta = chunk.choices[0].delta
                if hasattr(delta, 'content') and delta.content:
                    response_content += delta.content

        print("Received response from Groq API:", response_content)
        add_to_chatbot_memory("assistant", response_content)
        return jsonify({"response": response_content})

    except Exception as e:
        print("Error in chat endpoint:", str(e))
        return jsonify({"error": str(e)}), 500

@features_bp.route("/game")
def game():
    # serve game index.html from the game folder
    return send_from_directory("GoldenPaws", "index.html")

@features_bp.route('/trip_planner', methods=['POST'])
def trip_planner():
    try:
        data = request.get_json()
        
        if not data:
            print("No data provided in request")
            return jsonify({"error": "No data provided"}), 400

        required_fields = ["query", "start", "days", "budget"]
        missing_fields = [field for field in required_fields if field not in data]
        
        if missing_fields:
            print(f"Missing required fields: {missing_fields}")
            return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

        # Validate data types
        try:
            data["days"] = int(data["days"])
        except (ValueError, TypeError):
            return jsonify({"error": "Days must be an integer"}), 400

        # Validate date format
        try:
            datetime.strptime(data["start"], "%Y-%m-%d")
        except ValueError:
            return jsonify({"error": "Start date must be in YYYY-MM-DD format"}), 400

        # Validate budget
        valid_budgets = ["shoestring", "comfort", "luxury"]
        if data["budget"].lower() not in valid_budgets:
            return jsonify({"error": f"Budget must be one of: {', '.join(valid_budgets)}"}), 400

        # Generate itinerary
        itinerary = generate_itinerary(data)

        # Save the itinerary to a file
        response_file = os.path.join(TRIP_PLANNER_RESPONSES_DIR, f"itinerary_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json")

        with open(response_file, 'w', encoding='utf-8') as f:
            json.dump(itinerary, f, indent=2, ensure_ascii=False)

        print(f"Itinerary saved to {response_file}")

        return jsonify(itinerary)

    except Exception as e:
        print(f"Error in trip_planner endpoint: {str(e)}")
        return jsonify({"error": str(e)}), 500
