/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import {
  visualCrossing,
} from '../../../apiKeys.js';

import { applyDailyDetails } from '../../dailyDetails.js';
import { removeHourlyDailyAnimation } from '../../hourlyDailyAnimation.js';

function checkDailyWeather() {
  const locationTitle = document.querySelector('.location');

  const dailyWeatherAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?unitGroup=metric&key=${visualCrossing}`;

  fetch(dailyWeatherAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      applyDailyDetails(weatherData);

      removeHourlyDailyAnimation();
    });
}

function checkErrorsForDaily() {
  setTimeout(() => {
    const errorMessage = document.querySelector('.error');

    // if error is visible
    if (errorMessage.style.visibility === 'visible') {
      // stop operations
      removeHourlyDailyAnimation();

      // else, show weather
    } else {
      checkDailyWeather();
    }
  }, 1000);
}

export {
  checkErrorsForDaily,
  checkDailyWeather,
};
