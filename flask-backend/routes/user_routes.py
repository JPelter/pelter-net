# EXT IMPORTS
from flask import jsonify, request, session

# AUTHORED IMPORTS
from flask_app import app
from flask_database import db, USER
from werkzeug.security import generate_password_hash, check_password_hash

@app.route('/api/get-users', methods=['GET'])
def get_users():
    app.logger.info('Someone got the user list!')
    return jsonify(db.session.query(USER).all())

@app.route('/api/create-user', methods=['POST'])
def create_user():
    app.logger.info('Someone wants to become a user!')
    username = request.json['username']
    password = request.json['password']
    user_exists = db.session.query(USER).filter_by(username=username).first()
    if user_exists:
        return jsonify({"message":f"Username {username} is already taken!"}), 409
#   else: # NOT NEEDED BECAUSE EARLY RETURN!
    if len(username) > 12:
        return jsonify({"message":f"Username can be at most 12 characters!"}), 400
    if not username.isalnum():
        return jsonify({"message":f"Username may only contain letters and numbers!"}), 400
    
    db.session.add(USER(username=username, password=generate_password_hash(password)))
    db.session.commit()
    session['username'] = username
    return {"message": "User registered successfully"}, 201

@app.route('/api/login-user', methods=['POST'])
def login_user():
    app.logger.info('Someone wants to login!')
    username = request.json['username']
    password = request.json['password']
    user = db.session.query(USER).filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        # Set a session cookie to indicate the user is logged in
        session['username'] = username
        return {"message": "Login successful!"}, 200
    else:
        return {"error": "Invalid credentials"}, 401
    
@app.route('/api/logout-user', methods=['POST'])
def logout_user():
    app.logger.info('Someone wants to logout!')
    session.pop('username', None)  # Remove the session cookie
    return {"message": "Logout successful!"}, 200
    