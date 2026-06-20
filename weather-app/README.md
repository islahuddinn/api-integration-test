# 🌤 Weather Dashboard - API Integration MVP

A real-time weather dashboard built with vanilla JavaScript that integrates with the **OpenWeather API**. This project demonstrates clean API integration, error handling, async/await patterns, and a polished UI.

## 🚀 Live Demo

Simply open `index.html` in any modern browser after adding your API key.

## 🛠 Tech Stack

- **Vanilla JavaScript** (ES6+) - No frameworks, no build tools
- **HTML5** - Semantic markup
- **CSS3** - Modern layout with Flexbox/Grid, animations, responsive design
- **OpenWeather API** - Free weather data provider

## 📋 Features

- Search weather by city name
- Quick-select popular cities
- Geolocation support (auto-detect your location)
- Real-time weather data: temperature, humidity, wind, pressure, visibility, sunrise/sunset
- Loading states and error handling
- Responsive design (mobile-friendly)
- Clean, modern UI with animations

## 🔑 Getting an API Key

1. Go to [https://openweathermap.org/api](https://openweathermap.org/api)
2. Click **"Sign Up"** and create a free account
3. Once logged in, go to **"API Keys"** tab in your account dashboard
4. Copy your default API key (or generate a new one)
5. The free tier allows **60 calls/minute** and **1,000,000 calls/month** - plenty for testing

## ⚙️ Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/islahuddinn/api-integration-test.git
   cd api-integration-test/weather-app
   ```

2. **Add your API key**
   - Open `app.js`
   - Replace `YOUR_API_KEY_HERE` with your actual OpenWeather API key:
     ```js
     const API_KEY = 'your_actual_api_key_here';
     ```

3. **Open the app**
   - Double-click `index.html` or serve with any HTTP server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (npx)
   npx serve .
   ```

## 📁 Project Structure

```
weather-app/
├── index.html      # Main HTML file
├── style.css       # All styles
├── app.js          # JavaScript logic & API integration
└── README.md       # This file
```

## 🔌 API Integration Details

**Endpoint:** `https://api.openweathermap.org/data/2.5/weather`

**Parameters:**
- `q` - City name (e.g., "London")
- `lat`/`lon` - Geographic coordinates (for geolocation)
- `appid` - Your API key
- `units=metric` - Temperature in Celsius

**Response includes:**
- Temperature, feels-like, humidity, pressure
- Wind speed and direction
- Visibility
- Sunrise/sunset times (Unix timestamps converted to readable time)
- Weather condition with icon

## 🧪 Error Handling

The app handles:
- **404** - City not found (typo or non-existent city)
- **401** - Invalid/missing API key
- **Network errors** - No internet connection
- **Geolocation errors** - User denied or unavailable
- **Empty input** - Validation before API call

## 📸 Screenshot

*(Add your screenshot here)*

---

Built with ❤️ for API integration demonstration.