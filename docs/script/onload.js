/* eslint-disable import/extensions */

import { geocodeLocation } from './currently/apiFunctions.js';
import { initDaily } from './future/execution/apiFunctions/clickDaily.js';
import { addAnimation as futureAnimation } from './future/animation.js';
import { addAnimation as currentAnimation } from './currently/animation.js';

const search = document.querySelector('.search');
const locationTitle = document.querySelector('.location');

window.addEventListener('load', () => {
  // search weather based on location title text
  search.value = locationTitle.innerText;
  // add animation and initialize for current weather
  currentAnimation();
  geocodeLocation();

  // add animation and initialize for daily forecast
  futureAnimation();
  initDaily();
  search.value = '';
});
