/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import {
  addAnimation,
  removeAnimation,
} from './animation.js';

import {
  geoapify,
  visualCrossing,
} from '../apiKeys.js';

import { applyLocation } from '../location/locationTitle.js';
import { applyCurrently } from './currentWeather.js';

// check current weather
function checkCurrently(lat, lon) {
  const weatherAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&key=${visualCrossing}`;

  fetch(weatherAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      applyCurrently(weatherData);
      // remove animation after applying infos
      removeAnimation();
    });
}

const errorMessage = document.querySelector('.error');

// function to show error message
function showError() {
  // show error message
  errorMessage.style.visibility = 'visible';
  removeAnimation();
}

const search = document.querySelector('.search');

function geocodeLocation() {
  const geocodeAPI = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(search.value)}&apiKey=${geoapify}`;

  fetch(geocodeAPI)
    .then((response) => response.json())
    .then((locData) => {
      // if no locations are found
      if (locData.features[0] === undefined || locData.query.parsed === undefined) {
        // show error message
        showError();

        // else, show weather
      } else {
        // remove any error message
        errorMessage.style.visibility = 'hidden';

        const lat = locData.features[0].geometry.coordinates[1];
        const lon = locData.features[0].geometry.coordinates[0];
        // execute to configure map location based on input
        applyLocation(locData);
        // execute to get weather data
        checkCurrently(lat, lon);
      }
    });
}

// function to check errors
function checkError() {
  // add preload animation and remove text
  addAnimation();

  // if search value is entered empty
  if (search.value === '') {
    showError();

    // else, continue operations
  } else {
    geocodeLocation();
  }
}

search.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    checkError();
  }
});

const loupe = document.querySelector('.fa-magnifying-glass');

loupe.addEventListener('click', () => {
  if (search.value !== '') {
    checkError();
  }
});

export { geocodeLocation };
