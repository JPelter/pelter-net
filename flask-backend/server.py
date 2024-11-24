# STL IMPORTS

# EXT IMPORTS
from flask import jsonify
from waitress import serve


# AUTHORED IMPORTS
from flask_app import app
import routes.user_routes
import routes.post_routes

@app.route('/api/hello-world', methods=['GET'])
def hello_world():
    app.logger.info('Someone said hello!')
    return jsonify({"message":"Hello world!"})

if __name__ == '__main__':
    app.logger.info('Starting server!')
    serve(app, host='0.0.0.0', port=5000)