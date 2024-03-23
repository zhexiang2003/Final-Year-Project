const apiKey = "189e9fd9c8b15d29e1d54333f28b46c3"
const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=Semenyih&units=metric"
const hourlyApiURL = "https://pro.openweathermap.org/data/2.5/forecast/hourly?q=Semenyih&units=metric"

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

async function checkHourlyWeather() {
    const response = await fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=Semenyih&units=metric` + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);
    /* let hourlyTemperature = data.main.temp;
    let roundedHourlyTemperature = hourlyTemperature.toFixed(1); */

}

function getCurrentTime() {
    var date = new Date();
    var hours = date.getHours();
    var minute = date.getMinutes();
    var seconds = date.getSeconds();

    minute = minute < 10 ? '0'+minute : minute;
    seconds = seconds < 10 ? '0'+seconds : seconds;
    var timeString = hours + ':' + minute + ':' + seconds;

    document.querySelector(".time").innerHTML = timeString;
}

function getCurrentDate() {
    var date = new Date();
    var day = date.getDate();
    var month = date.toLocaleString('default', {month:'long'});
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
checkHourlyWeather();
