import csv
import requests
import pandas as pd
import datetime

# Make a request to the OpenWeatherMap API
response = requests.get('http://api.openweathermap.org/data/2.5/weather?q=Semenyih&appid=189e9fd9c8b15d29e1d54333f28b46c3&units=metric')

# Convert the JSON response to a Python dictionary
data = response.json()

dateNow = datetime.datetime.now()
currentDate = dateNow.strftime("%Y-%m-%d")

sunrise = datetime.datetime.fromtimestamp(data['sys']['sunrise'])
sunriseTime = sunrise.isoformat()

sunset = datetime.datetime.fromtimestamp(data['sys']['sunset'])
sunsetTime = sunset.isoformat()

weather_data = {
    'name': data['name'],
    'datetime': currentDate,
    'sunrise': sunriseTime,
    'sunset': sunsetTime,
    'temp': data['main']['temp'],
    'tempmin': data['main']['temp_min'],
    'tempmax': data['main']['temp_min'],
    'feelslike': data['main']['feels_like'],
    'humidity': data['main']['humidity'],
    'windspeed': data['wind']['speed'],
    'cloudcover': data['clouds']['all'],
    'visibility': data['visibility']
}

fieldnames = ['name', 'datetime', 'sunrise', 'sunset', 'temp', 'tempmax', 'tempmin', 'feelslike', 'humidity', 'windspeed', 'cloudcover', 'visibility']

# Create a CSV file and write the headers and data into the file
with open('weather_data.csv', 'r', newline='') as f:
    reader = csv.DictReader(f, fieldnames=fieldnames)
    if any(row['datetime'] == currentDate for row in reader):
        print('Data for today already exists.')
    else:
        # Create a CSV file and write the headers and data into the file
        with open('weather_data.csv', 'a', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writerow(weather_data)