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

const celcius = (function assigncelcius() {
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

      // if main temp is higher than highest temp, make highest temp equal to main temp
      if (currentTemp.innerHTML > high) {
        // filter the main temp number
        const temp = `${currentTemp.innerHTML.replace(/\D+/g, '')}&degC`;
        currentHighLow.innerHTML = `High: ${temp} Low: ${low}`;
      }
    },

    dewPoint(conditions) {
      const value = Math.round(conditions.dew);
      dewPoint.innerHTML = `Dew point: ${value}&degC`;
    },
  };
}());

// function for applying celcius
function applyCelcius(weatherData) {
// assign to current conditions
  const conditions = weatherData.currentConditions;

  celcius.currentTemp(conditions);
  celcius.feelsLike(conditions);
  celcius.highLow(weatherData);
  celcius.dewPoint(conditions);
}

const locationTitle = document.querySelector('.location');

function checkCurrentlyCelcius() {
  addCurrentlyConversionAnimation();
  const celciusAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?unitGroup=metric&key=${visualCrossing}`;

  fetch(celciusAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      applyCelcius(weatherData);
      removeCurrentlyConversionAnimation();
    });
}

export { checkCurrentlyCelcius };
