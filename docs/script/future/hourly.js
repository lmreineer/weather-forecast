/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */

function getHour(hoursDisplayed) {
  return hoursDisplayed.datetime.slice(0, 5);
}

function getTemp(hoursDisplayed) {
  return `${Math.round(hoursDisplayed.temp)}&degC`;
}

const group = document.querySelectorAll('.group');

function getTotalGroups(n, hours) {
  // reset total groups after removing
  group.forEach((g) => {
    const grp = g;
    grp.style.display = 'flex';
  });

  // use n as total hours able to display then calculate total groups to remove
  const totalRemoval = n - hours.length;
  // put six to correlate with nodeList index then calculate starting index
  let final = 6 - totalRemoval;

  // use total for number of iteration
  for (let i = 0; i < totalRemoval; i += 1) {
    // use starting index and continue
    group[final += 1].style.display = 'none';
  }
}

// make the actual hour data equal to filtered returnLarger or returnLesser
function sliceHours(hourlyData, range) {
  // start and end of index that is equal to hours to be displayed
  const start = hourlyData.length - range.length;
  const end = hourlyData.length + range.length;
  return hourlyData.slice(start, end);
}

// for clicking next page
const rightArrow = document.querySelector('.right-arrow');
const leftArrow = document.querySelector('.left-arrow');
// count clicks
let counter = 0;

// show arrows depending on the current page
function showArrows(hours) {
  // set right arrow on first page
  rightArrow.style.display = 'inline';
  leftArrow.style.display = 'none';

  // if clicked once
  if (counter === 1) {
    // if total hours takes more than two pages
    if (hours.length < 21) {
      // show both arrows
      rightArrow.style.display = 'inline';
      leftArrow.style.display = 'inline';
      // else if it takes two pages only
    } else {
      // show left arrow only
      rightArrow.style.display = 'none';
      leftArrow.style.display = 'inline';
    }
    // use 14 as total number of groups able to display
    getTotalGroups(14, hours);
    // if clicked twice
  } else if (counter === 2) {
    // if total hours takes more than two pages
    if (hours.length < 21) {
      // show left arrow only
      rightArrow.style.display = 'none';
      leftArrow.style.display = 'inline';
      // use 21 as total number of groups able to display
      getTotalGroups(21, hours);
      // else if it takes more than three pages
    } else {
      rightArrow.style.display = 'inline';
      leftArrow.style.display = 'inline';
    }
  } else if (counter === 3) {
    // if it takes more than three pages
    if (hours.length > 21) {
      // show left arrow only
      rightArrow.style.display = 'none';
      leftArrow.style.display = 'inline';
      // use 28 as total number of groups able to display
      getTotalGroups(28, hours);
    }
  }

  // else if (counter === 2) {
  //   rightArrow.style.display = 'none';
  //   leftArrow.style.display = 'inline';

  //   for (let i = 0; i < total; i += 1) {
  //     group[final += 1].style.display = 'none';
  //   }
  // }
}

function controlPages(hours, time, temp, start, end) {
  let hoursDisplayed = hours;

  // execute to show arrows
  showArrows(hours);

  const timeUnit = time;
  const futureTemp = temp;
  // start and end of slice
  const s = start;
  const e = end;

  // slice enough sets for a page
  hoursDisplayed = hoursDisplayed.slice(s, e);
  // apply details to each sets
  for (const [i] of hoursDisplayed.entries()) {
    timeUnit[i].innerText = getHour(hoursDisplayed[i]);
    futureTemp[i].innerHTML = getTemp(hoursDisplayed[i]);
  }
}

// function for hourly weather forecast below
function applyHourly(weatherData, timeData) {
  // declare datas for hours
  const hourlyData = weatherData.days[0].hours;
  // make empty array
  const hours = [];
  hourlyData.forEach((data) => {
    // configure it into an hour format
    const hourData = data.datetime.slice(0, 2);
    // push it into an empty array
    hours.push(hourData);
  });

  // get current hour data from API based and format it to hour format
  const currentHour = timeData.current_time.slice(0, 2);

  // elements for daily and hourly forecast
  const timeUnit = document.querySelectorAll('.time-unit');
  const futureTemp = document.querySelectorAll('.future-temp');

  // // count clicks
  // let counter = 0;

  let returnLarger;
  let returnLesser;
  let hoursDisplayed;

  // if it's 23:00, show hours for the next day instead
  if (currentHour === '23') {
    // filter hours that is lesser than the current hour
    returnLesser = hours.filter((n) => n < currentHour);
    // return hours for the next day
    hoursDisplayed = sliceHours(hourlyData, returnLesser);
  } else {
    // filter hours that is greater than the current hour
    returnLarger = hours.filter((n) => n > currentHour);
    // return hours to be applied
    hoursDisplayed = sliceHours(hourlyData, returnLarger);
  }

  if (hoursDisplayed.length <= 7) {
    // apply details to each sets
    for (const [i] of hoursDisplayed.entries()) {
      timeUnit[i].innerText = getHour(hoursDisplayed[i]);
      futureTemp[i].innerHTML = getTemp(hoursDisplayed[i]);
    }
    // execute to get total groups to display for the first page
    getTotalGroups(7, hoursDisplayed);
    // if it takes more than one page
  } else if (hoursDisplayed.length > 7) {
    controlPages(hoursDisplayed, timeUnit, futureTemp, 0, 7);

    // control pages
    rightArrow.addEventListener('click', () => {
      counter += 1;

      if (counter === 1) {
        controlPages(hoursDisplayed, timeUnit, futureTemp, 7, 14);
      } else if (counter === 2) {
        controlPages(hoursDisplayed, timeUnit, futureTemp, 14, 21);
      } else {
        controlPages(hoursDisplayed, timeUnit, futureTemp, 21, 23);
      }
    });
    // control pages
    leftArrow.addEventListener('click', () => {
      if (counter === 1) {
        counter -= 1;
        controlPages(hoursDisplayed, timeUnit, futureTemp, 0, 7);
      } else if (counter === 2) {
        counter -= 1;
        controlPages(hoursDisplayed, timeUnit, futureTemp, 7, 14);
      } else {
        counter -= 1;
        controlPages(hoursDisplayed, timeUnit, futureTemp, 14, 21);
      }
    });
  }
}

export {
  applyHourly,
};
