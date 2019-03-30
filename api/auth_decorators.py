import datetime
from flask import jsonify, request
from models import UserModel, AuthTokenModel


def _has_valid_token():
    token_string = request.headers.get("MOISTLY-WET-TOKEN")
    if token_string is None:
        return False
    token = AuthTokenModel.get(token_string)
    return True


def requires_valid_token(func):
    def wrapper():
        if _has_valid_token():
            return func()
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

