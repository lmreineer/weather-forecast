/* eslint-disable import/extensions */

import {
  currentTemp,
  description,
  feelsLike,
  currentHighLow,
  dewPoint,
} from '../currentlyDetails.js';

function addCurrentlyConversionAnimation() {
  currentTemp.classList.add('currently-animation');
  feelsLike.classList.add('currently-animation');
  currentHighLow.classList.add('currently-animation');
  dewPoint.classList.add('currently-animation');

  currentTemp.innerText = '';
  feelsLike.innerText = '';
  currentHighLow.innerText = '';
  dewPoint.innerText = '';

  // avoid description element moving when animating
  description.style.marginTop = '0.25rem';
}

function removeCurrentlyConversionAnimation() {
  currentTemp.classList.remove('currently-animation');
  feelsLike.classList.remove('currently-animation');
  currentHighLow.classList.remove('currently-animation');
  dewPoint.classList.remove('currently-animation');

  // return back to original state
  description.style.marginTop = '0';
}

export {
  addCurrentlyConversionAnimation,
  removeCurrentlyConversionAnimation,
};
