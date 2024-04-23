# %% [markdown]
# # Random Forest Regressor

# %%
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

from datetime import timedelta
import datetime

# %%
weather_dataframe = pd.read_csv("Semenyih-weather-data.csv", index_col='datetime')

weather_dataframe['sunrise'] = weather_dataframe['sunrise'].str.split('T').str[1]
weather_dataframe['sunset'] = weather_dataframe['sunset'].str.split('T').str[1]

weather_dataframe['sunrise'] = pd.to_timedelta(weather_dataframe['sunrise']).dt.total_seconds()
weather_dataframe['sunset'] = pd.to_timedelta(weather_dataframe['sunset']).dt.total_seconds()

weather_dataframe.tail(50)


# %%
weather_dataframe.columns

# %%
weather_dataframe.shape

# %%
weather_dataframe.describe()

# %%
weather_dataframe.isnull().any()

# %%
weather_dataframe_fyp = weather_dataframe.loc[:, ['sunrise', 'sunset', 'temp', 'tempmax', 'tempmin', 'feelslike','humidity', 'windspeed', 'visibility']]
weather_dataframe_fyp.tail(50)

# %%
weather_dataframe_fyp.plot(subplots=True, figsize=(25, 20))

# %%
weather_dataframe_result = weather_dataframe_fyp.copy()
weather_dataframe_pop = weather_dataframe_fyp.copy()

# %%
weather_y_sunrise = weather_dataframe_pop.pop('sunrise')
weather_y_sunset = weather_dataframe_pop.pop('sunset')
weather_y_temp = weather_dataframe_pop.pop('temp')
weather_y_tempmax = weather_dataframe_pop.pop('tempmax')
weather_y_tempmin = weather_dataframe_pop.pop('tempmin')
weather_y_feelslike = weather_dataframe_pop.pop('feelslike')
weather_y_humidity = weather_dataframe_pop.pop('humidity')
weather_y_windspeed = weather_dataframe_pop.pop('windspeed')
weather_y_visibility = weather_dataframe_pop.pop('visibility')

weather_x = weather_dataframe_fyp

# %%
train_x_sunrise, test_x_sunrise, train_y_sunrise, test_y_sunrise = train_test_split(weather_x, weather_y_sunrise, test_size=0.2, random_state=4)

train_x_sunset, test_x_sunset, train_y_sunset, test_y_sunset = train_test_split(weather_x, weather_y_sunset, test_size=0.2, random_state=4)

train_x_temp, test_x_temp, train_y_temp, test_y_temp = train_test_split(weather_x, weather_y_temp, test_size=0.2, random_state=4)

train_x_tempmax, test_x_tempmax, train_y_tempmax, test_y_tempmax = train_test_split(weather_x, weather_y_tempmax, test_size=0.2, random_state=4)

train_x_tempmin, test_x_tempmin, train_y_tempmin, test_y_tempmin = train_test_split(weather_x, weather_y_tempmin, test_size=0.2, random_state=4)

train_x_feelslike, test_x_feelslike, train_y_feelslike, test_y_feelslike = train_test_split(weather_x, weather_y_feelslike, test_size=0.2, random_state=4)

train_x_humidity, test_x_humidity, train_y_humidity, test_y_humidity = train_test_split(weather_x, weather_y_humidity, test_size=0.2, random_state=4)

train_x_windspeed, test_x_windspeed, train_y_windspeed, test_y_windspeed = train_test_split(weather_x, weather_y_windspeed, test_size=0.2, random_state=4)

train_x_visibility, test_x_visibility, train_y_visibility, test_y_visibility = train_test_split(weather_x, weather_y_visibility, test_size=0.2, random_state=4)

# %%
print(train_x_tempmax)
print(train_y_tempmax)



# %%
regression_sunrise = RandomForestRegressor(max_depth=90, random_state=0, n_estimators=100)
regression_sunrise.fit(train_x_sunrise, train_y_sunrise)
prediction_sunrise = regression_sunrise.predict(test_x_sunrise)

regression_sunset = RandomForestRegressor(max_depth=90, random_state=0, n_estimators=100)
regression_sunset.fit(train_x_sunset, train_y_sunset)
prediction_sunset = regression_sunset.predict(test_x_sunset)

regression_temp = RandomForestRegressor(max_depth=90, random_state=0, n_estimators=100)
regression_temp.fit(train_x_temp, train_y_temp)
prediction_temp = regression_temp.predict(test_x_temp)

regression_tempmax = RandomForestRegressor(max_depth=90, random_state=0, n_estimators=100)
regression_tempmax.fit(train_x_tempmax, train_y_tempmax)
prediction_tempmax = regression_tempmax.predict(test_x_tempmax)

regression_tempmin = RandomForestRegressor(max_depth=90, random_state=0, n_estimators=100)
regression_tempmin.fit(train_x_tempmin, train_y_tempmin)
prediction_tempmin = regression_tempmin.predict(test_x_tempmin)

regression_feelslike = RandomForestRegressor(max_depth=90, random_state=0, n_estimators=100)
regression_feelslike.fit(train_x_tempmax, train_y_feelslike)
prediction_feelslike = regression_feelslike.predict(test_x_feelslike)

regression_humidity = RandomForestRegressor(max_depth=90, random_state=0, n_estimators=100)
regression_humidity.fit(train_x_humidity, train_y_humidity)
prediction_humidity = regression_humidity.predict(test_x_humidity)

regression_windspeed = RandomForestRegressor(max_depth=90, random_state=0, n_estimators=100)
regression_windspeed.fit(train_x_windspeed, train_y_windspeed)
prediction_windspeed = regression_windspeed.predict(test_x_windspeed)

regression_visibility = RandomForestRegressor(max_depth=90, random_state=0, n_estimators=100)
regression_visibility.fit(train_x_visibility, train_y_visibility)
prediction_visibility = regression_visibility.predict(test_x_visibility)

# %%
today = datetime.date.today() 

if today not in weather_dataframe_result.index:
    last_row = weather_dataframe_fyp.iloc[-1:]
    
    prediction_sunrise_temp = regression_sunrise.predict(last_row)
    prediction_sunset_temp = regression_sunset.predict(last_row)
    prediction_humidity = regression_humidity.predict(last_row)
    
    date_for_today = {'tempmax': prediction_sunrise_temp, 'tempmin': prediction_min_temp, 'humidity': prediction_humidity}
    new_data = pd.DataFrame(date_for_today, index=[today])
    
    weather_dataframe_result = weather_dataframe_result.append(new_data)

print(weather_dataframe_result.tail(5))

# %%


# %%



