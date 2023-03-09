/* eslint-disable import/extensions */

import { addHourlyDailyAnimation } from './hourlyDailyAnimation.js';
import { checkErrorsForHourly } from './execution/api/hourlyWeatherChecker.js';

function useArrows() {
  // add preload animation
  addHourlyDailyAnimation();

  const search = document.querySelector('.search');
  const locationTitle = document.querySelector('.location');

  search.value = locationTitle.innerText;

  checkErrorsForHourly();
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
