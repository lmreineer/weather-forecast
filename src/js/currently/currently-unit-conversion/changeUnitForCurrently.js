/* eslint-disable import/extensions */

import {
  addCurrentlyConversionAnimation,
  removeCurrentlyConversionAnimation,
} from './currentlyConversionAnimation.js';

import { VCNG } from '../../lasLlaves.js';
import { currentTemp } from '../currentlyDetails.js';
import { applyUnitForCurrently } from './currentlyUnitConversion.js';

let currentTempClicked = false;

function changeCurrentlyUnit() {
  // add preload animation
  addCurrentlyConversionAnimation();

  const locationTitle = document.querySelector('.location');

  let currentlyUnitAPI;

  if (!currentTempClicked) {
    // fahrenheit
    currentlyUnitAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?&key=${VCNG}`;

    fetch(currentlyUnitAPI)
      .then((response) => response.json())
      .then((weatherData) => {
        applyUnitForCurrently(weatherData, 'F', 'C');

        removeCurrentlyConversionAnimation();
      });

    currentTempClicked = true;
  } else {
    // celcius
    currentlyUnitAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?unitGroup=metric&key=${VCNG}`;

    fetch(currentlyUnitAPI)
      .then((response) => response.json())
      .then((weatherData) => {
        applyUnitForCurrently(weatherData, 'C', 'F');

        removeCurrentlyConversionAnimation();
      });

    currentTempClicked = false;
  }
}

currentTemp.addEventListener('click', () => {
  changeCurrentlyUnit();
});
