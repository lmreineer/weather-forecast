/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */

import {
  ipgeolocation,
} from '../apiKeys.js';

import {
  search,
} from '../apiFunctions.js';

// elements for daily and hourly forecast
const timeUnit = document.querySelectorAll('.time-unit');
const futureHighLow = document.querySelectorAll('.future-hl');
// future weather groups
const groups = document.querySelectorAll('.group');

const assignHourly = (function assignDetails() {
  return {
    today(dailyData) {
      timeUnit[0].innerText = 'Today';
      futureHighLow[0].innerHTML = getHighLow(dailyData[0]);
    },
  };
}());

// function for hourly weather forecast below
function applyHourly(weatherData, timeData) {
  // declare datas of hours
  const hourlyData = weatherData.days[0].hours;
  // get current hour based on input
  const currentHour = timeData.current_time.slice(0, 5);

  const hours = [];

  hourlyData.forEach((data) => {
    // configure it into an hour format
    const hourData = data.datetime.slice(0, 5);
    hours.push(hourData);
  });

  // filter hours that is greater than the current hour
  const returnLarger = hours.filter((n) => n > currentHour);
  // filter hours that is lesser than the current hour
  const returnLesser = hours.filter((n) => n < currentHour);

  // if it's 23:00, show hours for the next day
  if (currentHour === '23') {
    console.log(returnLesser[0]);
  } else {
    console.log(returnLarger);
  }
}

const hourlyButton = document.querySelector('.hourly-button');

hourlyButton.addEventListener('click', () => {
  console.log('s');
});

export {
  applyHourly,
};
