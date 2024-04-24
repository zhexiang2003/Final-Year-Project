const apiKey = "189e9fd9c8b15d29e1d54333f28b46c3"
const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=Semenyih&units=metric"
const dailyApiURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=Semenyih&cnt=16&units=metric"

async function getDailyForecast() {
    const response = await fetch(dailyApiURL + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    let output = '';

    data.list.forEach((forecast, index) => {

        let unixTimestamp = forecast.dt;
        let date = new Date(unixTimestamp * 1000);
        let day = date.getDate();
        let month = date.toLocaleString('default', { month: 'long' });
        let year = date.getFullYear();
        let formattedDate = `${day} ${month} ${year}`;
        const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        let forecastDay = weekdays[date.getDay()];

        let dayTemperature = forecast.temp.day.toFixed(1);
        let nightTemperature = forecast.temp.night.toFixed(1);
        let feelsLikeDayTemperature = forecast.feels_like.day.toFixed(1);
        let feelsLikeNightTemperature = forecast.feels_like.night.toFixed(1);
        let chanceOfPrep = (forecast.pop * 100).toFixed(0) + `%`;
        let weatherIconId = forecast.weather[0].icon;

        let sunriseUnix = forecast.sunrise;
        let sunrise = new Date(sunriseUnix * 1000);
        let sunriseHours = ("0" + sunrise.getHours()).slice(-2);
        let sunriseMinutes = ("0" + sunrise.getMinutes()).slice(-2);
        let sunriseTime = sunriseHours + ":" + sunriseMinutes;
        
        let sunsetUnix = forecast.sunset;
        let sunset = new Date(sunsetUnix * 1000);
        let sunsetHours = ("0" + sunset.getHours()).slice(-2);
        let sunsetMinutes = ("0" + sunset.getMinutes()).slice(-2);
        let sunsetTime = sunsetHours + ":" + sunsetMinutes;

        let mininumTemperature = forecast.temp.min.toFixed(1);
        let maximumTemperature = forecast.temp.max.toFixed(1);
        let humidity = forecast.humidity;
        let windspeed = forecast.speed;
        let cloudiness = forecast.clouds;
        let pressure = forecast.pressure;
        let prepVolume = forecast.rain;

        output += 
        `
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapse${index}" aria-expanded="false"
                    aria-controls="panelsStayOpen-collapse${index}">

                    <div class="container-fluid daily-weather-header">
                        <div class="container-fluid daily-weather">

                            <div class="col-4 weather-day-group">
                                <div class="current-day-date">
                                    <h4 class="weather-day"><strong>${forecastDay}</strong></h4>
                                    <p class="weather-date">${formattedDate}</p>
                                </div>

                                <div class="temperature-group d-none d-sm-block">
                                    <div class="day-temperature">
                                        <i class="bi bi-sun"></i>
                                        <h3 class="day-temperature-value">${dayTemperature}°C</h3>
                                    </div>

                                    <div class="night-temperature">
                                        <i class="bi bi-moon"></i>
                                        <h3 class="night-temperature-value">${nightTemperature}°C</h3> 
                                    </div>
                                </div>
                            </div>

                            <div class="col-4 temp-feels-like-group">
                                <h4 class="temp-feels-like-day d-none d-md-block">Feels Like (Day): ${feelsLikeDayTemperature}°C</h4>
                                <h4 class="temp-feels-like-night d-none d-md-block">Feels Like (Night): ${feelsLikeNightTemperature}°C</h4>
                            </div>
                            
                            <div class="col-4 chance-of-prep-group">
                                <i class="bi bi-droplet d-none d-sm-block"></i>
                                <h2 class="chance-of-prep d-none d-sm-block">${chanceOfPrep}</h2>
                            </div>
                        </div>

                        <div class="container-fluid weather-condition">
                            <div class="weather-condition-group">
                                <h2 class="weather-condition-text">${forecast.weather[0].main}</h2>

                                <i class="weather-icon">
                                    <img src="http://openweathermap.org/img/wn/${weatherIconId}.png" alt="Weather icon" class="api-icon">
                                </i>
                            </div>
                        </div>
                        
                    </div>
                </button>
            </h2>

            <div id="panelsStayOpen-collapse${index}" class="accordion-collapse collapse">
                <div class="accordion-body">
                    <div class="container">
                        <div class="row">
                            <h4 class="daily-date">Date: ${formattedDate}</h4>
                            <h5 class="weather-description d-none d-sm-block">Weather Description: <span class="weather-description-text">${forecast.weather[0].description}</span></h5>
                            <h5 class="weather-description-text d-sm-none">${forecast.weather[0].description}</h5>
                        </div>
                        <div class="row">
                            <div class="col-md-6 weather-info-section">
                                <p class="daily-weather-info">Sunrise: <span class="weather-value">${sunriseTime}</span></p>
                            </div>
                            <div class="col-md-6 weather-info-section">
                                <p class="daily-weather-info">Sunset: <span class="weather-value">${sunsetTime}</span></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 weather-info-section">
                                <p class="daily-weather-info d-md-none">Day Temperature: <span class="weather-value">${dayTemperature}°C</span></p>
                            </div>
                            <div class="col-md-6 weather-info-section">
                                <p class="daily-weather-info d-md-none">Night Temperature: <span class="weather-value">${nightTemperature}°C</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 weather-info-section">
                                <p class="daily-weather-info">Minimum Temperature: <span class="weather-value">${mininumTemperature}°C</span></p>
                            </div>
                            <div class="col-md-6 weather-info-section">
                                <p class="daily-weather-info">Maximum Temperature: <span class="weather-value">${maximumTemperature}°C</span></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 weather-info-section">
                                <p class="daily-weather-info d-md-none">Feels Like (Day): <span class="weather-value">${feelsLikeDayTemperature}°C</span></p>
                            </div>
                            <div class="col-md-6 weather-info-section">
                                <p class="daily-weather-info d-md-none">Feels Like (Night): <span class="weather-value">${feelsLikeNightTemperature}°C</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 weather-info-section">
                                <p class="daily-weather-info">Humidity: <span class="weather-value">${humidity}%</span></p>
                            </div>
                            <div class="col-md-6 weather-info-section">
                                <p class="daily-weather-info">Wind Speed: <span class="weather-value">${windspeed} m/s</span></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 weather-info-section">
                                <p class="daily-weather-info">Cloudiness: <span class="weather-value">${cloudiness}%</span></p>
                            </div>
                            <div class="col-md-6 weather-info-section">
                                <p class="daily-weather-info">Chance of Precipitation: <span class="weather-value">${chanceOfPrep}</span></p>
                            </div>
                        </div>
                        <div class="row last-row">
                            <div class="col-md-6 weather-info-section">
                                <p class="daily-weather-info">Pressure: <span class="weather-value">${pressure}hPa</span></p>
                            </div>
                            <div class="col-md-6 weather-info-section">
                                <p class="daily-weather-info" id="md-hide-border">Precipitation Volume: <span class="weather-value">${prepVolume}mm</span></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        `;

    });

    document.querySelector('#accordionDaily').innerHTML = output;
    
}

getDailyForecast();