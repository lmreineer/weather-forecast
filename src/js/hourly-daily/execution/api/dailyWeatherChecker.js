/* eslint-disable import/extensions */

import { VCNG } from '../../../lasLlaves.js';
import { applyDailyDetails } from '../../dailyDetails.js';
import { removeHourlyDailyAnimation } from '../../hourlyDailyAnimation.js';

function checkDailyWeather() {
  const search = document.querySelector('.search');

  const dailyWeatherAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search.value}?unitGroup=metric&key=${VCNG}`;

  fetch(dailyWeatherAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      applyDailyDetails(weatherData);

      removeHourlyDailyAnimation();
    })
    .catch(() => removeHourlyDailyAnimation());
}

function checkErrorsForDaily() {
  const errorMessage = document.querySelector('.error');

  // if error is visible
  if (errorMessage.style.visibility === 'visible') {
    // stop operations
    removeHourlyDailyAnimation();

    // else, show weather
  } else {
    checkDailyWeather();

    // remove search value in case of tab clicks
    const search = document.querySelector('.search');
    search.value = '';
  }
}

export {
  checkErrorsForDaily,
  checkDailyWeather,
};
