/* eslint-disable no-restricted-syntax */
/* eslint-disable import/extensions */

import { visualCrossing } from '../../apiKeys.js';
import { checkHourlyDailyCelcius } from './hourlyDailyCelciusConversion.js';

import {
  addHourlyDailyConversionAnimation,
  removeHourlyDailyConversionAnimation,
} from './hourlyDailyConversionAnimation.js';

function getHighLow(dailyData) {
  // return temp infos
  return `${Math.round(dailyData.tempmax)}&degF / <span style="opacity: 0.7">${Math.round(dailyData.tempmin)}&degF</span>`;
}

const futureTemp = document.querySelectorAll('.future-temp');
const currentTemp = document.querySelector('.temp');

function applyTodayInfos(dailyData) {
  futureTemp[0].innerHTML = getHighLow(dailyData[0]);

  // // put strings to correlate with current temp element
  // const highestTemp = `${dailyData[0].tempmax}&degF`;
  // // if main temp is higher than highest temp
  // if (currentTemp.innerHTML > highestTemp) {
  //   // filter the main temp number
  //   const temp = `${currentTemp.innerHTML.replace(/\D+/g, '')}&degF`;
  //   const todayHighLow = `${temp} / <span style="opacity: 0.7">${Math.round(dailyData[0].tempmin)}&degF</span>`;
  //   // make highest temp equal to main temp
  //   futureTemp[0].innerHTML = todayHighLow;
  // }
}

function applyHourlyDailyFahrenheit(weatherData) {
  // slice into length of weekday
  const dailyData = weatherData.days.slice(0, 7);

  // apply infos to each groups
  for (const [i] of dailyData.entries()) {
    futureTemp[i].innerHTML = getHighLow(dailyData[i]);
  }

  applyTodayInfos(dailyData);
}

function checkHourlyDailyFahrenheit() {
  // add preload animation
  addHourlyDailyConversionAnimation();

  const locationTitle = document.querySelector('.location');

  const hourlyDailyFahrenheitAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?&key=${visualCrossing}`;

  fetch(hourlyDailyFahrenheitAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      applyHourlyDailyFahrenheit(weatherData);

      removeHourlyDailyConversionAnimation();
    });
}

let clicked = false;

currentTemp.addEventListener('click', () => {
  if (!clicked) {
    checkHourlyDailyFahrenheit();
    clicked = true;
  } else {
    checkHourlyDailyCelcius();
    clicked = false;
  }
});
