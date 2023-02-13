/* eslint-disable import/prefer-default-export */

// refer to below elements from DOM
const day = document.querySelectorAll('.day');
const dayHighLow = document.querySelectorAll('.day-high-low');

function getDay(dailyData) {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return weekdays[new Date(dailyData.datetime).getDay()];
}

function getHighLow(dailyData) {
  return `${dailyData.tempmax}&degC / <span style="opacity: 0.7">${dailyData.tempmin}&degC</span>`;
}

const assignDaily = (function assignDetails() {
  return {
    today(dailyData) {
      day[0].innerText = 'Today';
      dayHighLow[0].innerHTML = getHighLow(dailyData[0]);
    },

    secondDay(dailyData) {
      day[1].innerText = getDay(dailyData[1]);
      dayHighLow[1].innerHTML = getHighLow(dailyData[1]);
    },

    thirdDay(dailyData) {
      day[2].innerText = getDay(dailyData[2]);
      dayHighLow[2].innerHTML = getHighLow(dailyData[2]);
    },

    fourthDay(dailyData) {
      day[3].innerText = getDay(dailyData[3]);
      dayHighLow[3].innerHTML = getHighLow(dailyData[3]);
    },

    fifthDay(dailyData) {
      day[4].innerText = getDay(dailyData[4]);
      dayHighLow[4].innerHTML = getHighLow(dailyData[4]);
    },

    sixthDay(dailyData) {
      day[5].innerText = getDay(dailyData[5]);
      dayHighLow[5].innerHTML = getHighLow(dailyData[5]);
    },

    seventhDay(dailyData) {
      day[6].innerText = getDay(dailyData[6]);
      dayHighLow[6].innerHTML = getHighLow(dailyData[6]);
    },
  };
}());

// function for daily and hourly weather forecast below
function applyDailyHourly(weatherData) {
  const dailyData = weatherData.days;

  assignDaily.today(dailyData);
  assignDaily.secondDay(dailyData);
  assignDaily.thirdDay(dailyData);
  assignDaily.fourthDay(dailyData);
  assignDaily.fifthDay(dailyData);
  assignDaily.sixthDay(dailyData);
  assignDaily.seventhDay(dailyData);
}

export {
  applyDailyHourly,
};
