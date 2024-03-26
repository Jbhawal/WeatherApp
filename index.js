const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
    const APIKey = "b6a9e2657aa95c05801c89167153347e";
    const city = document.querySelector('.search-box input').value;
    if (city == '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod == '404') {
                // Handle when city is not found
                error404.classList.add('active');
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                container.style.height = '555px';
            } else {
                // Handle when weather data is available
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active');
                container.style.height = '555px';

                const image = document.querySelector('.weather-box img');

                const weatherCondition = json.weather[0].main.toLowerCase();
                let imageName;

                switch (weatherCondition) {
                    case 'clear':
                        imageName = 'clear.png';
                        break;
                    case 'rain':
                        imageName = 'rain.png';
                        break;
                    case 'snow':
                        imageName = 'snow.png';
                        break;
                    case 'clouds':
                        imageName = 'cloud.png';
                        break;
                    case 'mist':
                    case 'haze':
                        imageName = 'mist.png';
                        break;
                    default:
                        imageName = 'cloud.png';
                }

                image.src = `images/${imageName}`;

                const temperature = document.querySelector('.weather-box .temperature');
                const description = document.querySelector('.weather-box .description');
                const humidity = document.querySelector('.weather-details .humidity span');
                const wind = document.querySelector('.weather-details .wind span');

                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)} kmph`;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});
