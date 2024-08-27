

const apiKey = 'cc9d9d4b268fc8d3fc53696835602056'; // Your actual API key

// Function to get weather by city name
function getWeatherByCity() {
    const city = document.getElementById('locationInput').value;
    if (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
            .then(response => {
                console.log(response); // Log the entire response object
                if (!response.ok) {
                    return response.json().then(data => {
                        console.log('Error data:', data); // Log the error response data
                        throw new Error('City not found');
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Weather data:', data); // Log the successful response data
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error:', error); // Log the error to the console
                alert('City not found');
            });
    } else {
        alert('Please enter a city name');
    }
}

// Function to get weather by user's location
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
                .then(response => {
                    console.log(response); // Log the entire response object
                    if (!response.ok) {
                        return response.json().then(data => {
                            console.log('Error data:', data); // Log the error response data
                            throw new Error('Unable to retrieve weather data');
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Weather data:', data); // Log the successful response data
                    displayWeather(data);
                })
                .catch(error => {
                    console.error('Error:', error); // Log the error to the console
                    alert('Unable to retrieve weather data');
                });
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Function to display weather data
function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}
