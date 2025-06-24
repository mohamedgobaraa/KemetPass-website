import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Upload folders
WHERE_IM_UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads', 'where_im')
WHO_AM_I_UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads', 'who_am_i')
TRANSLATE_UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads', 'translate')

# Create upload folders if they don't exist
for folder in [WHERE_IM_UPLOAD_FOLDER, WHO_AM_I_UPLOAD_FOLDER, TRANSLATE_UPLOAD_FOLDER]:
    os.makedirs(folder, exist_ok=True)

# Model paths
TRANSLATE_MODEL_PATH = os.path.join(BASE_DIR, "models", "Egyptian_hieroglyphic_Model_classification.h5")
TRANSLATE_LABEL_ENCODER_PATH = os.path.join(BASE_DIR, "models", "Egyptian_hieroglyphic_label_encoder.joblib")

# API Keys
WHERE_IM_CLIENT_KEY = "API"
TRANSLATE_CLIENT_KEY = "API"

# Chatbot settings
CHATBOT_MAX_MEMORY = 50

# CORS settings
CORS_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:5555",
    "http://127.0.0.1:5555"
]

# Flask settings
class Config:
    SQLALCHEMY_DATABASE_URI = "sqlite:///users.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    STATIC_FOLDER = "GoldenPaws"
    STATIC_URL_PATH = "/" 