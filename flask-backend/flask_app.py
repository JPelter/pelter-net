# STL IMPORTS
import logging
from os import environ

# EXT IMPORTS
from flask import Flask

app = Flask(__name__)
app.logger.setLevel(logging.INFO)
app.secret_key = environ["FLASK_SECRET_KEY"]