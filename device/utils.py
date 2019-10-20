import time
import urequests
import network
from machine import Pin, ADC

ResetPin = Pin(0)
DHTpin = Pin(22)
LedPin = Pin(16)
SOILpin = Pin(32)
LIGHTpin = Pin(34)


def _get_readings(num_readings, adc):
    readings = []
    import time

    while len(readings) < num_readings:
        time.sleep(0.01)
        v = adc.read()
        time.sleep(0.05)

        print(v)
        if v not in [1024, 0]:
            readings.append(v)
    return readings


def avg(values):
    return int(sum(values)/len(values))


def read_moisture(num_readings=21):
    if num_readings % 2 == 0:
        num_readings += 1

    adc = ADC(SOILpin)
    adc.atten(ADC.ATTN_11DB)  # set 11dB input attenuation (voltage range roughly 0.0v - 3.6v)
    adc.width(ADC.WIDTH_9BIT)  # set 9 bit return values (returned range 0-511)
    readings = _get_readings(num_readings, adc)
    if num_readings <= 3:
        return int(sum(readings)/len(readings))
    median_index = int((num_readings-1)/2)
    readings = sorted(readings)

    min_index = int(median_index - median_index/2)
    max_index = int(median_index + median_index/2)
    sensible_values = readings[min_index:max_index]
    median = readings[median_index]
    average = avg(sensible_values)
    total_average = avg(readings)

    print("all readings: ", readings)
    print("sensible readings: ", sensible_values)
    print("median:%d, mid-50-avg:%d, avg:%d" % (median, average, total_average))
    return avg([median, average, total_average])


def call_home(reading, api_key, plant_id):
    url = "https://api.moistlywet.com/api/v1/plant/%s/moisture" % plant_id
    headers = {"moistly-wet-api-key": api_key, "content-type": "application/json"}
    data = {"moisture": reading}

    try:
        print(data)
        res = urequests.post(url, json=data, headers=headers)
        print(res.text)
        return res.json()
    except Exception as e:
        print(e)
    return {}


def do_connect(ssid, password):
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        wlan.connect(ssid, password)
        while not wlan.isconnected():
            time.sleep(1)


def list_wifi():
  wlan = network.WLAN(network.STA_IF)
  wlan.active(True)
  wifis = wlan.scan()
  for wifi in wifis:
    print(wifi)
  print('network config:', wlan.ifconfig())


def get_clamped_int(key, data, min_val, max_val, default):
    v = data.get(key, default)
    v = max(min_val, v)
    v = min(max_val, v)
    return v


def pump_on():
    from machine import Pin
    pin = Pin(13, Pin.OUT)
    pin.off() #turns pump on


def pump_off():
    from machine import Pin
    pin = Pin(13, Pin.OUT)
    pin.on() #turns pump off