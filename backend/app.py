from flask import Flask, send_from_directory
from flask_cors import CORS
import os
import mimetypes
from config import Config, CORS_ORIGINS
from models.db import init_db
from routes.auth import auth_bp
from routes.features import features_bp
from routes.game import game_bp
from routes.ar import ar_bp

# Ensure WebAssembly gets correct MIME type
mimetypes.add_type("application/wasm", ".wasm")

app = Flask(__name__, static_folder=Config.STATIC_FOLDER, static_url_path=Config.STATIC_URL_PATH)
app.config.from_object(Config)

# Configure CORS
CORS(app, resources={
    r"/*": {
        "origins": CORS_ORIGINS,
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization", "Accept"],
        "supports_credentials": True
    }
})

# Initialize database
init_db(app)

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(features_bp)
app.register_blueprint(game_bp)
app.register_blueprint(ar_bp)

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5555, debug=True)
