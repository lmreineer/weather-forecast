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
  addClass,
  removeText,
} from './animations.js';

// toggle switches
let clicked = false;

const search = document.querySelector('.search');
const hourlyButton = document.querySelector('.hourly-button');
const locationTitle = document.querySelector('.location');

hourlyButton.addEventListener('click', () => {
  if (!clicked) {
    // add preload animation and remove existing text from HTML
    addClass();
    removeText();

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
    addClass();
    removeText();

    search.value = locationTitle.innerText;
    initDaily();
    search.value = '';
    clicked = false;
  }
});

export {
  clicked,
};
