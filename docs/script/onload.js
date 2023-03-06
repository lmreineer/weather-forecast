/* eslint-disable import/extensions */

import { geocodeLocation } from './currently/api/currentWeatherChecker.js';
import { initializeDaily } from './hourly-daily/execution/api/dailyWeatherChecker.js';
import { addHourlyDailyAnimation } from './hourly-daily/hourlyDailyAnimation.js';
import { addCurrentlyAnimation } from './currently/currentlyAnimation.js';

const search = document.querySelector('.search');
const locationTitle = document.querySelector('.location');

window.addEventListener('load', () => {
  // search weather based on location title text
  search.value = locationTitle.innerText;
  // add animation and initialize for current weather
  addCurrentlyAnimation();
  geocodeLocation();

  // add animation and initialize for daily forecast
  addHourlyDailyAnimation();
  initializeDaily();
  search.value = '';
});
