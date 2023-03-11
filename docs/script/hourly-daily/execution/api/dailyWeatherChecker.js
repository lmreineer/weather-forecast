/* eslint-disable import/extensions */

import { vcng } from '../../../lesClés.js';
import { applyDailyDetails } from '../../dailyDetails.js';
import { removeHourlyDailyAnimation } from '../../hourlyDailyAnimation.js';

function checkDailyWeather() {
  const locationTitle = document.querySelector('.location');

  const dailyWeatherAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?unitGroup=metric&key=${vcng}`;

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
