import csv
import requests
import pandas as pd
import datetime

# Make a request to the OpenWeatherMap API
response = requests.get('https://api.openweathermap.org/data/2.5/forecast/daily?q=Semenyih,MY&appid=189e9fd9c8b15d29e1d54333f28b46c3&units=metric')

response_visibility = requests.get('https://api.openweathermap.org/data/2.5/weather?q=Semenyih&units=metric&appid=189e9fd9c8b15d29e1d54333f28b46c3')

# Convert the JSON response to a Python dictionary
data = response.json()
data_visibility = response_visibility.json()

# Get the forecast for the current day
forecast = data['list'][0]

dateNow = datetime.datetime.now()
currentDate = "{}/{}/{}".format(dateNow.day, dateNow.month, dateNow.year)

sunrise = datetime.datetime.fromtimestamp(forecast['sunrise'])
sunriseTime = sunrise.isoformat()

sunset = datetime.datetime.fromtimestamp(forecast['sunset'])
sunsetTime = sunset.isoformat()

weather_data = {
    'name': data['city']['name'],
    'datetime': currentDate,
    'sunrise': sunriseTime,
    'sunset': sunsetTime,
    'temp': forecast['temp']['day'],
    'tempmin': forecast['temp']['min'],
    'tempmax': forecast['temp']['max'],
    'feelslike': forecast['feels_like']['day'],
    'humidity': forecast['humidity'],
    'windspeed': forecast['speed'],
    'cloudcover': forecast['clouds'],
    'visibility': data_visibility['visibility'] // 1000,
    'precipprob': forecast['pop'] * 100
}

fieldnames = ['name', 'datetime', 'sunrise', 'sunset', 'temp', 'tempmax', 'tempmin', 'feelslike', 'humidity', 'windspeed', 'cloudcover', 'visibility', 'precipprob']

# Create a CSV file and write the headers and data into the file
with open('Semenyih-weather-data.csv', 'r', newline='') as f:
    reader = csv.DictReader(f, fieldnames=fieldnames)
    if any(row['datetime'] == currentDate for row in reader):
        print('Data for today already exists.')
    else:
        # Create a CSV file and write the headers and data into the file
        with open('Semenyih-weather-data.csv', 'a', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writerow(weather_data)