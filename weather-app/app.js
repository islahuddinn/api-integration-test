// API endpoint - uses Vercel serverless function in production, Vite proxy in dev
const API_BASE = '/api/weather';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const geolocateBtn = document.getElementById('geolocateBtn');
const weatherDisplay = document.getElementById('weatherDisplay');
const loadingSection = document.getElementById('loadingSection');
const errorSection = document.getElementById('errorSection');
const errorText = document.getElementById('errorText');

// Weather Display Elements
const cityName = document.getElementById('cityName');
const temp = document.getElementById('temp');
const weatherDesc = document.getElementById('weatherDesc');
const weatherIcon = document.getElementById('weatherIcon');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');
const sunriseSunset = document.getElementById('sunriseSunset');

// Quick city buttons
document.querySelectorAll('.city-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const city = btn.dataset.city;
        cityInput.value = city;
        fetchWeatherByCity(city);
    });
});

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherByCity(city);
    } else {
        showError('Please enter a city name');
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

geolocateBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            () => {
                showError('Unable to retrieve your location. Please enable location services.');
            }
        );
    } else {
        showError('Geolocation is not supported by your browser.');
    }
});

// Fetch weather by city name
async function fetchWeatherByCity(city) {
    showLoading();
    hideError();
    hideWeather();

    try {
        const url = `${API_BASE}?city=${encodeURIComponent(city)}`;
        const response = await fetch(url);

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`City "${city}" not found. Please check the spelling.`);
            } else if (response.status === 500) {
                throw new Error(data.error || 'Server error. Please try again later.');
            } else {
                throw new Error(data.error || `HTTP error! status: ${response.status}`);
            }
        }

        displayWeather(data);
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
}

// Fetch weather by coordinates (geolocation)
async function fetchWeatherByCoords(lat, lon) {
    showLoading();
    hideError();
    hideWeather();

    try {
        const url = `${API_BASE}?lat=${lat}&lon=${lon}`;
        const response = await fetch(url);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || `HTTP error! status: ${response.status}`);
        }

        displayWeather(data);
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
}

// Display weather data
function displayWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temp.textContent = Math.round(data.main.temp);
    weatherDesc.textContent = data.weather[0].description;

    // Weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    // Details
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    pressure.textContent = `${data.main.pressure} hPa`;

    // Convert visibility from meters to km
    const visibilityKm = (data.visibility / 1000).toFixed(1);
    visibility.textContent = `${visibilityKm} km`;

    // Sunrise and Sunset
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);
    sunriseSunset.textContent = `${formatTime(sunrise)} / ${formatTime(sunset)}`;

    showWeather();
}

// Format time helper
function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// UI Helpers
function showLoading() {
    loadingSection.style.display = 'block';
}

function hideLoading() {
    loadingSection.style.display = 'none';
}

function showWeather() {
    weatherDisplay.style.display = 'block';
}

function hideWeather() {
    weatherDisplay.style.display = 'none';
}

function showError(message) {
    errorText.textContent = message;
    errorSection.style.display = 'block';
}

function hideError() {
    errorSection.style.display = 'none';
}

// Load default city on page load
fetchWeatherByCity('London');