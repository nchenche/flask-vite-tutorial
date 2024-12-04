from flask import Blueprint, jsonify, request


bp = Blueprint('processing', __name__)


@bp.route('/process-form-data', methods=['POST'])
def process_data():
    # Access individual fields
    # title = request.form.get('title')
    # username = request.form.get('username')
    # usermail = request.form.get('usermail')

    data = request.json
    print("Received data:", data)

    return jsonify({
        "message": "Form received successfully!",
        "data": data
    }), 200
