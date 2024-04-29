const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=Semenyih&units=metric"
const hourlyApiURL = "https://pro.openweathermap.org/data/2.5/forecast/hourly?q=Semenyih&units=metric"
const apiKey = '189e9fd9c8b15d29e1d54333f28b46c3';

async function checkWeather() {
    const response = await fetch(apiURL + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    let date = new Date();
    let day = date.getDate();
    let month = date.toLocaleString('default', { month: 'long' });
    let year = date.getFullYear();
    let formattedDate = `${day} ${month} ${year}`;

    let sunrise = new Date(data.sys.sunrise * 1000);
    let sunriseHours = ("0" + sunrise.getHours()).slice(-2);
    let sunriseMinutes = ("0" + sunrise.getMinutes()).slice(-2);
    let sunriseSeconds = ("0" + sunrise.getSeconds()).slice(-2);
    let sunriseTime = sunriseHours + ":" + sunriseMinutes + ":" + sunriseSeconds;

    let sunset = new Date(data.sys.sunset * 1000);
    let sunsetHours = ("0" + sunset.getHours()).slice(-2);
    let sunsetMinutes = ("0" + sunset.getMinutes()).slice(-2);
    let sunsetSeconds = ("0" + sunset.getSeconds()).slice(-2);
    let sunsetTime = sunsetHours + ":" + sunsetMinutes + ":" + sunsetSeconds;

    document.querySelector("#sunrise-value").innerHTML = sunriseTime;
    document.querySelector("#temperature-value").innerHTML = (data.main.temp).toFixed(1) + '°C';
    document.querySelector("#min-temp-value").innerHTML = (data.main.temp_min).toFixed(1) + '°C';
    document.querySelector("#wind-speed-value").innerHTML = data.wind.speed + 'm/s';
    document.querySelector("#humidity-value").innerHTML = data.main.humidity + '%';

    document.querySelector("#sunset-value").innerHTML = sunsetTime;
    document.querySelector("#feels-like-value").innerHTML = (data.main.feels_like).toFixed(1) + '°C';
    document.querySelector("#max-temp-value").innerHTML = (data.main.temp_max).toFixed(1) + '°C';
    document.querySelector("#cloudiness-value").innerHTML = data.clouds.all + '%';
    document.querySelector("#visibility-value").innerHTML = (data.visibility / 1000) + 'km';

    document.querySelector(".actual-date").innerHTML = "Date: " + formattedDate;


}

checkWeather();