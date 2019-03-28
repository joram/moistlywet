import time
import network
from machine import ADC, Pin, PWM


def do_connect(ssid, password):
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        print('connecting to network...')
        wlan.connect(ssid, password)
        while not wlan.isconnected():
            print('connecting to network...')
            time.sleep(0.1)
    print('network config:', wlan.ifconfig())


def list_wifi():
  wlan = network.WLAN(network.STA_IF)
  wlan.active(True)
  wifis = wlan.scan()
  for wifi in wifis:
    print(wifi)
  print('network config:', wlan.ifconfig())


def read_moisture():
    # pin 14 -> vcc
    # pin 2 (ADC) -> sig

    print("applying pwm")
    pin2 = Pin(2)
    pwm = PWM(pin2, freq=500, duty=128)  # create and configure in one go

    time.sleep(1)

    print("reading adc")
    adc = ADC(0)  # create ADC object on ADC pin
    v = adc.read()

    print(v)
    pwm.deinit()
    pin2.off()
