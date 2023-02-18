/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import {
  initHourly,
} from './apiFunctions/clickHourly.js';

import {
  initDaily,
} from './apiFunctions/clickDaily.js';

import {
  addAnimation,
} from '../animations.js';

// toggle switches
let clicked = false;

const search = document.querySelector('.search');
const loupe = document.querySelector('.fa-magnifying-glass');

function checkClicks() {
  if (!clicked) {
    // add preload animation and remove existing text from HTML
    addAnimation();

    initDaily();
  } else if (clicked) {
    // add preload animation and remove existing text from HTML
    addAnimation();

    initHourly();
  }
}

search.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    checkClicks();
  }
});

loupe.addEventListener('click', () => {
  if (search.value !== '') {
    checkClicks();
  }
});

const hourlyButton = document.querySelector('.hourly-button');
const dailyButton = document.querySelector('.daily-button');

hourlyButton.addEventListener('click', () => {
  if (!clicked) {
    // add preload animation and remove existing text from HTML
    addAnimation();

    initHourly();
    clicked = true;
  }
});

dailyButton.addEventListener('click', () => {
  if (clicked) {
    // add preload animation and remove existing text from HTML
    addAnimation();

    initDaily();
    clicked = false;
  }
});
