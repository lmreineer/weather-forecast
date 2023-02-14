/* eslint-disable import/prefer-default-export */

// usage for checking if main temp is higher than highest temp
const currentTemp = document.querySelector('.temp');

// elements for daily and hourly forecast
const timeUnit = document.querySelectorAll('.time-unit');
const futureHighLow = document.querySelectorAll('.future-hl');

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
      timeUnit[0].innerText = 'Today';
      futureHighLow[0].innerHTML = getHighLow(dailyData[0]);

      // if main temp is higher than highest temp, make highest temp equal to main temp
      if (currentTemp.innerHTML > `${dailyData[0].tempmax}&degC`) {
        const todayHighLow = `${currentTemp.innerHTML} / <span style="opacity: 0.7">${Math.round(dailyData[0].tempmin)}&degC</span>`;
        futureHighLow[0].innerHTML = todayHighLow;
      }
    },

    secondDay(dailyData) {
      timeUnit[1].innerText = getDay(dailyData[1]);
      futureHighLow[1].innerHTML = getHighLow(dailyData[1]);
    },

    thirdDay(dailyData) {
      timeUnit[2].innerText = getDay(dailyData[2]);
      futureHighLow[2].innerHTML = getHighLow(dailyData[2]);
    },

    fourthDay(dailyData) {
      timeUnit[3].innerText = getDay(dailyData[3]);
      futureHighLow[3].innerHTML = getHighLow(dailyData[3]);
    },

    fifthDay(dailyData) {
      timeUnit[4].innerText = getDay(dailyData[4]);
      futureHighLow[4].innerHTML = getHighLow(dailyData[4]);
    },

    sixthDay(dailyData) {
      timeUnit[5].innerText = getDay(dailyData[5]);
      futureHighLow[5].innerHTML = getHighLow(dailyData[5]);
    },

    seventhDay(dailyData) {
      timeUnit[6].innerText = getDay(dailyData[6]);
      futureHighLow[6].innerHTML = getHighLow(dailyData[6]);
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
