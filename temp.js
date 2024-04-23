/* async function getHourlyWeather() {
    const response = await fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=Semenyih&units=metric` + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    let output = '';
    let carouselItem = '';
    let currentTime = Math.floor(new Date().getTime() / 1000);
    console.log(currentTime);

    let itemsPerSlide;

    // Function to update itemsPerSlide based on screen width
    function updateItemsPerSlide() {
        let screenWidth = window.innerWidth;

        if (screenWidth >= 992) { // Large screens
            itemsPerSlide = 3;
        } else if (screenWidth >= 768) { // Medium screens
            itemsPerSlide = 2;
        } else { // Small screens
            itemsPerSlide = 1;
        }

        // Re-render the carousel when itemsPerSlide is updated
        renderCarousel();
    }

    // Function to render the carousel
    function renderCarousel() {
        output = ''; // Clear existing output

        data.list.forEach((forecast, index) => {

            if (forecast.dt <= currentTime) {
                return;
            }

            let hourlyTemperature = forecast.main.temp;
            let roundedHourlyTemperature = hourlyTemperature.toFixed(1);

            let humidity = forecast.main.humidity;
            
            let tempFeelsLike = forecast.main.feels_like;
            let roundedTempFeelsLike = tempFeelsLike.toFixed(1);

            let windspeed = forecast.wind.speed;
            let chanceOfPrep = forecast.pop;

            let unixTimestamp = forecast.dt; // Get the date and time of the forecast
            let date = new Date(unixTimestamp * 1000);

            let hours = ("0" + date.getHours()).slice(-2);
            let minutes = ("0" + date.getMinutes()).slice(-2);

            let forecastTime = hours + ":" + minutes;

            let weatherIconClass = weatherIcons[forecast.weather[0].main] || 'fas fa-question';

            carouselItem += `
                <div class="container hourly-weather">
                    <div class="card-body">
                        <i class="${weatherIconClass}"></i>
                        <h5 class="card-title">${forecast.weather[0].main}</h5>
                        <p class="card-text">Chance of Precipitation: ${chanceOfPrep}</p>
                        <p class="card-text">Forecast Time: ${forecastTime}</p>
                        <p class="card-text">Temperature: ${roundedHourlyTemperature}°C</p>
                        <p class="card-text">Feels Like: ${roundedTempFeelsLike}°C</p>
                        <p class="card-text">Humidity: ${humidity}%</p>
                        <p class="card-text">Wind Speed: ${windspeed} m/s</p>
                    </div>
                </div>
            `;

            if ((index + 1) % itemsPerSlide === 0 || index === data.list.length - 1) {
                const activeClass = output === '' ? ' active' : '';
                output += `
                    <div class="carousel-item${activeClass}">
                        <div class="container hourlyWeatherDisplay">
                            ${carouselItem}
                        </div>
                    </div>
                `;
                carouselItem = ''; // Reset the carouselItem for the next group of forecasts
            }
        });

        document.querySelector('.carousel-inner').innerHTML = output;
    }

    // Call updateItemsPerSlide initially
    updateItemsPerSlide();

    // Use ResizeObserver to dynamically update itemsPerSlide
    const resizeObserver = new ResizeObserver(updateItemsPerSlide);
    resizeObserver.observe(document.querySelector('.carousel-inner'));
}

getHourlyWeather(); */

async function checkDailyForecast() {
    const response = await fetch("https://api.openweathermap.org/data/2.5/forecast/daily?q=Semenyih,MY&appid=189e9fd9c8b15d29e1d54333f28b46c3&units=metric")
    var data = await response.json();

    console.log(data);

}

checkDailyForecast();

/* let currentForecastIndex = 0;
async function getFullHourlyWeather() {
    const response = await fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=Semenyih&units=metric&appid=189e9fd9c8b15d29e1d54333f28b46c3`);
    var data = await response.json();

    let output = '';
    let currentTime = Math.floor(new Date().getTime() / 1000);
    let currentDay = new Date().getDate();
    let currentHour = new Date().getHours();
    let accordionIndex = 0;

    if (currentHour === 47) {
        currentDay += 2;
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

        if (formattedDate !== currentDay) {
            // Start a new day section in the output
            if (currentDay !== '') {
                output += `</div>`;
            }

            output += `
                <div class="accordion" id="accordion${accordionIndex}">
                    <h2>${formattedDate}</h2>
            `;

            currentDay = formattedDate;
            accordionIndex++;
        }


        output += `
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapse${index}" aria-expanded="false"
                        aria-controls="panelsStayOpen-collapse${index}">

                        <div class="container-fluid hourly-weather-header">
                            <div class="container-fluid hourly-weather">
                                <p class="weather-hour">${forecastTime}</p>
                                <i class="weather-icon">
                                    <img src="http://openweathermap.org/img/wn/${weatherIconId}.png" alt="Weather icon" class="api-icon">
                                </i>
                                <h1 class="hourly-temperature">${hourlyTemperature}°C</h1>
                                <h2 class="temp-feels-like d-none d-md-block">Feels Like: ${tempFeelsLike}°C</h2>
                                <div class="chance-of-prep-group">
                                    <i class="bi bi-droplet d-none d-sm-block"></i>
                                    <h2 class="chance-of-prep d-none d-sm-block">${chanceOfPrep}</h2>
                                </div>
                            </div>
                            <div class="container-fluid weather-condition">
                                <h2 class="weather-condition-text">${forecast.weather[0].main}</h2>
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

        if (index + 1 < data.list.length) {
            let nextForecast = data.list[index+1];
            let nextDate = new Date(nextForecast.dt * 1000)
            let nextFormattedDate = `${nextDate.getDate()} ${nextDate.toLocaleString('default', { month: 'long' })} ${nextDate.getFullYear()}`;
    
            if (nextFormattedDate !== formattedDate) {
                output += `</div>`;
            }
        }
    });
    output += `</div>`;

    document.querySelector('#accordionFullHourlyWeather').innerHTML = output;

    currentDay++;
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.load-more-button').addEventListener('click', getFullHourlyWeather);
});

getFullHourlyWeather() */

async function getTodayHourlyWeather() {
    const response = await fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=Semenyih&units=metric&appid=189e9fd9c8b15d29e1d54333f28b46c3`);
    var data = await response.json();

    let output = '';
    let currentTime = Math.floor(new Date().getTime() / 1000);
    let currentDay = new Date().getDate();
    let currentHour = new Date().getHours();
    let accordionIndex = 0;

    if (currentHour >= 23) {
        currentDay ++;
    }

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

        if (formattedDate !== currentDay) {
            // Start a new day section in the output

            if (currentDay !== '') {
                output += `</div>`;
            }

            output += `
                <div class="accordion" id="accordion${accordionIndex}">
                    <h2>${formattedDate}</h2>
            `;

            currentDay = forecastDay;
            accordionIndex++;
        }


        /* 
        let weatherIconClass;

        if (forecast.weather[0].main === 'Clear') {
            weatherIconClass = (checkHour >= 18 || checkHour < 6) ? 'bi bi-moon-stars' : 'bi bi-sun';
        } else {
            weatherIconClass = weatherIcons[forecast.weather[0].main] || 'bi bi-question';
        }
        */

        output += `
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapse${index}" aria-expanded="false"
                        aria-controls="panelsStayOpen-collapse${index}">

                        <div class="container-fluid hourly-weather-header">
                            <div class="container-fluid hourly-weather">
                                <p class="weather-hour">${forecastTime}</p>
                                <i class="weather-icon">
                                    <img src="http://openweathermap.org/img/wn/${weatherIconId}.png" alt="Weather icon" class="api-icon">
                                </i>
                                <h1 class="hourly-temperature">${hourlyTemperature}°C</h1>
                                <h2 class="temp-feels-like d-none d-md-block">Feels Like: ${tempFeelsLike}°C</h2>
                                <div class="chance-of-prep-group">
                                    <i class="bi bi-droplet d-none d-sm-block"></i>
                                    <h2 class="chance-of-prep d-none d-sm-block">${chanceOfPrep}</h2>
                                </div>
                            </div>
                            <div class="container-fluid weather-condition">
                                <h2 class="weather-condition-text">${forecast.weather[0].main}</h2>
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

    document.querySelector('#accordionFullHourlyWeather').innerHTML = output;
}

getFullHourlyWeather();