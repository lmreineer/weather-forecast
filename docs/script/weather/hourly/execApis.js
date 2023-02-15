/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-console */

import {
  initHourly,
} from './apiFunctions/hourlyApi.js';

import {
  initDaily,
} from './apiFunctions/dailyApi.js';

// toggle switches
let clicked = false;

const search = document.querySelector('.search');
const hourlyButton = document.querySelector('.hourly-button');
const locationTitle = document.querySelector('.location');

hourlyButton.addEventListener('click', () => {
  if (!clicked) {
    search.value = locationTitle.innerText;
    initHourly();
    search.value = '';
    clicked = true;
  }
});

const dailyButton = document.querySelector('.daily-button');

dailyButton.addEventListener('click', () => {
  if (clicked) {
    search.value = locationTitle.innerText;
    initDaily();
    search.value = '';
    clicked = false;
  }
});
