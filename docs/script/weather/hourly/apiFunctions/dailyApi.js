/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-console */

import {
  addClass,
  removeText,
} from '../animations.js';

import {
  geoapify,
  visualCrossing,
} from '../../../apiKeys.js';

import {
  applyDaily,
} from '../../daily.js';

// check current weather
function checkWeather(lat, lon) {
  const weatherAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&key=${visualCrossing}`;

  fetch(weatherAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      applyDaily(weatherData);
    })
    .catch((error) => console.error(error));
}

const search = document.querySelector('.search');

// initialize daily
function initDaily() {
  // add preload animation and remove existing text from HTML
  addClass();
  removeText();

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
