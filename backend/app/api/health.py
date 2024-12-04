from datetime import datetime
from flask import Blueprint, jsonify, request
import time


start_time = time.time()  # Track when the app starts
bp = Blueprint('health', __name__)


@bp.route('/', methods=['GET'])
def status():
    uptime = time.time() - start_time
    response = {
        "status": True,
        "message": "Flask API is running...",
        "version": "0.0.1",
        "uptime": f"{uptime:.2f} seconds",
        "timestamp": datetime.now().isoformat() + 'Z'
    }
    return jsonify(response), 200
