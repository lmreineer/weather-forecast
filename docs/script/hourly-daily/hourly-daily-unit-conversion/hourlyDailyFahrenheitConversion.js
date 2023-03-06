/* eslint-disable no-restricted-syntax */
/* eslint-disable import/extensions */

import { visualCrossing } from '../../apiKeys.js';

const futureTemp = document.querySelectorAll('.future-temp');
// element from current weather
const currentTemp = document.querySelector('.temp');

function getHighLow(dailyData) {
  // return temp infos
  return `${Math.round(dailyData.tempmax)}&degF / <span style="opacity: 0.7">${Math.round(dailyData.tempmin)}&degF</span>`;
}

function applyTodayInfos(dailyData) {
  // apply infos for today
  futureTemp[0].innerHTML = getHighLow(dailyData[0]);

  // put strings to correlate with current temp element
  const highestTemp = `${dailyData[0].tempmax}&degF`;
  // if current temp is higher than today's highest temp
  if (currentTemp.innerHTML > highestTemp) {
    // make highest temp equal to current temp
    const todayHighLow = `${currentTemp.innerHTML} / <span style="opacity: 0.7">${Math.round(dailyData[0].tempmin)}&degF</span>`;
    futureTemp[0].innerHTML = todayHighLow;
  }
}

function applyHourlyDailyFahrenheit(weatherData) {
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

function checkHourlyDailyFahrenheit() {
  const hourlyDailyFahrenheitAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?&key=${visualCrossing}`;

  fetch(hourlyDailyFahrenheitAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      applyHourlyDailyFahrenheit(weatherData);
    });
}

let clicked = false;

currentTemp.addEventListener('click', () => {
  if (!clicked) {
    checkHourlyDailyFahrenheit();
    clicked = true;
  } else {
    clicked = false;
  }
});
