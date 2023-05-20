/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import {
  addCurrentlyAnimation,
  removeCurrentlyAnimation,
} from '../currentlyAnimation.js';

import {
  GPFY,
  VCNG,
} from '../../lasLlaves.js';

import { applyLocationOnMap } from '../../location/locationTitle.js';
import { applyCurrentlyDetails } from '../currentlyDetails.js';

const errorMessage = document.querySelector('.error');

function showWeatherError() {
  errorMessage.style.visibility = 'visible';
  errorMessage.innerText = 'Weather information is unavailable on location.';
  removeCurrentlyAnimation();
}

function checkCurrentWeather() {
  const locationTitle = document.querySelector('.location');

  const currentWeatherAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?unitGroup=metric&key=${VCNG}`;

  fetch(currentWeatherAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      applyCurrentlyDetails(weatherData);

      removeCurrentlyAnimation();
    })
    .catch(() => showWeatherError());
}

const search = document.querySelector('.search');

function showLocationError() {
  errorMessage.style.visibility = 'visible';
  errorMessage.innerText = 'No locations found.';
  removeCurrentlyAnimation();
}

function geocodeLocationForCurrently() {
  const geocodeAPI = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(search.value)}&apiKey=${GPFY}`;

  fetch(geocodeAPI)
    .then((response) => response.json())
    .then((locData) => {
      applyLocationOnMap(locData);

      checkCurrentWeather();
    })
    .catch(() => showLocationError());
}

function checkError() {
  errorMessage.style.visibility = 'hidden';

  // add preload animation
  addCurrentlyAnimation();

  // if search value is entered empty
  if (search.value === '') {
    showLocationError();

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

export { checkCurrentWeather };
