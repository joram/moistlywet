# ESP8266

## docs
https://docs.micropython.org/en/latest/esp8266/tutorial/intro.html

ctrl+E to paste stuff

## setup
- download firmware: http://micropython.org/download#esp8266
- erase the firmware: `esptool.py --port /dev/ttyUSB0 erase_flash`
- flash the firmware: `esptool.py --port /dev/ttyUSB0 --baud 460800 write_flash --flash_size=detect 0 esp8266-20170108-v1.8.7.bin`

## connecting
### shell
- connect to a python shell: `picocom /dev/ttyUSB0 -b115200`
### webrepl (good for file uploads)
- open [webrepl html file](../webrepl/webrepl.html)
- add ip address, press connect


## Connecting to wifi
```
from wifi import do_connect
do_connect("ssid", "password")
```

## bootup
https://docs.micropython.org/en/latest/esp8266/tutorial/filesystem.html#start-up-scripts
