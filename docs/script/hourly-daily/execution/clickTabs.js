/* eslint-disable import/extensions */

import { geocodeLocationForHourly } from './api/hourlyWeatherChecker.js';
import { geocodeLocationForDaily } from './api/dailyWeatherChecker.js';
import { addHourlyDailyAnimation } from '../hourlyDailyAnimation.js';

let clicked = false;

function checkTabClicks() {
  // add preload animation
  addHourlyDailyAnimation();

  if (!clicked) {
    geocodeLocationForDaily();
  } else if (clicked) {
    geocodeLocationForHourly();
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
  search.value = locationTitle.innerText;

  if (!clicked) {
    clicked = true;
    checkTabClicks();
    search.value = '';
  }
});

dailyButton.addEventListener('click', () => {
  search.value = locationTitle.innerText;

  if (clicked) {
    clicked = false;
    checkTabClicks();
    search.value = '';
  }
});
