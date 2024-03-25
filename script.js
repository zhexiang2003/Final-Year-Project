const apiKey = "189e9fd9c8b15d29e1d54333f28b46c3"
const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=Semenyih&units=metric"
const hourlyApiURL = "https://pro.openweathermap.org/data/2.5/forecast/hourly?q=Semenyih&units=metric"

const scrollContainer = document.querySelector('.container-fluid.hourlyWeatherDisplay');
const scrollLeftButton = document.querySelector('.carousel-control-prev');
const scrollRightButton = document.querySelector('.carousel-control-next');

const weatherIcons = {
    'Clear': 'fas fa-sun',
    'Clouds': 'fas fa-cloud',
    'Rain': 'fas fa-cloud-rain',
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

    data.list.forEach((forecast, index) => {

        if (forecast.dt <= currentTime) {
            return;
        }

        let hourlyTemperature = forecast.main.temp;
        let roundedHourlyTemperature = hourlyTemperature.toFixed(1);

        let humidity = forecast.main.humidity;
        let tempFeelsLike = forecast.main.feels_like;
        let windspeed = forecast.wind.speed;

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
                    <p class="card-text">Forecast Time: ${forecastTime}</p>
                    <p class="card-text">Temperature: ${roundedHourlyTemperature}°C</p>
                    <p class="card-text">Feels Like: ${tempFeelsLike}°C</p>
                    <p class="card-text">Humidity: ${humidity}%</p>
                    <p class="card-text">Wind Speed: ${windspeed} m/s</p>
                </div>
            </div>
        `;

        if ((index + 1) % 3 === 0 || index === data.list.length - 1) {
            const activeClass = output === '' ? ' active' : '';
            output += `
                <div class="carousel-item${activeClass}">
                    <div class="container-fluid hourlyWeatherDisplay">
                        ${carouselItem}
                    </div>
                </div>
            `;
            carouselItem = ''; // Reset the carouselItem for the next group of forecasts
        }
    });

    document.querySelector('.carousel-inner').innerHTML = output;
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
});

setInterval(getCurrentTime, 1000);

checkWeather();
getHourlyWeather();
