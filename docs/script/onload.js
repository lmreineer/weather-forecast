/* eslint-disable import/extensions */
// /* eslint-disable import/extensions */

import {
  search,
  geocodeLocation,
} from './currently/apiFunctions.js';

import { initDaily } from './future/execution/apiFunctions/clickDaily.js';

import { addAnimation } from './future/animations.js';

const locationTitle = document.querySelector('.location');

window.addEventListener('load', () => {
  search.value = locationTitle.innerText;
  geocodeLocation();

  // initialise daily forecast from below
  addAnimation();
  initDaily();

  search.value = '';
});
