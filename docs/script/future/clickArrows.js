/* eslint-disable import/extensions */

import { addAnimation } from './hourlyDailyAnimation.js';
import { initHourly } from './execution/api/execHourly.js';

const search = document.querySelector('.search');
const locationTitle = document.querySelector('.location');

function useArrows() {
  // add preload animation and remove text
  addAnimation();

  // search weather based on location title text
  search.value = locationTitle.innerText;
  initHourly();
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
