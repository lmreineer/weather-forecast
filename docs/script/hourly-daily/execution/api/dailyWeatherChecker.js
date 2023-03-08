/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import {
  geoapify,
  visualCrossing,
} from '../../../apiKeys.js';

import { applyDailyDetails } from '../../dailyDetails.js';
import { removeHourlyDailyAnimation } from '../../hourlyDailyAnimation.js';

function checkDailyWeather(lat, lon) {
  const dailyWeatherAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&key=${visualCrossing}`;

  fetch(dailyWeatherAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      applyDailyDetails(weatherData);

      removeHourlyDailyAnimation();
    });
}

// find lat and lon of location input
function geocodeLocationForDaily() {
  const search = document.querySelector('.search');
  const errorMessage = document.querySelector('.error');

  const geocodeAPI = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(search.value)}&apiKey=${geoapify}`;

  fetch(geocodeAPI)
    .then((response) => response.json())
    .then((locData) => {
      // if error is visible
      if (errorMessage.style.visibility === 'visible') {
        // stop operations
        removeHourlyDailyAnimation();

        // else, show weather
      } else {
        const lat = locData.features[0].geometry.coordinates[1];
        const lon = locData.features[0].geometry.coordinates[0];
        checkDailyWeather(lat, lon);
      }
    });
}

export {
  geocodeLocationForDaily,
};
