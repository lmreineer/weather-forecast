/* eslint-disable import/extensions */

import { addAnimation } from './animation.js';
import { initHourly } from './execution/apiFunctions/clickHourly.js';

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
