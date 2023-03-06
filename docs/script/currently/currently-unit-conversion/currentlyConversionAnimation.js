/* eslint-disable import/extensions */

import {
  currentTemp,
} from '../currentlyDetails.js';

// remove animations?

function addCurrentlyConversionAnimation() {
  // add animations
  currentTemp.classList.add('dot-flashing');

  // remove texts
  currentTemp.innerText = '';
}

function removeCurrentlyConversionAnimation() {
  currentTemp.classList.remove('dot-flashing');
}

export {
  addCurrentlyConversionAnimation,
  removeCurrentlyConversionAnimation,
};
