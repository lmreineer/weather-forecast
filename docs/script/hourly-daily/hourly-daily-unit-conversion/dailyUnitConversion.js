/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */

import { VCNG } from '../../lesClés.js';

function getHighLow(dailyData, scale) {
  const high = Math.round(dailyData.tempmax);
  const low = Math.round(dailyData.tempmin);
  const highLow = `${high}&deg${scale} / <span style="opacity: 0.7">${low}&deg${scale}</span>`;
  return highLow;
}

let hourlyButtonClicked = false;

const futureTemp = document.querySelectorAll('.future-temp');

function applyTodayInfos(dailyData, scale) {
  // avoid overwriting preload animation with text
  if (!hourlyButtonClicked) {
    futureTemp[0].innerHTML = getHighLow(dailyData[0], scale);
  }
}

function applyUnitForDaily(weatherData, scale) {
  // slice into length of weekday
  const dailyData = weatherData.days.slice(0, 7);

  // apply infos to each groups
  for (const [i] of dailyData.entries()) {
    // avoid overwriting preload animation with text
    if (!hourlyButtonClicked) {
      futureTemp[i].innerHTML = getHighLow(dailyData[i], scale);
    }
  }

  applyTodayInfos(dailyData, scale);
}

function checkDailyFahrenheit() {
  const locationTitle = document.querySelector('.location');

  const dailyFahrenheitAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?&key=${VCNG}`;

  fetch(dailyFahrenheitAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      applyUnitForDaily(weatherData, 'F');
    });
}

function checkDailyCelcius() {
  const locationTitle = document.querySelector('.location');

  const dailyCelciusAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?unitGroup=metric&key=${VCNG}`;

  fetch(dailyCelciusAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      applyUnitForDaily(weatherData, 'C');
    });
}

const hourlyButton = document.querySelector('.hourly-button');
const dailyButton = document.querySelector('.daily-button');

hourlyButton.addEventListener('click', () => {
  if (!hourlyButtonClicked) {
    hourlyButtonClicked = true;
  }
});

dailyButton.addEventListener('click', () => {
  if (hourlyButtonClicked) {
    hourlyButtonClicked = false;
  }
});

export {
  checkDailyFahrenheit,
  checkDailyCelcius,
};
