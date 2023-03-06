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

const currentlyFahrenheit = (function assignFahrenheit() {
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

      // if main temp is higher than highest temp, make highest temp equal to main temp
      if (currentTemp.innerHTML > highestTemp) {
        // filter the main temp number
        const temp = `${currentTemp.innerHTML.replace(/\D+/g, '')}&degF`;
        currentHighLow.innerHTML = `High: ${temp} Low: ${lowestTemp}`;
      }
    },

    dewPoint(conditions) {
      const value = Math.round(conditions.dew);
      dewPoint.innerHTML = `Dew point: ${value}&degF`;
    },
  };
}());

// function for applying fahrenheit
function applyCurrentlyFahrenheit(weatherData) {
// assign to current conditions
  const conditions = weatherData.currentConditions;

  currentlyFahrenheit.currentTemp(conditions);
  currentlyFahrenheit.feelsLike(conditions);
  currentlyFahrenheit.highLow(weatherData);
  currentlyFahrenheit.dewPoint(conditions);
}

const locationTitle = document.querySelector('.location');

function checkCurrentlyFahrenheit() {
  // add animation
  addCurrentlyConversionAnimation();

  const currentlyFahrenheitAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?key=${visualCrossing}`;

  fetch(currentlyFahrenheitAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      applyCurrentlyFahrenheit(weatherData);
      removeCurrentlyConversionAnimation();
    });
}

let clicked = false;

currentTemp.addEventListener('click', () => {
  if (!clicked) {
    checkCurrentlyFahrenheit();
    clicked = true;
  } else {
    checkCurrentlyCelcius();
    clicked = false;
  }
});
