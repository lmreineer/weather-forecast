/* eslint-disable import/extensions */

import { visualCrossing } from '../../apiKeys.js';
import { checkCurrentlyCelcius } from './currentlyCelciusConversion.js';

import {
  currentTemp,
  feelsLike,
  currentHighLow,
  dewPoint,
} from '../currentlyDetails.js';

import {
  addCurrentlyConversionAnimation,
  removeCurrentlyConversionAnimation,
} from './currentlyConversionAnimation.js';

const fahrenheit = (function assignFahrenheit() {
  return {
    currentTemp(conditions) {
      const temp = `${Math.round(conditions.temp)} &degF | <span class="convert-unit">&degC</span>`;
      currentTemp.innerHTML = temp;
    },

    feelsLike(conditions) {
      const temp = `${Math.round(conditions.feelslike)}&degF`;
      feelsLike.innerHTML = `Feels like: ${temp}`;
    },

    highLow(weatherData) {
      const highestTemp = `${Math.round(weatherData.days[0].tempmax)}&degF`;
      const lowestTemp = `${Math.round(weatherData.days[0].tempmin)}&degF`;
      currentHighLow.innerHTML = `High: ${highestTemp} Low: ${lowestTemp}`;

      // if current temp is higher than highest temp
      if (currentTemp.innerHTML > highestTemp) {
        // filter the current temp number
        const temp = `${currentTemp.innerHTML.replace(/\D+/g, '')}&degF`;
        // make highest temp equal to current temp
        currentHighLow.innerHTML = `High: ${temp} Low: ${lowestTemp}`;
      }
    },

    dewPoint(conditions) {
      const value = Math.round(conditions.dew);
      dewPoint.innerHTML = `Dew point: ${value}&degF`;
    },
  };
}());

function applyFahrenheit(weatherData) {
  const conditions = weatherData.currentConditions;

  fahrenheit.currentTemp(conditions);
  fahrenheit.feelsLike(conditions);
  fahrenheit.highLow(weatherData);
  fahrenheit.dewPoint(conditions);
}

function checkFahrenheit() {
  // add preload animation
  addCurrentlyConversionAnimation();

  const locationTitle = document.querySelector('.location');

  const fahrenheitAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?key=${visualCrossing}`;

  fetch(fahrenheitAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      applyFahrenheit(weatherData);

      removeCurrentlyConversionAnimation();
    });
}

let clicked = false;

currentTemp.addEventListener('click', () => {
  if (!clicked) {
    checkFahrenheit();
    clicked = true;
  } else {
    checkCurrentlyCelcius();
    clicked = false;
  }
});
