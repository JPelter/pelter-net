# STL IMPORTS
import logging
from os import environ

# EXT IMPORTS
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
COMMENT = db_Base.classes.COMMENT