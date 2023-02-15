/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-console */

import {
  addClass,
  removeClass,
  removeText,
} from './animations.js';

import {
  geoapify,
  visualCrossing,
  ipgeolocation,
} from '../../apiKeys.js';

import {
  applyHourly,
} from './hourly.js';

import {
  applyDaily,
} from '../daily.js';

// toggle switches
let clicked = false;

// check current weather
function checkWeather(lat, lon) {
  const weatherAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&key=${visualCrossing}`;

  fetch(weatherAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      if (!clicked) {
        // initially use current hour API to see current hour and pick hours that is greater than it
        const hourAPI = `https://api.ipgeolocation.io/astronomy?apiKey=${ipgeolocation}&lat=${lat}&long=${lon}`;

        fetch(hourAPI)
          .then((response) => response.json())
          .then((hourData) => {
            // initially execute to apply hours that has not been passed yet by current hour
            applyHourly(weatherData, hourData);
          })
          .catch((error) => console.error(error));
      } else if (clicked) {
        applyDaily(weatherData);
      }

      // remove preload animation when weather details are applied
      removeClass();
    })
    .catch((error) => console.error(error));
}

const search = document.querySelector('.search');
const errorMessage = document.querySelector('.error');

// find latitude and longitude of location name based on input
function geocodeLocation() {
  // add preload animation and remove existing text from HTML
  addClass();
  removeText();

  const geocodeAPI = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(search.value)}&apiKey=${geoapify}`;

  fetch(geocodeAPI)
    .then((response) => response.json())
    .then((locData) => {
      // show error if location name is not found
      if (locData.features[0] === undefined || locData.query.parsed === undefined) {
        errorMessage.style.visibility = 'visible';
        removeClass();
      } else {
        // assign latitude and longitude and use to execute time
        const lat = locData.features[0].geometry.coordinates[1];
        const lon = locData.features[0].geometry.coordinates[0];

        checkWeather(lat, lon);
      }
    })
    .catch((error) => console.error(error));
}

const hourlyButton = document.querySelector('.hourly-button');
const locationTitle = document.querySelector('.location');

hourlyButton.addEventListener('click', () => {
  if (!clicked) {
    search.value = locationTitle.innerText;
    geocodeLocation();
    search.value = '';
    clicked = true;
  }
});

const dailyButton = document.querySelector('.daily-button');

dailyButton.addEventListener('click', () => {
  if (clicked) {
    search.value = locationTitle.innerText;
    geocodeLocation();
    search.value = '';
  }
});
