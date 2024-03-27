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

getHourlyWeather();