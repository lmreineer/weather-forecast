/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import {
  visualCrossing,
  ipgeolocation,
} from '../../../apiKeys.js';

import { applyHourlyDetails } from '../../hourlyDetails.js';
import { removeHourlyDailyAnimation } from '../../hourlyDailyAnimation.js';

function checkHourlyWeather() {
  const locationTitle = document.querySelector('.location');

  const hourlyWeatherAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?unitGroup=metric&key=${visualCrossing}`;

  fetch(hourlyWeatherAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      const currentHourAPI = `https://api.ipgeolocation.io/astronomy?apiKey=${ipgeolocation}&location=${locationTitle.innerText}`;

      fetch(currentHourAPI)
        .then((response) => response.json())
        .then((hourData) => {
          applyHourlyDetails(weatherData, hourData);

          removeHourlyDailyAnimation();
        });
    });
}

function checkErrorsForHourly() {
  setTimeout(() => {
    const errorMessage = document.querySelector('.error');

    // if error is visible
    if (errorMessage.style.visibility === 'visible') {
      // stop operations
      removeHourlyDailyAnimation();

      // else, show weather
    } else {
      checkHourlyWeather();
    }
  }, 1000);
}

// const currentTemp = document.querySelector('.temp');

// let clicked = false;

// currentTemp.addEventListener('click', () => {
//   if (!clicked) {
//     checkFahrenheit();
//     clicked = true;
//   } else {
//     checkCurrentlyCelcius();
//     clicked = false;
//   }
// });

export {
  checkErrorsForHourly,
};
