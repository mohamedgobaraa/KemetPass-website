from flask import Blueprint, send_from_directory, render_template
import os

ar_bp = Blueprint('ar', __name__)

@ar_bp.route("/ar")
def ar():
    # serve game index.html from the game folder
    return send_from_directory("GoldenPaws", "ar.html")

@ar_bp.route("/ar/<path:filename>")
def serve_ar_files(filename):
    # serve game files (js, data, wasm, media, etc.)
    if os.path.exists(os.path.join("GoldenPaws", filename)):
        return send_from_directory("GoldenPaws", filename)
    # If file not found, return the main game page
    return send_from_directory("GoldenPaws", "ar.html")

