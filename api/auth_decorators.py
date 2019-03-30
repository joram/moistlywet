import datetime
from flask import jsonify, request
from models import UserModel, AuthTokenModel


def _get_token():
    token_string = request.headers.get("MOISTLY-WET-TOKEN")
    if token_string is None:
        return None
    try:
        return AuthTokenModel.get(token_string)
    except AuthTokenModel.DoesNotExist:
        return None


def requires_valid_token(func):
    def wrapper():
        token = _get_token()
        if token is not None:
            request.token = token
            return func(token)
        return jsonify({"error": "invalid token"})
    return wrapper


def _has_valid_api_key():
    api_key = request.headers.get("MOISTLY-WET-API-KEY")
    return True


def requires_valid_api_key(func):
    def wrapper():
        if _has_valid_api_key():
            return func()
        return jsonify({"error": "invalid api key"})
    return wrapper

