/* eslint-disable import/extensions */

import {
  currentTemp,
  description,
} from '../currentlyDetails.js';

function addCurrentlyConversionAnimation() {
  // add animations
  currentTemp.classList.add('lds-ring');
  // avoid description moving when animating
  description.style.marginTop = '-0.45rem';

  // remove texts
  currentTemp.innerText = '';
}

function removeCurrentlyConversionAnimation() {
  currentTemp.classList.remove('lds-ring');
  // return back to original state
  description.style.marginTop = '0';
}

export {
  addCurrentlyConversionAnimation,
  removeCurrentlyConversionAnimation,
};
