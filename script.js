const apiKey = "189e9fd9c8b15d29e1d54333f28b46c3"
const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=Semenyih&units=metric"

async function checkWeather() {
    const response = await fetch(apiURL + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data)
}

checkWeather();
