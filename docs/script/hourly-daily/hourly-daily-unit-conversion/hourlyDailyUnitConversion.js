/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-syntax */

function getHighLow(dailyData, scale) {
  // return temp infos
  return `${Math.round(dailyData.tempmax)}&deg${scale} / <span style="opacity: 0.7">${Math.round(dailyData.tempmin)}&deg${scale}</span>`;
}

const futureTemp = document.querySelectorAll('.future-temp');

function applyTodayInfos(dailyData, scale) {
  futureTemp[0].innerHTML = getHighLow(dailyData[0], scale);
}

function applyUnitForHourlyDaily(weatherData, scale) {
  // slice into length of weekday
  const dailyData = weatherData.days.slice(0, 7);

  // apply infos to each groups
  for (const [i] of dailyData.entries()) {
    futureTemp[i].innerHTML = getHighLow(dailyData[i], scale);
  }

  applyTodayInfos(dailyData, scale);
}

export { applyUnitForHourlyDaily };
