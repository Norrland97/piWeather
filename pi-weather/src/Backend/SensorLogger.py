import os
import time
import Adafruit_DHT
import json

DHT_SENSOR = Adafruit_DHT.DHT22
DHT_PIN = 4

# function to add to JSON 
def write_json(data, filename='./Logs/data.json'): 
    with open(filename,'w') as f: 
        json.dump(data, f, indent=4) 

try:
    if os.stat('./Logs/data.json').st_size == 0:
            data = { "weather_logs" : []}
            write_json(data)
except:
    pass

# loops and scans the DHT sensor every 30 seconds
while True:
    humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)

    # when the temperature and humidity both has been read succesfully, append that data to the data.json file
    # src : https://www.geeksforgeeks.org/append-to-json-file-using-python/
    if humidity is not None and temperature is not None:
        with open('./Logs/data.json') as json_file: 
            data = json.load(json_file) 
            temp = data['weather_logs'] 
            # python object to be appended 
            y = {"Date" : time.strftime('%d %b %Y %H:%M:%S'),
                 "Temp" : temperature,
                 "Humi" : humidity} 
        
            # appending data to emp_details  
            temp.append(y) 
        write_json(data) 
    else:
        print("Failed to retrieve data from humidity sensor")

    time.sleep(60) #seconds 

     
