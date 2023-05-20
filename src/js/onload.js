/* eslint-disable import/extensions */

import { addCurrentlyAnimation } from './currently/currentlyAnimation.js';
import { checkCurrentWeather } from './currently/api/currentWeatherChecker.js';
import { addHourlyDailyAnimation } from './hourly-daily/hourlyDailyAnimation.js';
import { checkDailyWeather } from './hourly-daily/execution/api/dailyWeatherChecker.js';

window.addEventListener('load', () => {
  const search = document.querySelector('.search');
  const locationTitle = document.querySelector('.location');

  search.value = locationTitle.innerText;

  // currently section
  addCurrentlyAnimation();
  checkCurrentWeather();

  // daily section
  addHourlyDailyAnimation();
  checkDailyWeather();

  search.value = '';
});
