/* eslint-disable import/extensions */

import {
  addCurrentlyConversionAnimation,
  removeCurrentlyConversionAnimation,
} from './currentlyConversionAnimation.js';

import { visualCrossing } from '../../apiKeys.js';
import { currentTemp } from '../currentlyDetails.js';
import { applyUnitForCurrently } from './currentlyUnitConversion.js';

let clicked = false;

function changeCurrentlyUnit() {
  // add preload animation
  addCurrentlyConversionAnimation();

  const locationTitle = document.querySelector('.location');

  let currentlyUnitAPI;

  if (!clicked) {
    // fahrenheit
    currentlyUnitAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?&key=${visualCrossing}`;

    fetch(currentlyUnitAPI)
      .then((response) => response.json())
      .then((weatherData) => {
        applyUnitForCurrently(weatherData, 'F', 'C');

        removeCurrentlyConversionAnimation();
      });

    clicked = true;
  } else {
    // celcius
    currentlyUnitAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?unitGroup=metric&key=${visualCrossing}`;

    fetch(currentlyUnitAPI)
      .then((response) => response.json())
      .then((weatherData) => {
        applyUnitForCurrently(weatherData, 'C', 'F');

        removeCurrentlyConversionAnimation();
      });

    clicked = false;
  }
}

currentTemp.addEventListener('click', () => {
  changeCurrentlyUnit();
});
