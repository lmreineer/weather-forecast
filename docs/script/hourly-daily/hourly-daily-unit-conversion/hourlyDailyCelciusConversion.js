/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/extensions */

import { visualCrossing } from '../../apiKeys.js';

import {
  addHourlyDailyConversionAnimation,
  removeHourlyDailyConversionAnimation,
} from './hourlyDailyConversionAnimation.js';

const futureTemp = document.querySelectorAll('.future-temp');
// element from current weather
const currentTemp = document.querySelector('.temp');

function getHighLow(dailyData) {
  // return temp infos
  return `${Math.round(dailyData.tempmax)}&degC / <span style="opacity: 0.7">${Math.round(dailyData.tempmin)}&degC</span>`;
}

function applyTodayInfos(dailyData) {
  // apply infos for today
  futureTemp[0].innerHTML = getHighLow(dailyData[0]);

  // put strings to correlate with current temp element
  const highestTemp = `${dailyData[0].tempmax}&degC`;
  // if main temp is higher than highest temp
  if (currentTemp.innerHTML > highestTemp) {
    // filter the main temp number
    const temp = `${currentTemp.innerHTML.replace(/\D+/g, '')}&degC`;
    const todayHighLow = `${temp} / <span style="opacity: 0.7">${Math.round(dailyData[0].tempmin)}&degC</span>`;
    // make highest temp equal to main temp
    futureTemp[0].innerHTML = todayHighLow;
  }
}

function applyHourlyDailyCelcius(weatherData) {
  // slice into length of weekday
  const dailyData = weatherData.days.slice(0, 7);

  // apply infos to each groups
  for (const [i] of dailyData.entries()) {
    futureTemp[i].innerHTML = getHighLow(dailyData[i]);
  }

  // execute to apply infos for today
  applyTodayInfos(dailyData);
}

const locationTitle = document.querySelector('.location');

function checkHourlyDailyCelcius() {
  addHourlyDailyConversionAnimation();

  const hourlyDailyCelciusAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?unitGroup=metric&key=${visualCrossing}`;

  fetch(hourlyDailyCelciusAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      applyHourlyDailyCelcius(weatherData);

      removeHourlyDailyConversionAnimation();
    });
}

export { checkHourlyDailyCelcius };
