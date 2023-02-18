/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable no-console */

import {
  geoapify,
  visualCrossing,
} from '../../../apiKeys.js';

import {
  applyDaily,
} from '../../daily.js';

import {
  removeAnimation,
} from '../../animations.js';

// check current weather
function checkWeather(lat, lon) {
  const weatherAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&key=${visualCrossing}`;

  fetch(weatherAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      applyDaily(weatherData);

      // remove animation after applying details
      removeAnimation();
    })
    .catch((error) => console.error(error));
}

const search = document.querySelector('.search');

// initialize daily
function initDaily() {
  const geocodeAPI = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(search.value)}&apiKey=${geoapify}`;

  fetch(geocodeAPI)
    .then((response) => response.json())
    .then((locData) => {
      // assign latitude and longitude and use to execute time
      const lat = locData.features[0].geometry.coordinates[1];
      const lon = locData.features[0].geometry.coordinates[0];

      checkWeather(lat, lon);
    })
    .catch((error) => console.error(error));
}

export {
  initDaily,
};
