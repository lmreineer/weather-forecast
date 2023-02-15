/* eslint-disable no-restricted-syntax */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */

import {
  removeClass,
} from './animations.js';

// elements for daily and hourly forecast
const timeUnit = document.querySelectorAll('.time-unit');
const futureTemp = document.querySelectorAll('.future-temp');

function getHour(hoursDisplayed) {
  return hoursDisplayed.datetime.slice(0, 5);
}

function getTemp(hoursDisplayed) {
  return `${Math.round(hoursDisplayed.temp)}&degC`;
}

// function for hourly weather forecast below
function applyHourly(weatherData, timeData) {
  // remove the animation immediately before applying details
  removeClass();

  // declare datas for hours
  const hourlyData = weatherData.days[0].hours;
  const hours = [];
  hourlyData.forEach((data) => {
    // configure it into an hour format
    const hourData = data.datetime;
    hours.push(hourData);
  });

  // get current hour based on input
  const currentHour = timeData.current_time;
  // filter hours that is greater than the current hour
  const returnLarger = hours.filter((n) => n > currentHour);
  // filter hours that is lesser than the current hour
  const returnLesser = hours.filter((n) => n < currentHour);

  // start and end of an index that makes it equal to hours that is the result of returnLarger
  let start = hourlyData.length - returnLarger.length;
  let end = hourlyData.length + returnLarger.length;
  let hoursDisplayed = hourlyData.slice(start, end);
  // apply details to each sets
  for (const [i] of hoursDisplayed.entries()) {
    timeUnit[i].innerText = getHour(hoursDisplayed[i]);
    futureTemp[i].innerHTML = getTemp(hoursDisplayed[i]);
  }

  // if it's 23:00, show hours for the next day
  if (currentHour === '23') {
    // start and end of an index that makes it equal to hours that is the result of returnLesser
    start = hourlyData.length - returnLesser.length;
    end = hourlyData.length + returnLesser.length;
    hoursDisplayed = hourlyData.slice(start, end);
    // apply details to each sets
    for (const [i] of hoursDisplayed.entries()) {
      timeUnit[i].innerText = getHour(hoursDisplayed[i]);
      futureTemp[i].innerHTML = getTemp(hoursDisplayed[i]);
    }
  }
}

export {
  applyHourly,
};
