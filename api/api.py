from flask import Flask, jsonify, request
from flask_cors import CORS
from auth_decorators import requires_valid_token, requires_valid_api_key
from models import UserModel, AuthTokenModel, PlantModel

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    return jsonify({"message": "Hello World!"})


@app.route('/api/v1/auth', methods=["POST"])
def auth():
    data = request.json
    # access_token = data.get("accessToken")
    # import pprint
    # pprint.pprint(data)
    # import requests
    #
    # import os
    # from requests_oauthlib import OAuth2Session
    # GOOGLE_CLIENT_ID = os.environ.get("MW_GOOGLE_CLIENT_ID")
    # GOOGLE_CLIENT_SECRET = os.environ.get("MW_GOOGLE_CLIENT_SECRET")
    # requests.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json")
    #
    # # # https://requests-oauthlib.readthedocs.io/en/latest/oauth2_workflow.html#web-application-flow
    # # scope = ['https://www.googleapis.com/auth/userinfo.email',
    # #          'https://www.googleapis.com/auth/userinfo.profile']
    # # oauth = OAuth2Session(GOOGLE_CLIENT_ID, redirect_uri="", scope=scope)
    # # r = oauth.get('https://www.googleapis.com/oauth2/v1/userinfo')
    # # pprint.pprint(r)
    #
    #
    # import requests
    # headers = {'Authorization': 'OAuth ' + access_token}
    # req = requests.post('https://www.googleapis.com/oauth2/v1/userinfo', None, headers)
    # print(req)

    # # TODO: validate data with google

    # verify user exists in DB
    email = data["profileObj"]["email"]
    try:
        user = UserModel.get(email)
    except UserModel.DoesNotExist:
        print("User does not exist. Creating")
        user = UserModel(email)
        user.save()

    # # provide existing auth token
    # for token in AuthTokenModel:
    #     print(token, token.user_pub_id, token.token, token.expires)
    #     if token.expires > datetime.datetime.utcnow():
    #         print(f"still valid token {token.token}")
    #         return jsonify({"success": True, "token": token.token})
    #     token.delete()

    # provide new auth token
    token = AuthTokenModel()
    token.user_pub_id = user.pub_id
    token.save()
    print(f"new token {token.token}")
    return jsonify({
        "success": True,
        "token": token.token,
    })


@app.route('/api/v1/plants', methods=["GET"])
@requires_valid_token
def plants(token):
    # import random
    # plant_image_urls = [
    #     "https://cdn.bmstores.co.uk/images/hpcProductImage/imgFull/297350-Leafy-Plant-Pot.jpg",
    #     "https://target.scene7.com/is/image/Target/GUEST_fc982b27-ef4f-48a3-bf11-a69d32cc91cc?wid=488&hei=488&fmt=pjpeg",
    #     "https://images-na.ssl-images-amazon.com/images/I/41NbuQ-wKPL._SX425_.jpg",
    #     "https://cdn.shopclues.com/images1/thumbnails/92328/320/320/140786749-92328394-1539116494.jpg",
    # ]
    # PlantModel.create_table(read_capacity_units=1, write_capacity_units=1, wait=True)
    # plants = PlantModel.query(token.user_pub_id)
    # if len(list(plants)) <= 10:
    #     plant = PlantModel()
    #     plant.user_pub_id = token.user_pub_id
    #     plant.max_moisture = 100
    #     plant.min_moisture = 0
    #     plant.name = "A Dynamo of a Plant"
    #     plant.image_url = random.choice(plant_image_urls)
    #     plant.save()

    plants = PlantModel.query(token.user_pub_id)
    plants = [p.json() for p in plants]
    return jsonify({"plants": plants})


@requires_valid_token
@app.route('/api/v1/api_keys', methods=["GET"])
def api_keys():
    return jsonify({"api_keys": []})


@requires_valid_token
@app.route('/api/v1/api_key', methods=["POST"])
def api_key():
    return jsonify({"api_keys": []})


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
