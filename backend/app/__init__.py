from flask import Flask, jsonify
from flask_cors import CORS
import time
from datetime import datetime

from app.config import config_by_name

__version__ = "0.0.1"
start_time = time.time()  # Track when the app starts


def create_app(config_name):
    # Creates a flask instance
    app = Flask(__name__)

    # Allows Cross-Origin Requests (required for requests from frontend)
    CORS(app=app)

    # Configure the app
    app.config.from_object(config_by_name[config_name])


    from app.api import health, processing
    app.register_blueprint(health.bp, url_prefix='/status')
    app.register_blueprint(processing.bp, url_prefix='/api')



    @app.route('/status', methods=['GET'])
    def status():
        uptime = time.time() - start_time
        response = {
            "status": True,
            "message": "Flask API is running...",
            "version": __version__,
            "uptime": f"{uptime:.2f} seconds",
            "timestamp": datetime.now().isoformat() + 'Z'
        }
        return jsonify(response), 200
    
    return app 