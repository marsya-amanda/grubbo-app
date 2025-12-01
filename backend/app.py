from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
from tour.logic import generate_tour_plan  # Assuming this is the correct import path

app = Flask(__name__)
CORS(app)

@app.route('/plan-tour', methods=['POST'])
def plan_tour():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid or missing JSON payload."}), 400

        route = generate_tour_plan(data)
        return jsonify(route)
    except Exception as e:
        # Log the error in production!
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """
    Health check endpoint to verify the server is running.
    """
    return jsonify({"status": "healthy", "timestamp": datetime.utcnow().isoformat()}), 200
if __name__ == '__main__':
    app.run(debug=True)