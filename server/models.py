import datetime
import uuid
from pynamodb.models import Model
from pynamodb.attributes import UnicodeAttribute, NumberAttribute, UTCDateTimeAttribute


def get_pub_id(prefix):
    token = str(uuid.uuid4()).replace("-", "")
    return f"{prefix}_{token}"


class UserModel(Model):
    class Meta:
        table_name = "moistlywet_users"
        region = 'us-west-1'

    def __init__(self, *args, **kwargs):
        Model.__init__(self, *args, **kwargs)
        if self.pub_id is None:
            self.pub_id = get_pub_id("user")

    email = UnicodeAttribute(hash_key=True)
    pub_id = UnicodeAttribute()


class AuthTokenModel(Model):

    class Meta:
        table_name = "moistlywet_auth_tokens"
        region = 'us-west-1'

    def __init__(self, *args, **kwargs):
        Model.__init__(self, *args, **kwargs)
        if self.token is None:
            self.token = get_pub_id("token")
        if self.expires is None:
            self.expires = datetime.datetime.utcnow() + datetime.timedelta(hours=5)

    @property
    def user(self):
        return UserModel.get(self.user_pub_id)

    user_pub_id = UnicodeAttribute()
    token = UnicodeAttribute(hash_key=True)
    expires = UTCDateTimeAttribute()


class APIKeyModel(Model):
    class Meta:
        table_name = "moistlywet_api_keys"
        region = 'us-west-1'

    def __init__(self, *args, **kwargs):
        Model.__init__(self, *args, **kwargs)
        if self.api_key is None:
            self.api_key = get_pub_id("api_key")

    @property
    def user(self):
        return UserModel.get(self.user_pub_id)

    def json(self):
      return {
        "user_pub_id": self.user_pub_id,
        "api_key": self.api_key,
      }

    user_pub_id = UnicodeAttribute(hash_key=True)
    api_key = UnicodeAttribute(range_key=True)


class PlantModel(Model):
    class Meta:
        table_name = "moistlywet_plants"
        region = 'us-west-1'

    def __init__(self, *args, **kwargs):
        Model.__init__(self, *args, **kwargs)
        if self.pub_id is None:
            self.pub_id = get_pub_id("plant")

    @property
    def user(self):
        return UserModel.get(self.user_pub_id)

    def json(self):
        return {
            "user_pub_id": self.user_pub_id,
            "pub_id": self.pub_id,
            "name": self.name,
            "image_url": self.image_url,
            "min_moisture": self.min_moisture,
            "max_moisture": self.max_moisture,
        }

    def add_moisture_reading(self, value):
        MoistureReadingModel.create_table(read_capacity_units=1, write_capacity_units=1)
        reading = MoistureReadingModel()
        reading.plant_pub_id = self.pub_id
        reading.value = value
        reading.created = datetime.datetime.utcnow()
        reading.save()
        return reading

    user_pub_id = UnicodeAttribute(hash_key=True)
    pub_id = UnicodeAttribute(range_key=True)
    name = UnicodeAttribute(null=True)
    image_url = UnicodeAttribute(null=True)
    min_moisture = NumberAttribute()
    max_moisture = NumberAttribute()


class MoistureReadingModel(Model):
    class Meta:
        table_name = "moistlywet_moisture_readings"
        region = 'us-west-1'

    def json(self):
        return {
            "plant_pub_id": self.plant_pub_id,
            "value": self.value,
            "created": self.created.timestamp(),
        }
    plant_pub_id = UnicodeAttribute(hash_key=True)
    value = NumberAttribute()
    created = UTCDateTimeAttribute(range_key=True)
