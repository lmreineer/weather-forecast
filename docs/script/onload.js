/* eslint-disable import/extensions */

import { geocodeLocation } from './currently/api.js';
import { initDaily } from './future/execution/api/execDaily.js';
import { addAnimation as futureAnimation } from './future/hourlyDailyAnimation.js';
import { addAnimation as currentAnimation } from './currently/currentlyAnimation.js';

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
