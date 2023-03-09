/* eslint-disable import/extensions */

import {
  addHourlyDailyConversionAnimation,
  removeHourlyDailyConversionAnimation,
} from './hourlyDailyConversionAnimation.js';

import { visualCrossing } from '../../apiKeys.js';
import { applyUnitForHourlyDaily } from './hourlyDailyUnitConversion.js';

let clicked = false;

function changeHourlyDailyUnit() {
  // add preload animation
  addHourlyDailyConversionAnimation();

  const locationTitle = document.querySelector('.location');

  let hourlyDailyUnitAPI;

  if (!clicked) {
    // fahrenheit
    hourlyDailyUnitAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?&key=${visualCrossing}`;

    fetch(hourlyDailyUnitAPI)
      .then((response) => response.json())
      .then((weatherData) => {
        applyUnitForHourlyDaily(weatherData, 'F');

        removeHourlyDailyConversionAnimation();
      });

    clicked = true;
  } else {
    // celcius
    hourlyDailyUnitAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?unitGroup=metric&key=${visualCrossing}`;

    fetch(hourlyDailyUnitAPI)
      .then((response) => response.json())
      .then((weatherData) => {
        applyUnitForHourlyDaily(weatherData, 'C');

        removeHourlyDailyConversionAnimation();
      });

    clicked = false;
  }
}

const currentTemp = document.querySelector('.temp');

currentTemp.addEventListener('click', () => {
  changeHourlyDailyUnit();
});
