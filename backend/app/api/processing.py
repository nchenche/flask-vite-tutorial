from flask import Blueprint, jsonify, request
from app.services.core import process_data as core_process_data 


bp = Blueprint('processing', __name__)


# Route joined from client with url "http://0.0.0.0:5000/api/process-form-data" 
@bp.route('/process-form-data', methods=['POST'])
def process_data():
    # Get JSON data
    data = request.json
    print("Received data:", data)

    # Process data here
    # 1. similarity measure between hpos to return N most "similar" diseases
    # 2. integrate N into disease-disease graph
    # 3. run random step search
    # 4. return X
    result = core_process_data(data=data)

    return jsonify({
        "message": "Form received successfully!",
        "data": result
    }), 200


@bp.route('/query', methods=['GET'])
def handle_query():
    """
    Endpoint to demonstrate the use of query parameters in a Flask application.

    Usage:
        Send a GET request with query parameters, e.g.,
        /query?name=John&age=25

    Returns:
        A JSON response containing the provided query parameters.
    """
    # Retrieve all query strings as a dictionary
    query_params = request.args.to_dict()

    # Example: Provide default values for missing parameters
    name = query_params.get('name', 'Guest')  # Default to 'Guest' if not provided
    age = query_params.get('age', 'Unknown')  # Default to 'Unknown' if not provided

    # Log to demonstrate how query parameters are used
    print(f"Query parameters received: {query_params}")
    
    # Example use case log
    print(f"Processed values - Name: {name}, Age: {age}")

    # Return the query strings with some additional explanation
    response = {
        "message": "Query parameters received successfully.",
        "query_parameters": query_params,
        "examples": {
            "example_1": "/query?name=Alice&age=30",
            "example_2": "/query?search=flask&limit=10",
        },
        "processed": {
            "name": name,
            "age": age
        }
    }

    return jsonify(response)