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
// const currentTemp = document.querySelector('.temp');

function applyTodayInfos(dailyData) {
  timeUnit[0].innerText = 'Today';
  futureTemp[0].innerHTML = getHighLow(dailyData[0]);

  // // put strings to correlate with current temp element
  // const highestTemp = `${dailyData[0].tempmax}&degC`;
  // // if main temp is higher than highest temp
  // if (currentTemp.innerHTML > highestTemp) {
  //   // filter the main temp number
  //   const temp = `${currentTemp.innerHTML.replace(/\D+/g, '')}&degC`;
  //   const todayHighLow = `${temp} / <span style="opacity: 0.7">${Math.round(dailyData[0].tempmin)}&degC</span>`;
  //   // make highest temp equal to main temp
  //   futureTemp[0].innerHTML = todayHighLow;
  // }
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
