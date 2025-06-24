from flask import Blueprint, send_from_directory, render_template
import os

game_bp = Blueprint('game', __name__)

@game_bp.route("/game")
def game():
    # serve game index.html from the game folder
    return send_from_directory("GoldenPaws", "index.html")

@game_bp.route("/game/<path:filename>")
def serve_game_files(filename):
    # serve game files (js, data, wasm, media, etc.)
    if os.path.exists(os.path.join("GoldenPaws", filename)):
        return send_from_directory("GoldenPaws", filename)
    # If file not found, return the main game page
    return send_from_directory("GoldenPaws", "index.html") 
