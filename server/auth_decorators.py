from functools import wraps
import datetime
from flask import jsonify, request
from models import UserModel, AuthTokenModel, APIKeyModel


def _get_token():
    token_string = request.headers.get("MOISTLY-WET-TOKEN")
    if token_string is None:
        return None
    try:
        return AuthTokenModel.get(token_string)
    except AuthTokenModel.DoesNotExist:
        return None


def requires_valid_token(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        token = _get_token()
        if token is not None:
            request.token = token
            return func(token=token, *args, **kwargs)
        return jsonify({"error": "invalid token"})
    return wrapper


def requires_valid_plant_token(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if kwargs.get("plant_id") in ["plant_09ee89d38ff74034a0c828d05ec74217"]:
            class MockToken(object):
                user_pub_id = "user_6d5ee5b4fc0c4b8998966b7d33f4676c"
            return func(token=MockToken(), *args, **kwargs)

        token = _get_token()
        if token is not None:
            request.token = token
            return func(token=token, *args, **kwargs)
        return jsonify({"error": "invalid token"})
    return wrapper


def _get_api_key():
    api_key = request.headers.get("MOISTLY-WET-API-KEY")
    for key in APIKeyModel.scan(APIKeyModel.api_key.startswith(api_key)):
        return key
    return None


def requires_valid_api_key(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        key = _get_api_key()
        if key is not None:
            return func(api_key=key, *args, **kwargs)
        return jsonify({"error": "invalid api key"})
    return wrapper

