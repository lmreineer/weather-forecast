/* eslint-disable import/extensions */

import { checkErrorsForHourly } from './api/hourlyWeatherChecker.js';
import { checkErrorsForDaily } from './api/dailyWeatherChecker.js';
import { addHourlyDailyAnimation } from '../hourlyDailyAnimation.js';

let hourlyTabClicked = false;

function checkTabClicks() {
  // add preload animation
  addHourlyDailyAnimation();

  if (!hourlyTabClicked) {
    checkErrorsForDaily();
  } else if (hourlyTabClicked) {
    checkErrorsForHourly();
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

const hourlyButton = document.querySelector('.hourly-button');
const dailyButton = document.querySelector('.daily-button');

hourlyButton.addEventListener('click', () => {
  if (!hourlyTabClicked) {
    hourlyTabClicked = true;
    checkTabClicks();
  }
});

dailyButton.addEventListener('click', () => {
  if (hourlyTabClicked) {
    hourlyTabClicked = false;
    checkTabClicks();
  }
});
