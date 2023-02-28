/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */

// element from current weather
const currentTemp = document.querySelector('.temp');

// elements for daily and hourly forecast
const timeUnit = document.querySelectorAll('.time-unit');
const futureIcon = document.querySelectorAll('.future-icon');
const futureTemp = document.querySelectorAll('.future-temp');

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
  // return temp infos
  return `${Math.round(dailyData.tempmax)}&degC / <span style="opacity: 0.7">${Math.round(dailyData.tempmin)}&degC</span>`;
}

function applyTodayInfos(dailyData) {
  // apply infos for today
  timeUnit[0].innerText = 'Today';
  futureTemp[0].innerHTML = getHighLow(dailyData[0]);

  // put strings to correlate with current temp element
  const highestTemp = `${dailyData[0].tempmax}&degC`;
  // if current temp is higher than today's highest temp
  if (currentTemp.innerHTML > highestTemp) {
    // make highest temp equal to current temp
    const todayHighLow = `${currentTemp.innerHTML} / <span style="opacity: 0.7">${Math.round(dailyData[0].tempmin)}&degC</span>`;
    futureTemp[0].innerHTML = todayHighLow;
  }
}

// function for daily weather
function applyDaily(weatherData) {
  // slice into length of weekday
  const dailyData = weatherData.days.slice(0, 7);

  // apply infos to each groups
  for (const [i] of dailyData.entries()) {
    timeUnit[i].innerText = getDay(dailyData[i]);
    futureIcon[i].src = getIcon(dailyData[i]);
    futureTemp[i].innerHTML = getHighLow(dailyData[i]);
  }

  // execute to apply infos for today
  applyTodayInfos(dailyData);
}

export {
  applyDaily,
};
