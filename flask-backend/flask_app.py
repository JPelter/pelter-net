# STL IMPORTS
from functools import wraps
import logging
from os import environ

# EXT IMPORTS
from flask import Flask, session, jsonify

app = Flask(__name__)
app.logger.setLevel(logging.INFO)
app.secret_key = environ["FLASK_SECRET_KEY"]