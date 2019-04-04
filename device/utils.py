import time
import urequests
import network
from machine import ADC, Pin, PWM


def call_home(reading, api_key, plant_id):
    url = "https://api.moistlywet.com/api/v1/plant/%s/moisture" % plant_id
    headers = {"moistly-wet-api-key": api_key}
    data = {"moisture": reading}

    try:
        res = urequests.post(url, json=data, headers=headers)
        return res.json()
    except Exception as e:
        print(e)
    return {}


def read_moisture():
    # https://cdn-learn.adafruit.com/assets/assets/000/046/249/original/adafruit_products_Huzzah_ESP8266_Pinout_v1.2-1.png?1504885873
    # pin 14 -> vcc
    # pin 11 (IO2) (ADC) -> sig
    # grnd

    pin2 = Pin(2)
    pwm = PWM(pin2, freq=500, duty=128)  # create and configure in one go
    time.sleep(1)
    adc = ADC(0)  # create ADC object on ADC pin
    v = adc.read()
    pwm.deinit()
    pin2.off()

    return v


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
