/* eslint-disable import/prefer-default-export */

// elements for daily and hourly forecast
const time = document.querySelectorAll('.time');
// daily and hourly's high low
const highLow = document.querySelectorAll('.high-low');
// container of day and daiyHighLow
const timeRange = document.querySelectorAll('.time-range');

function clickHourly() {
  timeRange.forEach((el) => {
    const dailyEls = el;
    dailyEls.innerHTML = `
    <th>
      <h2></h2>
      <img src="../res/cloudy.svg">
      <h2></h2>
    </th>
    `;
  });
}

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
    console.log(returnLesser);
  } else {
    console.log(returnLarger);
  }
}

const hourlyButton = document.querySelector('.hourly-button');

hourlyButton.addEventListener('click', () => {
  clickHourly();
});

export {
  applyHourly,
};
