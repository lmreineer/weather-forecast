/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import {
  initHourly,
} from './apiFunctions/hourlyApi.js';

import {
  initDaily,
} from './apiFunctions/dailyApi.js';

import {
  addAnimation,
} from './animations.js';

// toggle switches
let clicked = false;

const search = document.querySelector('.search');

// reload timeUnit element to check if there is newly added group
search.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addAnimation();
  }
});

const loupe = document.querySelector('.fa-magnifying-glass');

// reload timeUnit element to check if there is newly added group
loupe.addEventListener('click', () => {
  if (search.value !== '') {
    addAnimation();
  }
});

const hourlyButton = document.querySelector('.hourly-button');
const locationTitle = document.querySelector('.location');

hourlyButton.addEventListener('click', () => {
  if (!clicked) {
    // add preload animation and remove existing text from HTML
    addAnimation();

    search.value = locationTitle.innerText;
    initHourly();
    search.value = '';
    clicked = true;
  }
});

const dailyButton = document.querySelector('.daily-button');

dailyButton.addEventListener('click', () => {
  if (clicked) {
    // add preload animation and remove existing text from HTML
    addAnimation();

    search.value = locationTitle.innerText;
    initDaily();
    search.value = '';
    clicked = false;
  }
});

export {
  clicked,
};
