/* eslint-disable import/extensions */

import {
  addHourlyDailyConversionAnimation,
  removeHourlyDailyConversionAnimation,
} from './hourlyDailyConversionAnimation.js';

import { visualCrossing } from '../../apiKeys.js';
import { applyUnitForDaily } from './dailyUnitConversion.js';
import { applyUnitForHourly } from './hourlyUnitConversion.js';

let hourlyTabClicked = false;
let currentTempClicked = false;

function changeHourlyDailyUnit() {
  // add preload animation
  addHourlyDailyConversionAnimation();

  const locationTitle = document.querySelector('.location');

  let hourlyDailyUnitAPI;

  if (!currentTempClicked) {
    // fahrenheit
    hourlyDailyUnitAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?&key=${visualCrossing}`;

    fetch(hourlyDailyUnitAPI)
      .then((response) => response.json())
      .then((weatherData) => {
        applyUnitForDaily(weatherData, 'F');
        applyUnitForHourly();

        removeHourlyDailyConversionAnimation();
      });

    currentTempClicked = true;
  } else {
    // celcius
    hourlyDailyUnitAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?unitGroup=metric&key=${visualCrossing}`;

    fetch(hourlyDailyUnitAPI)
      .then((response) => response.json())
      .then((weatherData) => {
        applyUnitForDaily(weatherData, 'C');

        removeHourlyDailyConversionAnimation();
      });

    currentTempClicked = false;
  }
}

const hourlyButton = document.querySelector('.hourly-button');
const dailyButton = document.querySelector('.daily-button');

hourlyButton.addEventListener('click', () => {
  if (!hourlyTabClicked) {
    hourlyTabClicked = true;
  }
});

dailyButton.addEventListener('click', () => {
  if (hourlyTabClicked) {
    hourlyTabClicked = false;
  }
});

const currentTemp = document.querySelector('.temp');

currentTemp.addEventListener('click', () => {
  changeHourlyDailyUnit();
});
