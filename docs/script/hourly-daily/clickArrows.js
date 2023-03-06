/* eslint-disable import/extensions */

import { addHourlyDailyAnimation } from './hourlyDailyAnimation.js';
import { initializeHourly } from './execution/api/hourlyWeatherChecker.js';

const search = document.querySelector('.search');
const locationTitle = document.querySelector('.location');

function useArrows() {
  // add preload animation and remove text
  addHourlyDailyAnimation();

  // search weather based on location title text
  search.value = locationTitle.innerText;
  initializeHourly();
  search.value = '';
}

const rightArrow = document.querySelector('.right-arrow');
const leftArrow = document.querySelector('.left-arrow');

rightArrow.addEventListener('click', () => {
  useArrows();
});

leftArrow.addEventListener('click', () => {
  useArrows();
});
