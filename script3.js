const apiKey = "189e9fd9c8b15d29e1d54333f28b46c3"
const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=Semenyih&units=metric"
const dailyApiURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=Semenyih&cnt=16&units=metric"

async function getDailyForecast() {
    const response = await fetch(dailyApiURL + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);
}