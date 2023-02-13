/* eslint-disable import/prefer-default-export */

// refer to below elements from DOM
const day = document.querySelectorAll('.day');
const dayHighLow = document.querySelectorAll('.day-high-low');

const assignDailyHourly = (function assignDetails() {
  return {
    today(weatherData) {
      const { days } = weatherData;
      day[0].innerText = 'Today';
      dayHighLow[0].innerHTML = `${days[0].tempmax}&degC / <span style="opacity: 0.7">${days[0].tempmin}&degC</span>`;
    },

    secondDay(weatherData, weekdays) {
      const { days } = weatherData;
      const result = weekdays[new Date(weatherData.days[1].datetime).getDay()];

      day[1].innerText = result;
      dayHighLow[1].innerHTML = `${days[1].tempmax}&degC / <span style="opacity: 0.7">${days[1].tempmin}&degC</span>`;
    },

    thirdDay(weatherData, weekdays) {
      const { days } = weatherData;
      const result = weekdays[new Date(weatherData.days[2].datetime).getDay()];

      day[2].innerText = result;
      dayHighLow[2].innerHTML = `${days[2].tempmax}&degC / <span style="opacity: 0.7">${days[2].tempmin}&degC</span>`;
    },

    fourthDay(weatherData, weekdays) {
      const { days } = weatherData;
      const result = weekdays[new Date(weatherData.days[3].datetime).getDay()];

      day[3].innerText = result;
      dayHighLow[3].innerHTML = `${days[3].tempmax}&degC / <span style="opacity: 0.7">${days[3].tempmin}&degC</span>`;
    },

    fifthDay(weatherData, weekdays) {
      const { days } = weatherData;
      const result = weekdays[new Date(weatherData.days[4].datetime).getDay()];

      day[4].innerText = result;
      dayHighLow[4].innerHTML = `${days[4].tempmax}&degC / <span style="opacity: 0.7">${days[4].tempmin}&degC</span>`;
    },

    sixthDay(weatherData, weekdays) {
      const { days } = weatherData;
      const result = weekdays[new Date(weatherData.days[5].datetime).getDay()];

      day[5].innerText = result;
      dayHighLow[5].innerHTML = `${days[5].tempmax}&degC / <span style="opacity: 0.7">${days[5].tempmin}&degC</span>`;
    },

    seventhDay(weatherData, weekdays) {
      const { days } = weatherData;
      const result = weekdays[new Date(weatherData.days[6].datetime).getDay()];

      day[6].innerText = result;
      dayHighLow[6].innerHTML = `${days[6].tempmax}&degC / <span style="opacity: 0.7">${days[6].tempmin}&degC</span>`;
    },
  };
}());

// function for daily and hourly weather forecast below
function applyDailyHourly(weatherData) {
  assignDailyHourly.today(weatherData);

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  assignDailyHourly.secondDay(weatherData, weekdays);
  assignDailyHourly.thirdDay(weatherData, weekdays);
  assignDailyHourly.fourthDay(weatherData, weekdays);
  assignDailyHourly.fifthDay(weatherData, weekdays);
  assignDailyHourly.sixthDay(weatherData, weekdays);
  assignDailyHourly.seventhDay(weatherData, weekdays);
}

export {
  applyDailyHourly,
};
