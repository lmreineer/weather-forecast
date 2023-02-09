/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import {
  ipgeolocation,
} from './apiKeys.js';

const currentTime = document.querySelector('.current-time');
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');

function applySunTimes(time) {
  currentTime.innerText = `Current time: ${time.current_time.slice(0, 5)}`;
  sunrise.innerText = `Sunrise: ${time.sunrise}`;
  sunset.innerText = `Sunrise: ${time.sunset}`;
}

const timeCollection = (function checkTime() {
  return {
    applyTime(lat, lon) {
      const timeAPI = `https://api.ipgeolocation.io/astronomy?apiKey=${ipgeolocation}&lat=${lat}&long=${lon}`;

      fetch(timeAPI)
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
