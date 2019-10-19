import json


_config = None


def get_config():
    global _config
    if _config is None:
        _config = Config()
    return _config


class Config(object):

    API_KEY = None
    PLANT_ID = None
    MAX_WAIT_FOR = 60
    MAX_WATER_FOR = 10
    WIFI_SSID = None
    WIFI_PASSWORD = None

    def __init__(self):
        with open("config.json") as f:
            stored_config = json.loads(f.read())
            self.API_KEY = stored_config.get("api_key")
            self.PLANT_ID = stored_config.get("plant_id")
            self.MAX_WAIT_FOR = stored_config.get("max_wait_for", self.MAX_WAIT_FOR)
            self.MAX_WATER_FOR = stored_config.get("max_water_for", self.MAX_WATER_FOR)
            self.WIFI_SSID = stored_config.get("wifi_ssid")
            self.WIFI_PASSWORD = stored_config.get("wifi_password")

