/* eslint-disable import/extensions */

import { geocodeLocationForCurrently } from './currently/api/currentWeatherChecker.js';
import { geocodeLocationForDaily } from './hourly-daily/execution/api/dailyWeatherChecker.js';
import { addHourlyDailyAnimation } from './hourly-daily/hourlyDailyAnimation.js';
import { addCurrentlyAnimation } from './currently/currentlyAnimation.js';

const search = document.querySelector('.search');
const locationTitle = document.querySelector('.location');

window.addEventListener('load', () => {
  search.value = locationTitle.innerText;

  addCurrentlyAnimation();
  geocodeLocationForCurrently();

  addHourlyDailyAnimation();
  geocodeLocationForDaily();
  search.value = '';
});
