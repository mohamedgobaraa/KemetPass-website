import os
import pickle
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.vgg16 import VGG16, preprocess_input
from sklearn.metrics.pairwise import cosine_similarity
from tensorflow.keras.models import load_model

# Initialize models
WHO_AM_I_MODEL = VGG16(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
WHERE_IM_MODEL = VGG16(weights='imagenet', include_top=False, input_shape=(224, 224, 3))

# Global variables for features
WHERE_IM_FEATURES = None
WHERE_IM_LABELS = None
WHERE_IM_IMAGE_PATHS = None

def load_where_im_features(feature_file="WHERE_IM_image_features.pkl"):
    global WHERE_IM_FEATURES, WHERE_IM_LABELS, WHERE_IM_IMAGE_PATHS
    feature_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "models", feature_file)
    print(f"Loading features from: {feature_path}")
    if not os.path.exists(feature_path):
        raise FileNotFoundError(f"Features file not found at {feature_path}")
    try:
        with open(feature_path, "rb") as f:
            data = pickle.load(f)
        WHERE_IM_FEATURES, WHERE_IM_LABELS, WHERE_IM_IMAGE_PATHS = (
            data["features"],
            data["labels"],
            data["image_paths"],
        )
        print(f"Successfully loaded features. Shape: {WHERE_IM_FEATURES.shape if WHERE_IM_FEATURES is not None else 'None'}")
    except Exception as e:
        print(f"Error loading features: {str(e)}")
        raise FileNotFoundError(f"Error loading Where Am I features file: {e}")

def preprocess_image_where_im(img_path, target_size=(224, 224)):
    img = image.load_img(img_path, target_size=target_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    return preprocess_input(img_array)

def extract_where_im_features(path):
    img = preprocess_image_where_im(path, target_size=(224, 224))
    features = WHERE_IM_MODEL.predict(img)
    return features.flatten()

def find_most_similar_place_where_im(query_img_path):
    query_feature = extract_where_im_features(query_img_path).reshape(1, -1)
    if WHERE_IM_FEATURES is None or len(WHERE_IM_FEATURES) == 0:
        return "Unknown Place"

    similarities = cosine_similarity(query_feature, WHERE_IM_FEATURES)[0]
    if len(similarities) == 0:
        return "Unknown Place"
    most_similar_index = np.argmax(similarities)
    return WHERE_IM_LABELS[most_similar_index]

def who_am_i_load_precomputed_features(feature_file="who_am_i_features.pkl"):
    try:
        feature_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), feature_file)
        with open(feature_path, "rb") as f:
            data = pickle.load(f)
        return data["features"], data["labels"], data["image_paths"]
    except Exception as e:
        raise FileNotFoundError(f"Error loading feature file: {e}")

def who_am_i_preprocess_image(img_path, target_size=(224, 224)):
    img = image.load_img(img_path, target_size=target_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    return preprocess_input(img_array)

def who_am_i_extract_features(img_path):
    processed_image = who_am_i_preprocess_image(img_path)
    return WHO_AM_I_MODEL.predict(processed_image).flatten()

def who_am_i_find_most_similar_person(img_path, features, labels, image_paths):
    query_features = who_am_i_extract_features(img_path).reshape(1, -1)
    similarities = cosine_similarity(query_features, features)[0]
    
    if len(similarities) == 0:
        return "Unknown", None

    most_similar_index = np.argmax(similarities)
    most_similar_label = labels[most_similar_index]
    most_similar_image_path = image_paths[most_similar_index]
    return most_similar_label, most_similar_image_path

def preprocess_translate_image(img_path):
    img = image.load_img(img_path, target_size=(128, 128))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0
    return img_array

def predict_translate_class(img_path, model, label_encoder):
    processed_image = preprocess_translate_image(img_path)
    predictions = model.predict(processed_image)
    predicted_class_index = np.argmax(predictions, axis=1)
    return label_encoder.inverse_transform(predicted_class_index)[0] 