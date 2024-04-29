const apiKey = "189e9fd9c8b15d29e1d54333f28b46c3"
const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=Semenyih&units=metric"
const hourlyApiURL = "https://pro.openweathermap.org/data/2.5/forecast/hourly?q=Semenyih&units=metric"

async function getTodayHourlyWeather() {
    const response = await fetch(hourlyApiURL + `&appid=${apiKey}`);
    var data = await response.json();

    let output = '';
    let currentTime = Math.floor(new Date().getTime() / 1000);
    let currentDay = new Date().getDate();
    let currentHour = new Date().getHours();
    
    let dateHeader = new Date();
    let dayHeader = dateHeader.getDate();
    let monthHeader = dateHeader.toLocaleString('default', { month: 'long' });
    let yearHeader = dateHeader.getFullYear();
    let formattedDate = `${dayHeader} ${monthHeader} ${yearHeader}`;

    if (currentHour === 24) {
        currentDay++;
    }

    console.log(data);

    data.list.forEach((forecast, index) => {
        
        if (forecast.dt <= currentTime) {
            return;
        }

        let hourlyTemperature = forecast.main.temp.toFixed(1);
        let mininumTemperature = forecast.main.temp_min.toFixed(1);
        let maximumTemperature = forecast.main.temp_max.toFixed(1);
        let humidity = forecast.main.humidity;
        let tempFeelsLike = forecast.main.feels_like.toFixed(1);
        let windspeed = forecast.wind.speed;
        let chanceOfPrep = (forecast.pop * 100).toFixed(0) + `%`;
        let cloudiness = forecast.clouds.all;
        let pressure = forecast.main.pressure;
        let visibility = forecast.visibility / 1000;
        let weatherIconId = forecast.weather[0].icon;

        let unixTimestamp = forecast.dt; // Get the date and time of the forecast
        let date = new Date(unixTimestamp * 1000);
        let forecastDay = date.getDate();
        let checkHour = date.getHours();
        let hours = ("0" + date.getHours()).slice(-2);
        let minutes = ("0" + date.getMinutes()).slice(-2);
        let forecastTime = hours + ":" + minutes;
        let timeDifferenceHours = (unixTimestamp - currentTime) / 3600;
        let day = date.getDate();
        let month = date.toLocaleString('default', { month: 'long' });
        let year = date.getFullYear();
        let formattedDate = `${day} ${month} ${year}`;

        let weatherCondition = forecast.weather[0].main;
        let backgroundImage = '';

        if (forecastDay !== currentDay) {
            return;
        }

        output += `
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapse${index}" aria-expanded="false"
                        aria-controls="panelsStayOpen-collapse${index}">

                        <div class="container-fluid hourly-weather-header">
                            <div class="container-fluid hourly-weather">
                                <div class="col-4 weather-hour-group">
                                    
                                    <p class="weather-hour">${forecastTime}</p>


                                    <h1 class="hourly-temperature">${hourlyTemperature}°C</h1>
                                </div>

                                <div class="col-4 temp-feels-like-group">
                                    <h2 class="temp-feels-like d-none d-md-block">Feels Like: ${tempFeelsLike}°C</h2>
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
                                <h4 class="hourly-date">Date: ${formattedDate}</h4>
                                <h5 class="weather-description d-none d-sm-block">Weather Description: <span class="weather-description-text">${forecast.weather[0].description}</span></h5>
                                <h5 class="weather-description-text d-sm-none">${forecast.weather[0].description}</h5>
                            </div>
                            <div class="row">
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Minimum Temperature: <span class="weather-value">${mininumTemperature}°C</span></p>
                                </div>
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Maximum Temperature: <span class="weather-value">${maximumTemperature}°C</span></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info d-md-none">Feels Like: <span class="weather-value">${tempFeelsLike}°C</span></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Humidity: <span class="weather-value">${humidity}%</span></p>
                                </div>
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Wind Speed: <span class="weather-value">${windspeed} m/s</span></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Cloudiness: <span class="weather-value">${cloudiness}%</span></p>
                                </div>
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Chance of Precipitation: <span class="weather-value">${chanceOfPrep}</span></p>
                                </div>
                            </div>
                            <div class="row last-row">
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Pressure: <span class="weather-value">${pressure} hPa</span></p>
                                </div>
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info" id="md-hide-border">Visibility: <span class="weather-value">${visibility} km</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

    });

    if (output === '') {
        document.querySelector('.no-more-info').innerHTML = `<p class="no-more-info-text">No more hourly forecast for today. Please click 'tomorrow' button for tomorrow's hourly weather forecast.</p>`;
    }

    document.querySelector('#accordionPanelsToday').innerHTML = output;
    document.querySelector('#accordionHourlyTodayMobile .accordion-body').innerHTML = `<h4 id="date-header-today-mobile" class="date-header">Date: ${formattedDate}</h4>` + output;
    document.querySelector('#date-header-today').innerHTML = `Date: ${formattedDate}`;

}

async function getTomorrowHourlyWeather() {
    const response = await fetch(hourlyApiURL + `&appid=${apiKey}`);
    var data = await response.json();

    let output = '';
    let currentTime = Math.floor(new Date().getTime() / 1000);
    let currentHour = new Date().getHours();

    let dateHeader = new Date();
    dateHeader.setDate(dateHeader.getDate() + 1);
    let tomorrowDay = dateHeader.getDate();
    let monthHeader = dateHeader.toLocaleString('default', { month: 'long' });
    let yearHeader = dateHeader.getFullYear();
    let formattedDate = `${tomorrowDay} ${monthHeader} ${yearHeader}`;

    if (currentHour === 23) {
        currentDay++;
    }

    console.log(data);

    data.list.forEach((forecast, index) => {
        
        if (forecast.dt <= currentTime) {
            return;
        }

        let hourlyTemperature = forecast.main.temp.toFixed(1);
        let mininumTemperature = forecast.main.temp_min.toFixed(1);
        let maximumTemperature = forecast.main.temp_max.toFixed(1);
        let humidity = forecast.main.humidity;
        let tempFeelsLike = forecast.main.feels_like.toFixed(1);
        let windspeed = forecast.wind.speed;
        let chanceOfPrep = (forecast.pop * 100).toFixed(0) + `%`;
        let cloudiness = forecast.clouds.all;
        let pressure = forecast.main.pressure;
        let visibility = forecast.visibility / 1000;
        let weatherIconId = forecast.weather[0].icon;

        let unixTimestamp = forecast.dt; // Get the date and time of the forecast
        let date = new Date(unixTimestamp * 1000);
        let forecastDay = date.getDate();
        let checkHour = date.getHours();
        let hours = ("0" + date.getHours()).slice(-2);
        let minutes = ("0" + date.getMinutes()).slice(-2);
        let forecastTime = hours + ":" + minutes;
        let timeDifferenceHours = (unixTimestamp - currentTime) / 3600;
        let day = date.getDate();
        let month = date.toLocaleString('default', { month: 'long' });
        let year = date.getFullYear();
        let formattedDate = `${day} ${month} ${year}`;

        let weatherCondition = forecast.weather[0].main;
        let backgroundImage = '';

        if (forecastDay !== tomorrowDay) {
            return;
        }

        output += `
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapse${index}" aria-expanded="false"
                        aria-controls="panelsStayOpen-collapse${index}">

                        <div class="container-fluid hourly-weather-header">
                            <div class="container-fluid hourly-weather">
                                <div class="col-4 weather-hour-group">
                                    
                                    <p class="weather-hour">${forecastTime}</p>


                                    <h1 class="hourly-temperature">${hourlyTemperature}°C</h1>
                                </div>

                                <div class="col-4 temp-feels-like-group">
                                    <h2 class="temp-feels-like d-none d-md-block">Feels Like: ${tempFeelsLike}°C</h2>
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
                                <h4 class="hourly-date">Date: ${formattedDate}</h4>
                                <h5 class="weather-description d-none d-sm-block">Weather Description: <span class="weather-description-text">${forecast.weather[0].description}</span></h5>
                                <h5 class="weather-description-text d-sm-none">${forecast.weather[0].description}</h5>
                            </div>
                            <div class="row">
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Minimum Temperature: <span class="weather-value">${mininumTemperature}°C</span></p>
                                </div>
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Maximum Temperature: <span class="weather-value">${maximumTemperature}°C</span></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info d-md-none">Feels Like: <span class="weather-value">${tempFeelsLike}°C</span></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Humidity: <span class="weather-value">${humidity}%</span></p>
                                </div>
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Wind Speed: <span class="weather-value">${windspeed} m/s</span></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Cloudiness: <span class="weather-value">${cloudiness}%</span></p>
                                </div>
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Chance of Precipitation: <span class="weather-value">${chanceOfPrep}</span></p>
                                </div>
                            </div>
                            <div class="row last-row">
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Pressure: <span class="weather-value">${pressure} hPa</span></p>
                                </div>
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info" id="md-hide-border">Visibility: <span class="weather-value">${visibility} km</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        
    });

    document.querySelector('#accordionPanelsTomorrow').innerHTML = output;
    document.querySelector('#accordionHourlyTomorrowMobile .accordion-body').innerHTML = `<h4 id="date-header-tmr-mobile" class="date-header">Date: ${formattedDate}</h4>` + output;
    document.querySelector('#date-header-tmr').innerHTML = `Date: ${formattedDate}`;

}

async function getOvermorrowHourlyWeather() {
    const response = await fetch(hourlyApiURL + `&appid=${apiKey}`);
    var data = await response.json();

    let output = '';
    let currentTime = Math.floor(new Date().getTime() / 1000);
    let currentHour = new Date().getHours();

    let dateHeader = new Date();
    dateHeader.setDate(dateHeader.getDate() + 2);
    let overmorrowDay = dateHeader.getDate();
    let monthHeader = dateHeader.toLocaleString('default', { month: 'long' });
    let yearHeader = dateHeader.getFullYear();
    let formattedDate = `${overmorrowDay} ${monthHeader} ${yearHeader}`;

    if (currentHour === 23) {
        currentDay++;
    }

    console.log(data);

    data.list.forEach((forecast, index) => {
        
        if (forecast.dt <= currentTime) {
            return;
        }

        let hourlyTemperature = forecast.main.temp.toFixed(1);
        let mininumTemperature = forecast.main.temp_min.toFixed(1);
        let maximumTemperature = forecast.main.temp_max.toFixed(1);
        let humidity = forecast.main.humidity;
        let tempFeelsLike = forecast.main.feels_like.toFixed(1);
        let windspeed = forecast.wind.speed;
        let chanceOfPrep = (forecast.pop * 100).toFixed(0) + `%`;
        let cloudiness = forecast.clouds.all;
        let pressure = forecast.main.pressure;
        let visibility = forecast.visibility / 1000;
        let weatherIconId = forecast.weather[0].icon;

        let unixTimestamp = forecast.dt; // Get the date and time of the forecast
        let date = new Date(unixTimestamp * 1000);
        let forecastDay = date.getDate();
        let checkHour = date.getHours();
        let hours = ("0" + date.getHours()).slice(-2);
        let minutes = ("0" + date.getMinutes()).slice(-2);
        let forecastTime = hours + ":" + minutes;
        let timeDifferenceHours = (unixTimestamp - currentTime) / 3600;
        let day = date.getDate();
        let month = date.toLocaleString('default', { month: 'long' });
        let year = date.getFullYear();
        let formattedDate = `${day} ${month} ${year}`;

        let weatherCondition = forecast.weather[0].main;
        let backgroundImage = '';

        if (forecastDay !== overmorrowDay) {
            return;
        }

        output += `
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapse${index}" aria-expanded="false"
                        aria-controls="panelsStayOpen-collapse${index}">

                        <div class="container-fluid hourly-weather-header">
                            <div class="container-fluid hourly-weather">
                                <div class="col-4 weather-hour-group">
                                    
                                    <p class="weather-hour">${forecastTime}</p>


                                    <h1 class="hourly-temperature">${hourlyTemperature}°C</h1>
                                </div>

                                <div class="col-4 temp-feels-like-group">
                                    <h2 class="temp-feels-like d-none d-md-block">Feels Like: ${tempFeelsLike}°C</h2>
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
                                <h4 class="hourly-date">Date: ${formattedDate}</h4>
                                <h5 class="weather-description d-none d-sm-block">Weather Description: <span class="weather-description-text">${forecast.weather[0].description}</span></h5>
                                <h5 class="weather-description-text d-sm-none">${forecast.weather[0].description}</h5>
                            </div>
                            <div class="row">
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Minimum Temperature: <span class="weather-value">${mininumTemperature}°C</span></p>
                                </div>
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Maximum Temperature: <span class="weather-value">${maximumTemperature}°C</span></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info d-md-none">Feels Like: <span class="weather-value">${tempFeelsLike}°C</span></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Humidity: <span class="weather-value">${humidity}%</span></p>
                                </div>
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Wind Speed: <span class="weather-value">${windspeed} m/s</span></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Cloudiness: <span class="weather-value">${cloudiness}%</span></p>
                                </div>
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Chance of Precipitation: <span class="weather-value">${chanceOfPrep}</span></p>
                                </div>
                            </div>
                            <div class="row last-row">
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Pressure: <span class="weather-value">${pressure} hPa</span></p>
                                </div>
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info" id="md-hide-border">Visibility: <span class="weather-value">${visibility} km</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    document.querySelector('#accordionPanelsOvermorrow').innerHTML = output;
    document.querySelector('#accordionHourlyOvermorrowMobile .accordion-body').innerHTML = `<h4 id="date-header-overmorrow-mobile" class="date-header">Date: ${formattedDate}</h4>` + output;
    document.querySelector('#date-header-overmorrow').innerHTML = `Date: ${formattedDate}`;

}

async function getNextMorrowHourlyWeather() {
    const response = await fetch(hourlyApiURL + `&appid=${apiKey}`);
    var data = await response.json();

    let output = '';
    let currentTime = Math.floor(new Date().getTime() / 1000);
    let currentHour = new Date().getHours();

    let dateHeader = new Date();
    dateHeader.setDate(dateHeader.getDate() + 3);
    let nextMorrowDay = dateHeader.getDate();
    let monthHeader = dateHeader.toLocaleString('default', { month: 'long' });
    let yearHeader = dateHeader.getFullYear();
    let formattedDate = `${nextMorrowDay} ${monthHeader} ${yearHeader}`;

    if (currentHour === 23) {
        currentDay++;
    }

    console.log(data);

    data.list.forEach((forecast, index) => {
        
        if (forecast.dt <= currentTime) {
            return;
        }

        let hourlyTemperature = forecast.main.temp.toFixed(1);
        let mininumTemperature = forecast.main.temp_min.toFixed(1);
        let maximumTemperature = forecast.main.temp_max.toFixed(1);
        let humidity = forecast.main.humidity;
        let tempFeelsLike = forecast.main.feels_like.toFixed(1);
        let windspeed = forecast.wind.speed;
        let chanceOfPrep = (forecast.pop * 100).toFixed(0) + `%`;
        let cloudiness = forecast.clouds.all;
        let pressure = forecast.main.pressure;
        let visibility = forecast.visibility / 1000;
        let weatherIconId = forecast.weather[0].icon;

        let unixTimestamp = forecast.dt; // Get the date and time of the forecast
        let date = new Date(unixTimestamp * 1000);
        let forecastDay = date.getDate();
        let checkHour = date.getHours();
        let hours = ("0" + date.getHours()).slice(-2);
        let minutes = ("0" + date.getMinutes()).slice(-2);
        let forecastTime = hours + ":" + minutes;
        let timeDifferenceHours = (unixTimestamp - currentTime) / 3600;
        let day = date.getDate();
        let month = date.toLocaleString('default', { month: 'long' });
        let year = date.getFullYear();
        let formattedDate = `${day} ${month} ${year}`;

        let weatherCondition = forecast.weather[0].main;
        let backgroundImage = '';

        if (forecastDay !== nextMorrowDay) {
            return;
        }

        output += `
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapse${index}" aria-expanded="false"
                        aria-controls="panelsStayOpen-collapse${index}">

                        <div class="container-fluid hourly-weather-header">
                            <div class="container-fluid hourly-weather">
                                <div class="col-4 weather-hour-group">
                                    
                                    <p class="weather-hour">${forecastTime}</p>


                                    <h1 class="hourly-temperature">${hourlyTemperature}°C</h1>
                                </div>

                                <div class="col-4 temp-feels-like-group">
                                    <h2 class="temp-feels-like d-none d-md-block">Feels Like: ${tempFeelsLike}°C</h2>
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
                                <h4 class="hourly-date">Date: ${formattedDate}</h4>
                                <h5 class="weather-description d-none d-sm-block">Weather Description: <span class="weather-description-text">${forecast.weather[0].description}</span></h5>
                                <h5 class="weather-description-text d-sm-none">${forecast.weather[0].description}</h5>
                            </div>
                            <div class="row">
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Minimum Temperature: <span class="weather-value">${mininumTemperature}°C</span></p>
                                </div>
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Maximum Temperature: <span class="weather-value">${maximumTemperature}°C</span></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info d-md-none">Feels Like: <span class="weather-value">${tempFeelsLike}°C</span></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Humidity: <span class="weather-value">${humidity}%</span></p>
                                </div>
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Wind Speed: <span class="weather-value">${windspeed} m/s</span></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Cloudiness: <span class="weather-value">${cloudiness}%</span></p>
                                </div>
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Chance of Precipitation: <span class="weather-value">${chanceOfPrep}</span></p>
                                </div>
                            </div>
                            <div class="row last-row">
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info">Pressure: <span class="weather-value">${pressure} hPa</span></p>
                                </div>
                                <div class="col-md-6 weather-info-section">
                                    <p class="hourly-weather-info" id="md-hide-border">Visibility: <span class="weather-value">${visibility} km</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    document.querySelector('#accordionPanelsNextMorrow').innerHTML = output;
    document.querySelector('#accordionHourlyNextMorrowMobile .accordion-body').innerHTML = `<h4 id="date-header-nextMorrow-mobile" class="date-header">Date: ${formattedDate}</h4>` + output;
    document.querySelector('#date-header-nextMorrow').innerHTML = `Date: ${formattedDate}`

}

function getCurrentDate() {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dateTitles = ["Today: ", "Tomorrow: ", "Overmorrow: ", "The next morrow: "];
    var ids = ["todayDate", "tmrDate", "overmorrowDate", "nextMorrowDate"]; // replace with your actual IDs
    var idMobile = ["todayDateMobile", "tmrDateMobile", "overmorrowDateMobile", "nextMorrowDateMobile"];

    for (let i = 0; i < 4; i++) {
        var date = new Date();
        date.setDate(date.getDate() + i); // add i days to the current date

        var day = date.getDate();
        var month = date.toLocaleString('default', { month: 'long' });
        var year = date.getFullYear();
        let weekday = dayNames[date.getDay()];

        /* var fullDate = weekday + ', ' + day + ' ' + month + ' ' + year; */

        document.querySelector("#" + ids[i]).innerHTML = dateTitles[i] + weekday;
        document.querySelector("#" + idMobile[i]).innerHTML = dateTitles[i] + weekday;
    }
}


getTodayHourlyWeather();
getTomorrowHourlyWeather();
getOvermorrowHourlyWeather();
getNextMorrowHourlyWeather();

document.addEventListener('DOMContentLoaded', function() {
    getCurrentDate();
});

window.onload = function() {
    getCurrentDate();
}
