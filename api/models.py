from pynamodb.models import Model
from pynamodb.attributes import UnicodeAttribute, NumberAttribute, UTCDateTimeAttribute


class UserModel(Model):
    class Meta:
        table_name = "moistlywet_users"
    pub_id = UnicodeAttribute()
    email = UnicodeAttribute(null=True)
    first_name = UnicodeAttribute(range_key=True)
    last_name = UnicodeAttribute(hash_key=True)


class AuthTokenModel(Model):
    class Meta:
        table_name = "moistlywet_auth_tokens"
    user_pub_id = UnicodeAttribute()
    token = UnicodeAttribute()


class APIKeyModel(Model):
    class Meta:
        table_name = "moistlywet_api_keys"
    user_pub_id = UnicodeAttribute()
    api_key = UnicodeAttribute()


class PlantModel(Model):
    class Meta:
        table_name = "moistlywet_plants"
    user_pub_id = UnicodeAttribute()
    pub_id = UnicodeAttribute()
    name = UnicodeAttribute(null=True)
    image_url = UnicodeAttribute(null=True)
    minMoisture = NumberAttribute()
    maxMoisture = NumberAttribute()


class MoistureReadingModel(Model):
    class Meta:
        table_name = "moistlywet_moisture_readings"
    plant_pub_id = UnicodeAttribute()
    reading = NumberAttribute()
    created = UTCDateTimeAttribute()
