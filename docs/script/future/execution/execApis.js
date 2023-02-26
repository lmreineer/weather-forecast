/* eslint-disable import/extensions */

import { initHourly } from './apiFunctions/clickHourly.js';
import { initDaily } from './apiFunctions/clickDaily.js';
import { addAnimation } from '../animation.js';

// toggle switches
let clicked = false;

function checkTabClicks() {
  // add preload animation and remove text
  addAnimation();

  if (!clicked) {
    initDaily();
  } else if (clicked) {
    initHourly();
  }
}

const search = document.querySelector('.search');
const loupe = document.querySelector('.fa-magnifying-glass');

search.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    checkTabClicks();
  }
});

loupe.addEventListener('click', () => {
  if (search.value !== '') {
    checkTabClicks();
  }
});

const locationTitle = document.querySelector('.location');
const hourlyButton = document.querySelector('.hourly-button');
const dailyButton = document.querySelector('.daily-button');

hourlyButton.addEventListener('click', () => {
  // search weather based on location title text
  search.value = locationTitle.innerText;
  if (!clicked) {
    clicked = true;
    checkTabClicks();
  }
  search.value = '';
});

dailyButton.addEventListener('click', () => {
  // search weather based on location title text
  search.value = locationTitle.innerText;
  if (clicked) {
    clicked = false;
    checkTabClicks();
  }
  search.value = '';
});
