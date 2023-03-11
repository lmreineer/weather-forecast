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

let hourlyTabClicked = false;
let currentTempClicked = false;

function changeHourlyDailyUnit() {
  // add preload animation
  addHourlyDailyConversionAnimation();

  if (!currentTempClicked) {
    // fahrenheit
    if (hourlyTabClicked) {
      checkHourlyFahrenheit();
    } else {
      checkDailyFahrenheit();
    }

    currentTempClicked = true;
  } else {
    // celcius
    if (hourlyTabClicked) {
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
