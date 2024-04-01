const apiKey = "189e9fd9c8b15d29e1d54333f28b46c3"
const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=Semenyih&units=metric"
const hourlyApiURL = "https://pro.openweathermap.org/data/2.5/forecast/hourly?q=Semenyih&units=metric"

const scrollContainer = document.querySelector('.container-fluid.hourlyWeatherDisplay');
const scrollLeftButton = document.querySelector('.carousel-control-prev');
const scrollRightButton = document.querySelector('.carousel-control-next');

const weatherIcons = {
    'Clear': 'bi bi-sun',
    'Clouds': 'bi bi-cloud',
    'Rain': 'bi bi-cloud-rain',
    'Snow': 'fas fa-snowflake',
    
    // Add more mappings as needed
};

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

    let temperature = data.main.temp;
    let roundedTemperature = temperature.toFixed(1);

    document.querySelector(".location").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML = roundedTemperature + `°C`;
}

async function getHourlyWeather() {
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

async function getHourlyWeatherTemp() {
    const response = await fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=Semenyih&units=metric` + `&appid=${apiKey}`);
    var data = await response.json();

    let output = '';
    let currentTime = Math.floor(new Date().getTime() / 1000);

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
        let visibility = forecast.main.visibility;

        let unixTimestamp = forecast.dt; // Get the date and time of the forecast
        let date = new Date(unixTimestamp * 1000);
        let checkHour = date.getUTCHours();
        let hours = ("0" + date.getHours()).slice(-2);
        let minutes = ("0" + date.getMinutes()).slice(-2);
        let forecastTime = hours + ":" + minutes;

        let weatherIconClass;

        if (forecast.weather[0].main === 'Clear') {
            weatherIconClass = (checkHour >= 18 || checkHour < 6) ? 'bi bi-moon-stars' : 'bi bi-sun';
        } else {
            weatherIconClass = weatherIcons[forecast.weather[0].main] || 'bi bi-question';
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
                                <i class="${weatherIconClass}"></i>
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
                                <h4 class="hourly-date">Date: ${date.toDateString()}</h4>
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
                                    <p class="hourly-weather-info" id="md-hide-border">Visibility: <span class="weather-value">${visibility / 1000}km</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    document.querySelector('#accordionPanelsStayOpenExample').innerHTML = output;
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



document.addEventListener('DOMContentLoaded', (event) => {
    getCurrentTime();
    getCurrentDate();

    $('.accordion-button').on('click', function() {
        // Toggle the icon class on this button
        $(this).find('i').toggleClass('bi-chevron-down bi-chevron-up');
    }); 
});

setInterval(getCurrentTime, 1000);

checkWeather();
getHourlyWeatherTemp();

