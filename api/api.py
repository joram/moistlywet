from flask import Flask, jsonify
from flask_cors import CORS
from auth import authenticate, requires_valid_token, requires_valid_api_key

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    return jsonify({"message": "Hello World!"})


@app.route('/api/v1/auth', methods=["POST"])
def auth():
    return authenticate()


@requires_valid_token
@app.route('/api/v1/api_keys', methods=["GET"])
def api_keys():
    return jsonify({"api_keys": []})


@requires_valid_token
@app.route('/api/v1/api_key', methods=["POST"])
def api_key():
    return jsonify({"api_keys": []})


@requires_valid_token
@app.route('/api/v1/plants', methods=["GET"])
def plants():
    return jsonify({"plants": []})


@requires_valid_token
@app.route('/api/v1/plant', methods=["POST"])
def plant(plant_id):
    return jsonify({})


@requires_valid_api_key
@app.route('/api/v1/plant/<plant_id>/moisture', methods=["POST"])
def moisture(plant_id):
    return jsonify({
        "water_for": 0,
        "wait_for": 60,
    })


if __name__ == '__main__':
    app.run(debug=True)
