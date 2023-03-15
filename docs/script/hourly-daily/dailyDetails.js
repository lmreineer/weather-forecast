/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */

function getDay(dailyData) {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // return days to be displayed
  return weekdays[new Date(dailyData.datetime).getDay()];
}

function getIcon(dailyData) {
  const { icon } = dailyData;
  return `res/icon-set/${icon}.svg`;
}

function getCelciusHighLow(dailyData) {
  const celciusHigh = Math.round(dailyData.tempmax);
  const celciusLow = Math.round(dailyData.tempmin);
  const celciusHighLow = `${celciusHigh}&degC / <span style="opacity: 0.7">${celciusLow}&degC</span>`;
  return celciusHighLow;
}

function getFahrenheitHighLow(dailyData) {
  const fahrenheitHigh = Math.round(dailyData.tempmax * (9 / 5) + 32);
  const fahrenheitLow = Math.round(dailyData.tempmin * (9 / 5) + 32);
  const fahrenheitHighLow = `${fahrenheitHigh}&degF / <span style="opacity: 0.7">${fahrenheitLow}&degF</span>`;
  return fahrenheitHighLow;
}

const timeUnit = document.querySelectorAll('.time-unit');
const futureTemp = document.querySelectorAll('.future-temp');

let currentTempClicked = false;

function applyTodayInfos(dailyData) {
  timeUnit[0].innerText = 'Today';
  futureTemp[0].innerHTML = getCelciusHighLow(dailyData[0]);

  // if fahrenheit is converted before clicking daily tab
  if (currentTempClicked) {
    // get fahrenheit temp initially
    futureTemp[0].innerHTML = getFahrenheitHighLow(dailyData[0]);
  } else {
    futureTemp[0].innerHTML = getCelciusHighLow(dailyData[0]);
  }
}

function applyDailyDetails(weatherData) {
  // slice into length of weekday
  const dailyData = weatherData.days.slice(0, 7);

  const futureIcon = document.querySelectorAll('.future-icon');

  // apply infos to each groups
  for (const [i] of dailyData.entries()) {
    timeUnit[i].innerText = getDay(dailyData[i]);
    futureIcon[i].src = getIcon(dailyData[i]);

    // if fahrenheit is converted before clicking hourly tab
    if (currentTempClicked) {
      futureTemp[i].innerHTML = getFahrenheitHighLow(dailyData[i]);
    } else {
      futureTemp[i].innerHTML = getCelciusHighLow(dailyData[i]);
    }
  }

  applyTodayInfos(dailyData);
}

// check if fahrenheit is converted before clicking hourly button
const currentTemp = document.querySelector('.temp');
currentTemp.addEventListener('click', () => {
  if (!currentTempClicked) {
    currentTempClicked = true;
  } else {
    currentTempClicked = false;
  }
});

export {
  applyDailyDetails,
};
