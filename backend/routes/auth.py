from flask import Blueprint, jsonify, request
from models.db import db, User
from werkzeug.security import generate_password_hash

auth_bp = Blueprint('auth', __name__)

@auth_bp.route("/api/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json() or {}
        print("Received signup data:", data)
        
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        location = data.get("location")
        phone = data.get("phone")

        if not username or not email or not password:
            return jsonify({"error": "username, email, and password are required"}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"error": "user already exists"}), 400

        user = User(
            username=username,
            email=email,
            password_hash=generate_password_hash(password),
            location=location,
            phone=phone
        )
        db.session.add(user)
        db.session.commit()
        print("User created successfully:", user.username)

        return jsonify({
            "status": "ok",
            "user": {
                "username": username,
                "email": email,
                "location": location,
                "phone": phone,
                "join_date": user.join_date.isoformat()
            }
        }), 201
    except Exception as e:
        print("Error in signup:", str(e))
        return jsonify({"error": str(e)}), 500

@auth_bp.route("/api/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "invalid email or password"}), 401

    return jsonify({
        "status": "ok",
        "user": {
            "username": user.username,
            "email": user.email,
            "location": user.location,
            "phone": user.phone,
            "join_date": user.join_date.isoformat()
        }
    }), 200

@auth_bp.route("/api/profile", methods=["GET"])
def get_profile():
    try:
        email = request.args.get("email")
        if not email:
            return jsonify({"error": "email is required"}), 400

        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"error": "user not found"}), 404

        return jsonify({
            "status": "ok",
            "user": {
                "username": user.username,
                "email": user.email,
                "location": user.location,
                "phone": user.phone,
                "join_date": user.join_date.isoformat()
            }
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@auth_bp.route("/api/profile", methods=["PUT"])
def update_profile():
    try:
        data = request.get_json() or {}
        email = data.get("email")
        
        if not email:
            return jsonify({"error": "email is required"}), 400

        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"error": "user not found"}), 404

        if "username" in data:
            user.username = data["username"]
        if "location" in data:
            user.location = data["location"]
        if "phone" in data:
            user.phone = data["phone"]

        db.session.commit()

        return jsonify({
            "status": "ok",
            "user": {
                "username": user.username,
                "email": user.email,
                "location": user.location,
                "phone": user.phone,
                "join_date": user.join_date.isoformat()
            }
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
