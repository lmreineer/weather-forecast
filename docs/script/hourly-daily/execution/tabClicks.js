/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import { checkErrorsForHourly } from './api/hourlyWeatherChecker.js';
import { checkErrorsForDaily } from './api/dailyWeatherChecker.js';
import { addHourlyDailyAnimation } from '../hourlyDailyAnimation.js';

let hourlyButtonClicked = false;

function checkTabClicks() {
  // add preload animation
  addHourlyDailyAnimation();

  if (!hourlyButtonClicked) {
    checkErrorsForDaily();
  } else if (hourlyButtonClicked) {
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
  if (!hourlyButtonClicked) {
    hourlyButtonClicked = true;
    checkTabClicks();
  }
});

dailyButton.addEventListener('click', () => {
  if (hourlyButtonClicked) {
    hourlyButtonClicked = false;
    checkTabClicks();
  }
});
