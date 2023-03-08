/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import {
  addCurrentlyAnimation,
  removeCurrentlyAnimation,
} from '../currentlyAnimation.js';

import {
  geoapify,
  visualCrossing,
} from '../../apiKeys.js';

import { applyLocation } from '../../location/locationTitle.js';
import { applyCurrentlyDetails } from '../currentlyDetails.js';

function checkCurrentWeather(lat, lon) {
  const currentWeatherAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&key=${visualCrossing}`;

  fetch(currentWeatherAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      applyCurrentlyDetails(weatherData);

      removeCurrentlyAnimation();
    });
}

const errorMessage = document.querySelector('.error');

function showError() {
  errorMessage.style.visibility = 'visible';
  removeCurrentlyAnimation();
}

const search = document.querySelector('.search');

// find lat and lon of location input
function geocodeLocationForCurrently() {
  const geocodeAPI = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(search.value)}&apiKey=${geoapify}`;

  fetch(geocodeAPI)
    .then((response) => response.json())
    .then((locData) => {
      // if no locations are found
      if (locData.features[0] === undefined || locData.query.parsed === undefined) {
        showError();

        // else, show weather
      } else {
        errorMessage.style.visibility = 'hidden';

        const lat = locData.features[0].geometry.coordinates[1];
        const lon = locData.features[0].geometry.coordinates[0];
        // apply location on map
        applyLocation(locData);

        // get weather data
        checkCurrentWeather(lat, lon);
      }
    });
}

function checkError() {
  // add preload animation
  addCurrentlyAnimation();

  // if search value is entered empty, show error
  if (search.value === '') {
    showError();

    // else, continue operations
  } else {
    geocodeLocationForCurrently();
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

export { geocodeLocationForCurrently };
