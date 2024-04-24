const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=Semenyih&units=metric"
const hourlyApiURL = "https://pro.openweathermap.org/data/2.5/forecast/hourly?q=Semenyih&units=metric"
const apiKey = process.env.API_KEY;

const scrollContainer = document.querySelector('.container-fluid.hourlyWeatherDisplay');
const scrollLeftButton = document.querySelector('.carousel-control-prev');
const scrollRightButton = document.querySelector('.carousel-control-next');

const weatherIcons = {
    'Clear': 'bi bi-sun',
    'Clouds': 'bi bi-cloud',
    'Rain': 'bi bi-cloud-rain',
    'Thunderstorm': 'bi bi-cloud-lightning-rain'
    // Add more mappings as needed
};

const weatherImage = {
    'Clear': 'Images/University-Day-2.jpg',
    'Clouds': 'Images/University-Day-2.jpg',
    'Night': 'Images/University-Night-2.png'
}

/* scrollLeftButton.addEventListener('click', () => {
    scrollContainer.scrollLeft -= 600;
});

scrollRightButton.addEventListener('click', () => {
    scrollContainer.scrollLeft += 600;
}); */

function updateNavBarHeight() {
    var navBar = document.querySelector('.navbar');
    var navbarHeight = navBar.offsetHeight;
    document.documentElement.style.setProperty('--navbar-height', navbarHeight + 'px')

    console.log(navbarHeight);
}

// Update the navbar height when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', updateNavBarHeight);

// Update the navbar height whenever the window is resized
window.addEventListener('resize', updateNavBarHeight);

async function checkWeather() {
    const response = await fetch(apiURL + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    let temperature = data.main.temp;
    let roundedTemperature = temperature.toFixed(1);
    let currentWeather = data.weather[0].main;
    let currentWeatherDesc = data.weather[0].description;
    let date = new Date();
    let checkHour = date.getHours();

    let sunrise = new Date(data.sys.sunrise * 1000);
    let sunriseHours = ("0" + sunrise.getHours()).slice(-2);
    let sunriseMinutes = ("0" + sunrise.getMinutes()).slice(-2);
    let sunriseTime = sunriseHours + ":" + sunriseMinutes;

    let sunset = new Date(data.sys.sunset * 1000);
    let sunsetHours = ("0" + sunset.getHours()).slice(-2);
    let sunsetMinutes = ("0" + sunset.getMinutes()).slice(-2);
    let sunsetTime = sunsetHours + ":" + sunsetMinutes;

    document.querySelector(".location").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML = roundedTemperature + `°C`;
    document.querySelector(".current-weather-condition").innerHTML += currentWeather + `<span class="weather-desc d-none d-sm-inline">, ${currentWeatherDesc}</span>`;
    document.querySelector(".current-weather-condition-mobile").innerHTML = currentWeatherDesc;

    if (checkHour >= 6 && checkHour < 19) {
        if (currentWeather === 'Clear' || currentWeather === 'Clouds') {
            backgroundImage = 'day-clear-cloudy';
        } else if (currentWeather === 'Rain') {
            backgroundImage = 'day-rain';
        }
    } else {
        if (currentWeather === 'Clear' || currentWeather === 'Clouds') {
            backgroundImage = 'night-clear-cloudy';
        } else if (currentWeather === 'Rain') {
            backgroundImage = 'night-rain';
        }
    }

    let overlay = document.querySelector('.overlay-background');
    overlay.className = 'overlay-background ' + backgroundImage;

    document.querySelector("#sunrise-value").innerHTML = sunriseTime;
    document.querySelector("#min-temp-value").innerHTML = (data.main.temp_min).toFixed(1) + '°C';
    document.querySelector("#wind-speed-value").innerHTML = data.wind.speed + 'm/s';
    document.querySelector("#cloudiness-value").innerHTML = data.clouds.all + '%';
    document.querySelector("#sunrise-value-mobile").innerHTML = sunriseTime;
    document.querySelector("#min-temp-value-mobile").innerHTML = (data.main.temp_min).toFixed(1) + '°C';
    document.querySelector("#wind-speed-value-mobile").innerHTML = data.wind.speed + 'm/s';
    document.querySelector("#cloudiness-value-mobile").innerHTML = data.clouds.all + '%';

    document.querySelector("#sunset-value").innerHTML = sunsetTime;
    document.querySelector("#max-temp-value").innerHTML = (data.main.temp_max).toFixed(1) + '°C';
    document.querySelector("#pressure-value").innerHTML = data.main.pressure + 'hPa';
    document.querySelector("#visibility-value").innerHTML = (data.visibility / 1000) + 'km';
    document.querySelector("#sunset-value-mobile").innerHTML = sunsetTime;
    document.querySelector("#max-temp-value-mobile").innerHTML = (data.main.temp_max).toFixed(1) + '°C';
    document.querySelector("#pressure-value-mobile").innerHTML = data.main.pressure + 'hPa';
    document.querySelector("#visibility-value-mobile").innerHTML = (data.visibility / 1000) + ' km';
}

function getCurrentTime() {
    var date = new Date();
    var hours = date.getHours();
    var minute = date.getMinutes();
    var seconds = date.getSeconds();

    minute = minute < 10 ? '0' + minute : minute;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var timeString = hours + ':' + minute + ':' + seconds;

    document.querySelector(".time").innerHTML = timeString;
}

function getCurrentDate() {
    var date = new Date();
    var day = date.getDate();
    var month = date.toLocaleString('default', { month: 'long' });
    var year = date.getFullYear();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let weekday = dayNames[date.getDay()];

    var fullDate = weekday + ', ' + day + ' ' + month + ' ' + year;

    document.querySelector(".date").innerHTML = fullDate;

}

async function getCurrentHourlyWeather() {
    const response = await fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=Semenyih&units=metric` + `&appid=${apiKey}`);
    var data = await response.json();

    let output = '';
    let currentTime = Math.floor(new Date().getTime() / 1000);
    let currentDay = new Date().getDate();
    let currentHour = new Date().getHours();

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
        document.querySelector('.no-more-info').innerHTML = `<p class="no-more-info-text">Please wait until 00:00 for the next day's hourly weather forecast</p>`;
    }

    document.querySelector('#accordionPanelsStayOpenExample').innerHTML = output;
    
}


document.addEventListener('DOMContentLoaded', (event) => {
    getCurrentTime();
    getCurrentDate();
    checkWeather();

    $('.accordion-button').on('click', function () {
        // Toggle the icon class on this button
        $(this).find('i').toggleClass('bi-chevron-down bi-chevron-up');
    });
});

setInterval(getCurrentTime, 1000);
getCurrentHourlyWeather();
