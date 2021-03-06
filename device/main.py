import time
from config import get_config
from utils import read_moisture, call_home, do_connect, get_clamped_int, pump_on, pump_off

running = False


def main():

    # singleton function
    global running
    if running:
        return
    running = True

    c = get_config()
    while True:
        do_connect(c.WIFI_SSID, c.WIFI_PASSWORD)
        moisture = read_moisture()
        print("got a moisture reading of %d" % moisture)
        response = call_home(moisture, c.API_KEY, c.PLANT_ID)
        water_for = get_clamped_int("water_for", response, 0, c.MAX_WATER_FOR, 0)
        wait_for = get_clamped_int("wait_for", response, 0, c.MAX_WAIT_FOR, c.MAX_WAIT_FOR)
        print("watering for %ds, then waiting %ds" % (water_for, wait_for))
        if water_for > 0:
            pump_on()
            time.sleep(water_for)
            pump_off()
        time.sleep(wait_for)


if __name__ == "__main__":
    main()
