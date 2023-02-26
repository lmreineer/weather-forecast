/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import {
  geoapify,
  visualCrossing,
} from '../../../apiKeys.js';

import { applyDaily } from '../../daily.js';
import { removeAnimation } from '../../animation.js';

function checkWeather(lat, lon) {
  const weatherAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&key=${visualCrossing}`;

  fetch(weatherAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      applyDaily(weatherData);
      // remove animation after applying infos
      removeAnimation();
    });
}

const search = document.querySelector('.search');
const errorMessage = document.querySelector('.error');

// initialize daily
function initDaily() {
  const geocodeAPI = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(search.value)}&apiKey=${geoapify}`;

  fetch(geocodeAPI)
    .then((response) => response.json())
    .then((locData) => {
      // if error is visible, stop operations
      if (errorMessage.style.visibility === 'visible') {
        removeAnimation();

        // else, show weather
      } else {
        const lat = locData.features[0].geometry.coordinates[1];
        const lon = locData.features[0].geometry.coordinates[0];
        checkWeather(lat, lon);
      }
    });
}

export {
  initDaily,
};
