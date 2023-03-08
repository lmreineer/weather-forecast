/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import {
  geoapify,
  visualCrossing,
  ipgeolocation,
} from '../../../apiKeys.js';

import { applyHourlyDetails } from '../../hourlyDetails.js';
import { removeHourlyDailyAnimation } from '../../hourlyDailyAnimation.js';

function checkHourlyWeather(lat, lon) {
  const hourlyWeatherAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&key=${visualCrossing}`;

  fetch(hourlyWeatherAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      const currentHourAPI = `https://api.ipgeolocation.io/astronomy?apiKey=${ipgeolocation}&lat=${lat}&long=${lon}`;

      fetch(currentHourAPI)
        .then((response) => response.json())
        .then((hourData) => {
          applyHourlyDetails(weatherData, hourData);

          removeHourlyDailyAnimation();
        });
    });
}

// find lat and lon of location input
function geocodeLocationForHourly() {
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
        checkHourlyWeather(lat, lon);
      }
    });
}

export {
  geocodeLocationForHourly,
};
