import warnings
warnings.filterwarnings('ignore')

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

import sklearn
from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.ensemble import RandomForestRegressor  

from datetime import datetime as dt, date
import datetime

from bs4 import BeautifulSoup

weather_dataframe = pd.read_csv("Semenyih-weather-data.csv", index_col='datetime')

weather_dataframe.tail(50)

weather_dataframe.columns

weather_dataframe.shape

weather_dataframe.describe()


weather_dataframe.isnull().any()


weather_dataframe_fyp = weather_dataframe.loc[:, ['sunrise', 'sunset', 'temp', 'tempmax', 'tempmin', 'feelslike','humidity', 'windspeed', 'cloudcover','visibility', 'precipprob']]

weather_dataframe_fyp['sunrise'] = weather_dataframe_fyp['sunrise'].str.split('T').str[1]
weather_dataframe_fyp['sunset'] = weather_dataframe_fyp['sunset'].str.split('T').str[1]

weather_dataframe_fyp['sunrise'] = pd.to_timedelta(weather_dataframe_fyp['sunrise']).dt.total_seconds()
weather_dataframe_fyp['sunset'] = pd.to_timedelta(weather_dataframe_fyp['sunset']).dt.total_seconds()

weather_dataframe_fyp.tail(50)


weather_dataframe_fyp.plot(subplots=True, figsize=(25, 20))


weather_dataframe_result = weather_dataframe_fyp.copy()
weather_dataframe_pop = weather_dataframe_fyp.copy()


weather_y_sunrise = weather_dataframe_pop.pop('sunrise')
weather_y_sunset = weather_dataframe_pop.pop('sunset')
weather_y_temp = weather_dataframe_pop.pop('temp')
weather_y_tempmax = weather_dataframe_pop.pop('tempmax')
weather_y_tempmin = weather_dataframe_pop.pop('tempmin')
weather_y_feelslike = weather_dataframe_pop.pop('feelslike')
weather_y_humidity = weather_dataframe_pop.pop('humidity')
weather_y_windspeed = weather_dataframe_pop.pop('windspeed')
weather_y_cloudcover = weather_dataframe_pop.pop('cloudcover')
weather_y_visibility = weather_dataframe_pop.pop('visibility')
weather_y_precipprob = weather_dataframe_pop.pop('precipprob')

weather_x = weather_dataframe_fyp


train_x_sunrise, test_x_sunrise, train_y_sunrise, test_y_sunrise = train_test_split(weather_x, weather_y_sunrise, test_size=0.2, random_state=4)

train_x_sunset, test_x_sunset, train_y_sunset, test_y_sunset = train_test_split(weather_x, weather_y_sunset, test_size=0.2, random_state=4)

train_x_temp, test_x_temp, train_y_temp, test_y_temp = train_test_split(weather_x, weather_y_temp, test_size=0.2, random_state=4)

train_x_tempmax, test_x_tempmax, train_y_tempmax, test_y_tempmax = train_test_split(weather_x, weather_y_tempmax, test_size=0.2, random_state=4)

train_x_tempmin, test_x_tempmin, train_y_tempmin, test_y_tempmin = train_test_split(weather_x, weather_y_tempmin, test_size=0.2, random_state=4)

train_x_feelslike, test_x_feelslike, train_y_feelslike, test_y_feelslike = train_test_split(weather_x, weather_y_feelslike, test_size=0.2, random_state=4)

train_x_humidity, test_x_humidity, train_y_humidity, test_y_humidity = train_test_split(weather_x, weather_y_humidity, test_size=0.2, random_state=4)

train_x_windspeed, test_x_windspeed, train_y_windspeed, test_y_windspeed = train_test_split(weather_x, weather_y_windspeed, test_size=0.2, random_state=4)

train_x_cloudcover, test_x_cloudcover, train_y_cloudcover, test_y_cloudcover = train_test_split(weather_x, weather_y_cloudcover, test_size=0.2, random_state=4)

train_x_visibility, test_x_visibility, train_y_visibility, test_y_visibility = train_test_split(weather_x, weather_y_visibility, test_size=0.2, random_state=4)

train_x_precipprob, test_x_precipprob, train_y_precipprob, test_y_precipprob = train_test_split(weather_x, weather_y_precipprob, test_size=0.2, random_state=4)

print(train_x_tempmax)
print(train_y_tempmax)

regression_sunrise = RandomForestRegressor(max_depth=100, random_state=None, n_estimators=100)
regression_sunrise.fit(train_x_sunrise, train_y_sunrise)
prediction_sunrise = regression_sunrise.predict(test_x_sunrise)

regression_sunset = RandomForestRegressor(max_depth=100, random_state=None, n_estimators=100)
regression_sunset.fit(train_x_sunset, train_y_sunset)
prediction_sunset = regression_sunset.predict(test_x_sunset)

regression_temp = RandomForestRegressor(max_depth=100, random_state=None, n_estimators=100)
regression_temp.fit(train_x_temp, train_y_temp)
prediction_temp = regression_temp.predict(test_x_temp)

regression_tempmax = RandomForestRegressor(max_depth=100, random_state=None, n_estimators=100)
regression_tempmax.fit(train_x_tempmax, train_y_tempmax)
prediction_tempmax = regression_tempmax.predict(test_x_tempmax)

regression_tempmin = RandomForestRegressor(max_depth=100, random_state=None, n_estimators=100)
regression_tempmin.fit(train_x_tempmin, train_y_tempmin)
prediction_tempmin = regression_tempmin.predict(test_x_tempmin)

regression_feelslike = RandomForestRegressor(max_depth=100, random_state=None, n_estimators=100)
regression_feelslike.fit(train_x_feelslike, train_y_feelslike)
prediction_feelslike = regression_feelslike.predict(test_x_feelslike)

regression_humidity = RandomForestRegressor(max_depth=100, random_state=None, n_estimators=100)
regression_humidity.fit(train_x_humidity, train_y_humidity)
prediction_humidity = regression_humidity.predict(test_x_humidity)

regression_windspeed = RandomForestRegressor(max_depth=100, random_state=None, n_estimators=100)
regression_windspeed.fit(train_x_windspeed, train_y_windspeed)
prediction_windspeed = regression_windspeed.predict(test_x_windspeed)

regression_cloudcover = RandomForestRegressor(max_depth=100, random_state=None, n_estimators=100)
regression_cloudcover.fit(train_x_cloudcover, train_y_cloudcover)
prediction_cloudcover = regression_cloudcover.predict(test_x_cloudcover)

regression_visibility = RandomForestRegressor(max_depth=100, random_state=None, n_estimators=100)
regression_visibility.fit(train_x_visibility, train_y_visibility)
prediction_visibility = regression_visibility.predict(test_x_visibility)

regression_precipprob = RandomForestRegressor(max_depth=100, random_state=None, n_estimators=100)
regression_precipprob.fit(train_x_precipprob, train_y_precipprob)
prediction_precipprob = regression_precipprob.predict(test_x_precipprob)

today = date.today() 

date_str = dt.strptime(str(today), '%Y-%m-%d').strftime('%d %B %Y')

def seconds_to_time(seconds):
    hours = seconds // 3600
    minutes = (seconds % 3600) // 60
    seconds = seconds % 60
    return "{:02d}:{:02d}:{:02d}".format(int(hours), int(minutes), int(seconds))

if today not in weather_dataframe_result.index:
    last_row = weather_dataframe_fyp.iloc[-1:]
    
    prediction_sunrise = regression_sunrise.predict(last_row)
    prediction_sunset = regression_sunset.predict(last_row)
    prediction_temp = regression_temp.predict(last_row)
    prediction_tempmax = regression_tempmax.predict(last_row)
    prediction_tempmin = regression_tempmin.predict(last_row)
    prediction_feelslike = regression_feelslike.predict(last_row)
    prediction_humidity = regression_humidity.predict(last_row)
    prediction_windspeed = regression_windspeed.predict(last_row)
    prediction_cloudcover = regression_cloudcover.predict(last_row)
    prediction_visibility = regression_visibility.predict(last_row)
    prediction_precipprob = regression_precipprob.predict(last_row)
    
    date_for_today = {'sunrise': seconds_to_time(prediction_sunrise), 'sunset': seconds_to_time(prediction_sunset), 'temp': prediction_temp, 'tempmax': prediction_tempmax, 'tempmin': prediction_tempmin, 'feelslike': prediction_feelslike, 'humidity': prediction_humidity, 'windspeed': prediction_windspeed, 'cloudcover': prediction_cloudcover, 'visibility': prediction_visibility, 'precipprob': prediction_precipprob}
    
    weather_dataframe_result['sunrise'] = weather_dataframe_result['sunrise'].apply(seconds_to_time)
    weather_dataframe_result['sunset'] = weather_dataframe_result['sunset'].apply(seconds_to_time)

    new_data = pd.DataFrame(date_for_today, index=[today])
    
    weather_dataframe_result = pd.concat([weather_dataframe_result, new_data])

print(weather_dataframe_result.tail(5))


data_html = {
    'sunrise': seconds_to_time(prediction_sunrise[0]),
    'sunset': seconds_to_time(prediction_sunset[0]),
    'temperature': format(prediction_temp[0], '.2f'),
    'feels-like': format(prediction_feelslike[0], '.2f'), 
    'min-temp': format(prediction_tempmin[0], '.2f'),
    'max-temp': format(prediction_tempmax[0], '.2f'),
    'wind-speed': format(prediction_windspeed[0], '.2f') + 'm/s',
    'cloudiness': format(prediction_cloudcover[0], '.2f') + '%',
    'humidity': format(prediction_humidity[0], '.2f') + '%',
    'visibility': format(prediction_visibility[0], '.2f') + 'km'

}

data_html['prediction-date'] = date_str

with open('AI_prediction.html', 'r') as file:
    html = file.read()

# Parse the HTML
soup = BeautifulSoup(html, 'html.parser')

# Find the elements by id and replace their content with the actual data
for key, value in data_html.items():
    if key == 'prediction-date':
        # Find the element by class and replace its content with the actual data
        element = soup.find(class_=f'{key}')
    else:
        # Find the element by id and replace its content with the actual data
        element = soup.find(id=f'{key}-value-predict')
    if element:
        element.string = str(value)
# Write the result back to the HTML file
with open('AI_prediction.html', 'w') as file:
    file.write(str(soup))
