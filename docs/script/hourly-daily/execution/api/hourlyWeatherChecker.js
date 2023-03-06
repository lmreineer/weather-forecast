/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import {
  geoapify,
  visualCrossing,
  ipgeolocation,
} from '../../../apiKeys.js';

import { applyHourly } from '../../hourlyForecast.js';
import { removeHourlyDailyAnimation } from '../../hourlyDailyAnimation.js';

function checkWeather(lat, lon) {
  const weatherAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&key=${visualCrossing}`;

  fetch(weatherAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      // get current hour
      const hourAPI = `https://api.ipgeolocation.io/astronomy?apiKey=${ipgeolocation}&lat=${lat}&long=${lon}`;

      fetch(hourAPI)
        .then((response) => response.json())
        .then((hourData) => {
          applyHourly(weatherData, hourData);
          // remove animation after applying infos
          removeHourlyDailyAnimation();
        });
    });
}

const errorMessage = document.querySelector('.error');
const search = document.querySelector('.search');

function initializeHourly() {
  const geocodeAPI = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(search.value)}&apiKey=${geoapify}`;

  fetch(geocodeAPI)
    .then((response) => response.json())
    .then((locData) => {
      // if error is visible, stop operations
      if (errorMessage.style.visibility === 'visible') {
        removeHourlyDailyAnimation();

        // else, show weather
      } else {
        const lat = locData.features[0].geometry.coordinates[1];
        const lon = locData.features[0].geometry.coordinates[0];
        checkWeather(lat, lon);
      }
    });
}

export {
  initializeHourly,
};
