#!/usr/bin/python 
#important line for running in the background

import os
import time
import Adafruit_DHT
import json

filePath = './src/Backend/Logs/data.json'

DHT_SENSOR = Adafruit_DHT.DHT22
DHT_PIN = 4

# function to add to JSON 
def write_json(data, filename=filePath): 
    with open(filename,'w') as f: 
        json.dump(data, f, indent=4) 

try:
    if os.stat(filePath).st_size == 0:
            data = { "weather_logs" : []}
            write_json(data)
except:
    pass

# loops and scans the DHT sensor every 30 seconds
while True:
    humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)

    # If the file size is more than 500KB, removes the oldest data entrys
    while (os.path.getsize(filePath)>500000):
        with open(filePath) as file:
            data = json.load(file)
            temp = data['weather_logs']
            data.pop()
        write_json(data)

    # when the temperature and humidity both has been read succesfully, append that data to the data.json file
    # src : https://www.geeksforgeeks.org/append-to-json-file-using-python/
    if humidity is not None and temperature is not None:
        with open(filePath) as json_file: 
            data = json.load(json_file) 
            temp = data['weather_logs'] 
            # python object to be appended 
            y = {"Date" : time.strftime('%d %b %Y %H:%M:%S'),
                 "Temp" : round(temperature,2),
                 "Humi" : round(humidity,2)} 
        
            # appending data to emp_details  
            temp.append(y) 
        write_json(data) 
    else:
        print("Failed to retrieve data from humidity sensor")

    time.sleep(60) #seconds 

     
