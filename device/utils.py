import time
import urequests
import network


def _get_readings(num_readings, pwr_pin, adc):
    readings = []
    import time

    while len(readings) < num_readings:
        pwr_pin.on()
        time.sleep(0.01)
        v = adc.read()
        time.sleep(0.05)
        pwr_pin.off()

        print(v)
        if v not in [1024, 0]:
            readings.append(v)
    return readings


def avg(values):
    return int(sum(values)/len(values))


def read_moisture(num_readings=21):
    from machine import Pin, ADC
    if num_readings % 2 == 0:
        num_readings += 1
    readings = _get_readings(num_readings, Pin(14), ADC(0))
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
    headers = {"moistly-wet-api-key": api_key}
    data = {"moisture": reading}

    try:
        res = urequests.post(url, json=data, headers=headers)
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
