/* eslint-disable import/extensions */

import { visualCrossing } from '../../apiKeys.js';

const locationTitle = document.querySelector('.location');

function checkCurrently() {
  const fahrenheitAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?key=${visualCrossing}`;

  fetch(fahrenheitAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      console.log(weatherData);
    });
}

const currentTemp = document.querySelector('.temp');

currentTemp.addEventListener('click', () => {
  checkCurrently();
});
