/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */

function getHour(hoursDisplayed) {
  return hoursDisplayed.datetime.slice(0, 5);
}

function getTemp(hoursDisplayed) {
  return `${Math.round(hoursDisplayed.temp)}&degC`;
}

// remove groups that has no details in it
function formatGroups() {
// elements for daily and hourly forecast
  const timeUnit = document.querySelectorAll('.time-unit');

  // filter empty details
  const empty = Array.from(timeUnit).filter((t) => t.innerHTML === '');
  const group = document.querySelectorAll('.group');

  if (empty.length !== 0) {
  // stop slicing after slicing it the first time
    if (group.length === 7) {
    // start and end of an index that makes it equal to the group element that is also empty
      const start = group.length - empty.length;
      const end = group.length + empty.length;
      // determine the group that has empty details
      const emptyEls = Array.from(group).slice(start, end);
      // remove each empty element
      emptyEls.forEach((el) => el.remove());
    // check if new location has been changed and more details became empty
    } else if (group.length < 7) {
    // filter the text's innerHTML if there is none
      const emptyEls = Array.from(group).filter((el) => el.children[0].children[0].children[0].children[0].innerHTML === '');
      emptyEls.forEach((el) => el.remove());
    }
  }
}

// function for hourly weather forecast below
function applyHourly(weatherData, timeData) {
  const group = document.querySelectorAll('.group');
  // calculation for how many groups to be added
  const calc = 7 - group.length;
  // if each group are less than a total of seven
  if (group.length < 7) {
    for (let i = 0; i < calc; i += 1) {
      const table = document.createElement('table');
      table.classList.add('group');
      table.innerHTML = `
      <tbody>
        <tr>
          <th>
            <h2 class="time-unit"></h2>
            <img class="future-icon" src="../res/cloudy.svg">
            <h2 class="future-temp"></h2>
          </th>
        </tr>
      </tbody>
      `;
      document.querySelector('.future').appendChild(table);
    }
  }

  // elements for daily and hourly forecast
  const timeUnit = document.querySelectorAll('.time-unit');
  const futureTemp = document.querySelectorAll('.future-temp');

  // declare datas for hours
  const hourlyData = weatherData.days[0].hours;
  const hours = [];
  hourlyData.forEach((data) => {
    // configure it into an hour format
    const hourData = data.datetime.slice(0, 2);
    hours.push(hourData);
  });

  // get current hour based on input and format it to hour only
  const currentHour = timeData.current_time.slice(0, 2);
  // filter hours that is greater than the current hour
  const returnLarger = hours.filter((n) => n > currentHour);
  // filter hours that is lesser than the current hour
  const returnLesser = hours.filter((n) => n < currentHour);

  // if it's 23:00, show hours for the next day
  if (currentHour === '23') {
    // start and end of an index that makes it equal to hours that is the result of returnLesser
    const start = hourlyData.length - returnLesser.length;
    const end = hourlyData.length + returnLesser.length;
    const hoursDisplayed = hourlyData.slice(start, end);
    // apply details to each sets
    for (const [i] of hoursDisplayed.entries()) {
      timeUnit[i].innerText = getHour(hoursDisplayed[i]);
      futureTemp[i].innerHTML = getTemp(hoursDisplayed[i]);
    }
  } else {
    // start and end of an index that makes it equal to hours that is the result of returnLarger
    const start = hourlyData.length - returnLarger.length;
    const end = hourlyData.length + returnLarger.length;
    const hoursDisplayed = hourlyData.slice(start, end);
    // apply details to each sets
    for (const [i] of hoursDisplayed.entries()) {
      timeUnit[i].innerText = getHour(hoursDisplayed[i]);
      futureTemp[i].innerHTML = getTemp(hoursDisplayed[i]);
      if (returnLarger.length > 7) {
        console.log(returnLarger.length);
      }
    }
  }

  // execute to slice groups if there are only less than seven
  formatGroups();
}

export {
  applyHourly,
};
