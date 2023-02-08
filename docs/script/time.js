/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import {
  ipgeolocation,
} from './apiKeys.js';

const currentTime = document.querySelector('.current-time');
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');

function applyTime(time) {
  // slice the seconds from the default time format and apply it to DOM
  const current = `${time.time_12.slice(0, 5)} ${time.time_12.slice(8, 11)}`;
  currentTime.innerText = `Current time: ${current}`;
}

function applySunTimes(time) {
  // slice the seconds from the default time format and apply it to DOM
  const sunriseTime = `${time.results.sunrise.slice(0, 4)} ${time.results.sunrise.slice(8, 10)}`;
  const sunsetTime = `${time.results.sunset.slice(0, 4)} ${time.results.sunset.slice(8, 10)}`;
  sunrise.innerText = `Sunrise: ${sunriseTime}`;
  sunset.innerText = `Sunset: ${sunsetTime}`;
}

const timeCollection = (function checkTime() {
  return {
    current(lat, lon) {
      const ipgeolocationAPI = `https://api.ipgeolocation.io/timezone?apiKey=${ipgeolocation}&lat=${lat}&long=${lon}`;

      fetch(ipgeolocationAPI)
        .then((response) => response.json())
        .then((time) => applyTime(time))
      // eslint-disable-next-line no-console
        .catch((error) => console.error(error));
    },

    sunriseSunset(lat, lon) {
      const sunriseSunsetAPI = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}`;

      fetch(sunriseSunsetAPI)
        .then((response) => response.json())
        .then((time) => applySunTimes(time))
      // eslint-disable-next-line no-console
        .catch((error) => console.error(error));
    },
  };
}());

export {
  timeCollection,
  currentTime,
  sunrise,
  sunset,
};
