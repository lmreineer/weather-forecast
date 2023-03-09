/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import { visualCrossing } from '../../apiKeys.js';

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

const celcius = (function assignCelcius() {
  return {
    currentTemp(conditions) {
      const temp = `${Math.round(conditions.temp)} &degC | <span class="convert-unit">&degF</span>`;
      currentTemp.innerHTML = temp;
    },

    feelsLike(conditions) {
      const temp = `${Math.round(conditions.feelslike)}&degC`;
      feelsLike.innerHTML = `Feels like: ${temp}`;
    },

    highLow(weatherData) {
      const high = `${Math.round(weatherData.days[0].tempmax)}&degC`;
      const low = `${Math.round(weatherData.days[0].tempmin)}&degC`;
      currentHighLow.innerHTML = `High: ${high} Low: ${low}`;
    },

    dewPoint(conditions) {
      const value = Math.round(conditions.dew);
      dewPoint.innerHTML = `Dew point: ${value}&degC`;
    },
  };
}());

function applyCelcius(weatherData) {
  const conditions = weatherData.currentConditions;

  celcius.currentTemp(conditions);
  celcius.feelsLike(conditions);
  celcius.highLow(weatherData);
  celcius.dewPoint(conditions);
}

function checkCurrentlyCelcius() {
  // add preload animation
  addCurrentlyConversionAnimation();

  const locationTitle = document.querySelector('.location');

  const celciusAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?unitGroup=metric&key=${visualCrossing}`;

  fetch(celciusAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      applyCelcius(weatherData);

      removeCurrentlyConversionAnimation();
    });
}

export { checkCurrentlyCelcius };
