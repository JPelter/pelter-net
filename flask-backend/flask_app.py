# STL IMPORTS
from functools import wraps
from os import environ
from logging.config import dictConfig
import os

# EXT IMPORTS
from flask import Flask, session, jsonify

dictConfig({
    'version': 1,
    'formatters': {
        'default': {
            'format': '%(asctime)s.%(msecs)03d, %(levelname)s, %(message)s',
            'datefmt': '%Y-%m-%dT%H:%M:%S'
        },
    },
    'handlers': {
        'stdout': {
            'class': "logging.StreamHandler",
            'stream': 'ext://sys.stdout',
            'formatter': 'default'
        }
    },
    'root': {
        'handlers': ['stdout'],
        'level': os.getenv('APP_LOG_LEVEL', 'INFO')},
})

app = Flask(__name__)
app.secret_key = environ["FLASK_SECRET_KEY"]