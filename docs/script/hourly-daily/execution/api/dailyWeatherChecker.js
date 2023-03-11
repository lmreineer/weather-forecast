/* eslint-disable import/extensions */

import { vcng } from '../../../lesClés.js';
import { applyDailyDetails } from '../../dailyDetails.js';
import { removeHourlyDailyAnimation } from '../../hourlyDailyAnimation.js';

function checkDailyWeather() {
  const search = document.querySelector('.search');

  const dailyWeatherAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search.value}?unitGroup=metric&key=${vcng}`;

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
