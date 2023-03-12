/* eslint-disable import/extensions */

import {
  checkErrorsForHourly,
  hourlyWeatherChecker,
} from './api/hourlyWeatherChecker.js';

import { checkErrorsForDaily } from './api/dailyWeatherChecker.js';
import {
  addHourlyDailyAnimation,
  removeHourlyDailyAnimation,
} from '../hourlyDailyAnimation.js';

const search = document.querySelector('.search');

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
  const errorMessage = document.querySelector('.error');

  if (!hourlyButtonClicked) {
    hourlyButtonClicked = true;

    // if error is visible
    if (errorMessage.style.visibility === 'visible') {
      // stop operations
      removeHourlyDailyAnimation();

      // else, set initial location on button click for hourly
    } else {
      // add preload animation
      addHourlyDailyAnimation();
      hourlyWeatherChecker.setInitialLocationOnTabClick();
    }
  }
});

dailyButton.addEventListener('click', () => {
  const locationTitle = document.querySelector('.location');

  // set initial location on button click for daily
  search.value = locationTitle.innerText;

  if (hourlyButtonClicked) {
    hourlyButtonClicked = false;

    checkTabClicks();
  }
});
