/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */

import {
  removeClass,
} from './hourly/animations.js';

// usage for checking if main temp is higher than highest temp
const currentTemp = document.querySelector('.temp');

// elements for daily and hourly forecast
const timeUnit = document.querySelectorAll('.time-unit');
const futureTemp = document.querySelectorAll('.future-temp');

function getDay(dailyData) {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return weekdays[new Date(dailyData.datetime).getDay()];
}

function getHighLow(dailyData) {
  return `${Math.round(dailyData.tempmax)}&degC / <span style="opacity: 0.7">${Math.round(dailyData.tempmin)}&degC</span>`;
}

// function for daily weather forecast below
function applyDaily(weatherData) {
  // remove the animation immediately before applying details
  removeClass();

  // slice into a length of weekday
  const dailyData = weatherData.days.slice(0, 7);

  // apply details to each sets
  for (const [i] of dailyData.entries()) {
    timeUnit[i].innerText = getDay(dailyData[i]);
    futureTemp[i].innerHTML = getHighLow(dailyData[i]);
  }

  // functions for Today
  timeUnit[0].innerText = 'Today';
  futureTemp[0].innerHTML = getHighLow(dailyData[0]);
  // if main temp is higher than highest temp, make highest temp equal to main temp
  if (currentTemp.innerHTML > `${dailyData[0].tempmax}&degC`) {
    const todayHighLow = `${currentTemp.innerHTML} / <span style="opacity: 0.7">${Math.round(dailyData[0].tempmin)}&degC</span>`;
    futureTemp[0].innerHTML = todayHighLow;
  }
}

export {
  applyDaily,
};
