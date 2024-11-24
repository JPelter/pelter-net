# STL IMPORTS
from functools import wraps
import logging
from os import environ

# EXT IMPORTS
from flask import session, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base

# AUTHORED IMPORT
from flask_app import app

app.config['SQLALCHEMY_DATABASE_URI'] = environ["SQLITE_URI"]
db = SQLAlchemy(app)
db_Base = automap_base()

with app.app_context():
    # Reflect the database schema
    db_Base.prepare(db.engine)

USER = db_Base.classes.USER
POST = db_Base.classes.POST

def login_required():
    def decorator(function_to_protect):
        @wraps(function_to_protect)
        def wrapper(*args, **kwargs):
            app.logger.debug(f"login_required API call")
            if session.get('user_id'):
                req_acct = db.session.query(USER).get(session['user_id'])
                return function_to_protect(*args, **kwargs)
            else:
                return jsonify({"message":"Try logging in!"}), 401
        return wrapper
    return decorator