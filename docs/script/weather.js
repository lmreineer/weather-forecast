/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */

import {
  openWeatherMap,
} from './apiKeys.js';

const currentTemp = document.querySelector('.current-temp');
const currentImage = document.querySelector('.current-image');
const description = document.querySelector('.current-desc');
const feelsLike = document.querySelector('.feels-like');
const highLow = document.querySelector('.high-low');
const humidity = document.querySelector('.humidity');
const pressure = document.querySelector('.pressure');
const wind = document.querySelector('.wind');

const converter = (function convertTemp() {
  return {
    mainTemp(data) {
      return `${Math.round(data.main.temp - 273.15)}°C`;
    },

    feelsLikeTemp(data) {
      return `Feels like: ${Math.round(data.main.feels_like - 273.15)}°C`;
    },

    highlowTemp(data) {
      const high = `${Math.round(data.main.temp_max - 273.15)}°C`;
      const low = `${Math.round(data.main.temp_min - 273.15)}°C`;
      return `High/low: ${high} / ${low}`;
    },

    time(data) {
      const date = new Date(data.dt * 1000);
      return date.toLocaleTimeString('en-US');
    },

    humidityPercent(data) {
      return `Humidity: ${data.main.humidity}%`;
    },

    pressureBar(data) {
      return `Pressure: ${data.main.pressure} mbar`;
    },

    windSpeed(data) {
      const kph = Math.round((data.wind.speed * 3600) / 1000);
      const compassPoints = ['North', 'NNE', 'North East', 'ENE',
        'East', 'ESE', 'South East', 'SSE',
        'South', 'SSW', 'South West', 'WSW',
        'West', 'WNW', 'North West', 'NNW'];
      const rawPosition = Math.floor(data.wind.deg / 22.5 + 0.5);
      const arrayPosition = (rawPosition % 16);
      return `Wind speed: ${kph} km/h ${compassPoints[arrayPosition]}`;
    },
  };
}());

function applyWeather(data) {
  // capitalize the first letter
  const initial = data.weather[0].description;
  const titleCase = initial.charAt(0).toUpperCase() + initial.slice(1);
  description.innerText = `${titleCase}`;

  currentTemp.innerText = converter.mainTemp(data);
  feelsLike.innerText = converter.feelsLikeTemp(data);
  highLow.innerText = converter.highlowTemp(data);
  humidity.innerText = converter.humidityPercent(data);
  pressure.innerText = converter.pressureBar(data);
  wind.innerText = converter.windSpeed(data);
}

function checkWeather(lat, lon) {
  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherMap}`;

  fetch(weatherAPI)
    .then((response) => response.json())
    .then((data) => applyWeather(data))
    // eslint-disable-next-line no-console
    .catch((error) => console.error(error));
}

export {
  checkWeather,
  currentTemp,
  currentImage,
  description,
  feelsLike,
  highLow,
  humidity,
  pressure,
  wind,
};
