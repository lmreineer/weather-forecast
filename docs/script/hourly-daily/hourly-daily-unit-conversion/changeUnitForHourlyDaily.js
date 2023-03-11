/* eslint-disable import/extensions */

import { addHourlyDailyConversionAnimation } from './hourlyDailyConversionAnimation.js';

import {
  checkDailyFahrenheit,
  checkDailyCelcius,
} from './dailyUnitConversion.js';

import {
  checkHourlyFahrenheit,
  checkHourlyCelcius,
} from './hourlyUnitConversion.js';

let hourlyButtonClicked = false;
let currentTempClicked = false;

function changeHourlyDailyUnit() {
  // add preload animation
  addHourlyDailyConversionAnimation();

  if (!currentTempClicked) {
    // fahrenheit
    if (hourlyButtonClicked) {
      checkHourlyFahrenheit();
    } else {
      checkDailyFahrenheit();
    }

    currentTempClicked = true;
  } else {
    // celcius
    if (hourlyButtonClicked) {
      checkHourlyCelcius();
    } else {
      checkDailyCelcius();
    }

    currentTempClicked = false;
  }
}

const hourlyButton = document.querySelector('.hourly-button');
const dailyButton = document.querySelector('.daily-button');

hourlyButton.addEventListener('click', () => {
  if (!hourlyButtonClicked) {
    hourlyButtonClicked = true;
  }
});

dailyButton.addEventListener('click', () => {
  if (hourlyButtonClicked) {
    hourlyButtonClicked = false;
  }
});

const currentTemp = document.querySelector('.temp');

currentTemp.addEventListener('click', () => {
  changeHourlyDailyUnit();
});
