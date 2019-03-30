from flask import jsonify, request
import boto3
import uuid

client = boto3.client('dynamodb')


def _has_valid_token():
    token = request.headers.get("MOISTLY-WET-TOKEN")
    if token is None:
        return False
    print(token)
    # key = {'token': {"S": token}}
    # response = client.get_item(TableName='moistlywet_auth_token', Key=key)
    # if "Item" not in response:
    #     return False
    return True


def _has_valid_api_key():
    api_key = request.headers.get("MOISTLY-WET-API-KEY")
    if api_key is None:
        return False
    key = {'api_key': {"S": api_key}}
    response = client.get_item(TableName='moistlywet_api_key', Key=key)
    if "Item" not in response:
        return False
    return True


def requires_valid_token(func):
    def wrapper():
        if _has_valid_token():
            return func()
        return jsonify({"error": "invalid token"})
    return wrapper


def requires_valid_api_key(func):
    def wrapper():
        if _has_valid_api_key():
            return func()
        return jsonify({"error": "invalid api key"})
    return wrapper


def authenticate():
    data = request.json
    access_token = data.get("accessToken")
    import pprint
    pprint.pprint(data)

    import os
    from requests_oauthlib import OAuth2Session
    GOOGLE_CLIENT_ID = os.environ.get("MW_GOOGLE_CLIENT_ID")
    GOOGLE_CLIENT_SECRET = os.environ.get("MW_GOOGLE_CLIENT_SECRET")
    print(GOOGLE_CLIENT_ID)
    requests.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json")

    # # https://requests-oauthlib.readthedocs.io/en/latest/oauth2_workflow.html#web-application-flow
    # scope = ['https://www.googleapis.com/auth/userinfo.email',
    #          'https://www.googleapis.com/auth/userinfo.profile']
    # oauth = OAuth2Session(GOOGLE_CLIENT_ID, redirect_uri="", scope=scope)
    # r = oauth.get('https://www.googleapis.com/oauth2/v1/userinfo')
    # pprint.pprint(r)


    # TODO: validate data with google
    import requests
    headers = {'Authorization': 'OAuth ' + access_token}
    req = requests.post('https://www.googleapis.com/oauth2/v1/userinfo', None, headers)
    print(req)

    # verify user exists in DB
    email = data.get("profileObj", {}).get("email")
    response = client.get_item(TableName='moistlywet_users', Key={'email': {"S": email}})
    if "Item" not in response:
        client.put_item(TableName='moistlywet_users', Item={'email': {"S": email}})
        response = client.get_item(TableName='moistlywet_users', Key={'email': {"S": email}})
    user = response["Item"]

    # provide temporary API key
    # TODO, add TTL: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html
    token = str(uuid.uuid4())
    # item = {
    #     'email': {"S": email},
    #     'token': {"S": token},
    #     # 'expires': {}
    # }
    # client.put_item(TableName='moistlywet_auth_token', Item=item)

    return jsonify({
        "success": True,
        "token": token,
    })

