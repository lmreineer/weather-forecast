/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */

import { visualCrossing } from '../../apiKeys.js';

function getHighLow(dailyData, scale) {
  // return temp infos
  return `${Math.round(dailyData.tempmax)}&deg${scale} / <span style="opacity: 0.7">${Math.round(dailyData.tempmin)}&deg${scale}</span>`;
}

const futureTemp = document.querySelectorAll('.future-temp');

function applyTodayInfos(dailyData, scale) {
  futureTemp[0].innerHTML = getHighLow(dailyData[0], scale);
}

function applyUnitForDaily(weatherData, scale) {
  // slice into length of weekday
  const dailyData = weatherData.days.slice(0, 7);

  // apply infos to each groups
  for (const [i] of dailyData.entries()) {
    futureTemp[i].innerHTML = getHighLow(dailyData[i], scale);
  }

  applyTodayInfos(dailyData, scale);
}

function checkDailyFahrenheit() {
  const locationTitle = document.querySelector('.location');

  const dailyFahrenheitAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?&key=${visualCrossing}`;

  fetch(dailyFahrenheitAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      applyUnitForDaily(weatherData, 'F');
    });
}

function checkDailyCelcius() {
  const locationTitle = document.querySelector('.location');

  const dailyCelciusAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?unitGroup=metric&key=${visualCrossing}`;

  fetch(dailyCelciusAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      applyUnitForDaily(weatherData, 'C');
    });
}

export {
  checkDailyFahrenheit,
  checkDailyCelcius,
};
