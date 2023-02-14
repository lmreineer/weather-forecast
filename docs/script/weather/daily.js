/* eslint-disable import/prefer-default-export */

// elements for daily and hourly forecast
const time = document.querySelectorAll('.time');
// daily and hourly's high low
const highLow = document.querySelectorAll('.high-low');

function getDay(dailyData) {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return weekdays[new Date(dailyData.datetime).getDay()];
}

function getHighLow(dailyData) {
  return `${Math.round(dailyData.tempmax)}&degC / <span style="opacity: 0.7">${Math.round(dailyData.tempmin)}&degC</span>`;
}

const assignDaily = (function assignDetails() {
  return {
    today(dailyData) {
      time[0].innerText = 'Today';
      highLow[1].innerHTML = getHighLow(dailyData[0]);
    },

    secondDay(dailyData) {
      time[1].innerText = getDay(dailyData[1]);
      highLow[2].innerHTML = getHighLow(dailyData[1]);
    },

    thirdDay(dailyData) {
      time[2].innerText = getDay(dailyData[2]);
      highLow[3].innerHTML = getHighLow(dailyData[2]);
    },

    fourthDay(dailyData) {
      time[3].innerText = getDay(dailyData[3]);
      highLow[4].innerHTML = getHighLow(dailyData[3]);
    },

    fifthDay(dailyData) {
      time[4].innerText = getDay(dailyData[4]);
      highLow[5].innerHTML = getHighLow(dailyData[4]);
    },

    sixthDay(dailyData) {
      time[5].innerText = getDay(dailyData[5]);
      highLow[6].innerHTML = getHighLow(dailyData[5]);
    },

    seventhDay(dailyData) {
      time[6].innerText = getDay(dailyData[6]);
      highLow[7].innerHTML = getHighLow(dailyData[6]);
    },
  };
}());

// function for daily weather forecast below
function applyDaily(weatherData) {
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
  applyDaily,
};
