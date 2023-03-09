/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */

function getDay(dailyData) {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // return days to be displayed
  return weekdays[new Date(dailyData.datetime).getDay()];
}

function getIcon(dailyData) {
  const { icon } = dailyData;
  return `../res/icon-set/${icon}.svg`;
}

function getHighLow(dailyData) {
  return `${Math.round(dailyData.tempmax)}&degC / <span style="opacity: 0.7">${Math.round(dailyData.tempmin)}&degC</span>`;
}

const timeUnit = document.querySelectorAll('.time-unit');
const futureTemp = document.querySelectorAll('.future-temp');

function applyTodayInfos(dailyData) {
  timeUnit[0].innerText = 'Today';
  futureTemp[0].innerHTML = getHighLow(dailyData[0]);
}

function applyDailyDetails(weatherData) {
  // slice into length of weekday
  const dailyData = weatherData.days.slice(0, 7);

  const futureIcon = document.querySelectorAll('.future-icon');

  // apply infos to each groups
  for (const [i] of dailyData.entries()) {
    timeUnit[i].innerText = getDay(dailyData[i]);
    futureIcon[i].src = getIcon(dailyData[i]);
    futureTemp[i].innerHTML = getHighLow(dailyData[i]);
  }

  applyTodayInfos(dailyData);
}

export {
  applyDailyDetails,
};
