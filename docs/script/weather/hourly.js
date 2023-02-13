/* eslint-disable import/prefer-default-export */

// function for hourly weather forecast below
function applyHourly(weatherData, timeData) {
  // declare datas of hours
  const hourlyData = weatherData.days[0].hours;
  // get current hour based on input
  const currentHour = timeData.current_time.slice(0, 2);

  const hours = [];

  hourlyData.forEach((data) => {
    // slice it into an hour format
    const hourData = data.datetime.slice(0, 2);
    hours.push(hourData);
  });

  // filter hours that is greater than the current hour
  const returnLarger = hours.filter((n) => n > currentHour);
  // filter hours that is lesser than the current hour
  const returnLesser = hours.filter((n) => n < currentHour);

  if (currentHour === '23') {
    console.log(returnLesser);
  } else {
    console.log(returnLarger);
  }
}

export {
  applyHourly,
};
