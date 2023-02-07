/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */

import {
  openWeatherMap,
} from './apiKeys.js';

const currentTemp = document.querySelector('.current-temp');
const description = document.querySelector('.current-desc');
const feelsLike = document.querySelector('.feels-like');
const highLow = document.querySelector('.high-low');
const currentImage = document.querySelector('.current-image');
const humidity = document.querySelector('.humidity');
const pressure = document.querySelector('.pressure');
const wind = document.querySelector('.wind');

function applyWeather(data) {
  console.log(data);
  const temp = `${Math.round(data.main.temp - 273.15)}°C`;
  const feels = `${Math.round(data.main.feels_like - 273.15)}°C`;

  currentTemp.innerText = `${temp}`;
  feelsLike.innerText = `Feels like: ${feels}`;
}

function checkWeather(lat, lon) {
  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherMap}`;

  fetch(weatherAPI)
    .then((response) => response.json())
    .then((data) => applyWeather(data))
    .catch((error) => console.error(error));
}

export {
  checkWeather,
};
