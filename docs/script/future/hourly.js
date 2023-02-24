/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */

// function to return hours for next day
function returnNextDayHours(hours, currentHour, hourlyData) {
  // filter lesser hours than current hour to be displayed
  const hoursNextDay = hours.filter((n) => n < currentHour);
  // start and end of index that is equal to hours to be displayed
  const start = hourlyData.length - hoursNextDay.length;
  const end = hourlyData.length + hoursNextDay.length;
  return hourlyData.slice(start, end);
}

// function to return hours normally
function returnNormalHours(hours, currentHour, hourlyData) {
  // filter greater hours than current hour to be displayed
  const hoursNextDay = hours.filter((n) => n > currentHour);
  // start and end of index that is equal to hours to be displayed
  const start = hourlyData.length - hoursNextDay.length;
  const end = hourlyData.length + hoursNextDay.length;
  return hourlyData.slice(start, end);
}

function getHour(hoursDisplayed) {
  return hoursDisplayed.datetime.slice(0, 5);
}

function getTemp(hoursDisplayed) {
  return `${Math.round(hoursDisplayed.temp)}&degC`;
}

function applyGroupInfos(hoursDisplayed, time, temp) {
  const timeUnit = time;
  const futureTemp = temp;

  // apply infos ot each groups
  for (const [i] of hoursDisplayed.entries()) {
    timeUnit[i].innerText = getHour(hoursDisplayed[i]);
    futureTemp[i].innerHTML = getTemp(hoursDisplayed[i]);
  }
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

// for clicking next page
const rightArrow = document.querySelector('.right-arrow');
const leftArrow = document.querySelector('.left-arrow');
// count clicks
let counter = 0;

// show arrows depending on the current page
function showArrows(hours) {
  if (counter === 1) {
    // if total hours takes more than two pages
    if (hours.length > 14) {
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
  } else if (counter === 2) {
    // if total hours takes more than two pages
    if (hours.length < 21) {
      // show left arrow only
      rightArrow.style.display = 'none';
      leftArrow.style.display = 'inline';

      // else if it takes more than three pages
    } else {
      rightArrow.style.display = 'inline';
      leftArrow.style.display = 'inline';
    }
    // use 21 as total number of groups able to display
    getTotalGroups(21, hours);
  } else if (counter === 3) {
    // if it takes more than three pages
    if (hours.length > 21) {
      // show left arrow only
      rightArrow.style.display = 'none';
      leftArrow.style.display = 'inline';
      // use 28 as total number of groups able to display
      getTotalGroups(28, hours);
    }

    // else if zero clicks, show first page
  } else {
    // set right arrow on first page
    rightArrow.style.display = 'inline';
    leftArrow.style.display = 'none';
    // use seven as default number of groups for first page
    getTotalGroups(7, hours);
  }
}

function controlPages(hours, time, temp, s, e) {
  // execute to show arrows
  showArrows(hours);

  let hoursDisplayed = hours;
  const timeUnit = time;
  const futureTemp = temp;

  // slice enough groups for a page
  hoursDisplayed = hoursDisplayed.slice(s, e);
  // execute to apply details to each groups
  applyGroupInfos(hoursDisplayed, timeUnit, futureTemp);
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

  // get current hour data from API and format it to hour format
  const currentHour = timeData.current_time.slice(0, 2);
  let hoursDisplayed;

  // elements for daily and hourly forecast
  const timeUnit = document.querySelectorAll('.time-unit');
  const futureTemp = document.querySelectorAll('.future-temp');

  // if it is not 23:00 yet, show hours normally
  if (currentHour !== '23') {
  // return hours to be applied
    hoursDisplayed = returnNormalHours(hours, currentHour, hourlyData);
  // if it is 23:00, show hours for next day instead
  } else if (currentHour === '23') {
  // return hours to be applied
    hoursDisplayed = returnNextDayHours(hours, currentHour, hourlyData);
  }

  // if groups only take first page
  if (hoursDisplayed.length <= 7) {
    // execute to apply details to each groups
    applyGroupInfos(hoursDisplayed, timeUnit, futureTemp);
    // use seven as total number of groups able to display
    getTotalGroups(7, hoursDisplayed);

    // if it takes more than one page
  } else if (hoursDisplayed.length > 7) {
    // first page
    controlPages(hoursDisplayed, timeUnit, futureTemp, 0, 7);

    // control pages using arrow
    rightArrow.addEventListener('click', () => {
      counter += 1;

      if (counter === 1) {
        // page two
        controlPages(hoursDisplayed, timeUnit, futureTemp, 7, 14);
      } else if (counter === 2) {
        // page three
        controlPages(hoursDisplayed, timeUnit, futureTemp, 14, 21);
      } else {
        // page four
        controlPages(hoursDisplayed, timeUnit, futureTemp, 21, 23);
      }
    });

    // control pages using arrow
    leftArrow.addEventListener('click', () => {
      if (counter === 1) {
        counter -= 1;
        // return to page one
        controlPages(hoursDisplayed, timeUnit, futureTemp, 0, 7);
      } else if (counter === 2) {
        counter -= 1;
        // return to page two
        controlPages(hoursDisplayed, timeUnit, futureTemp, 7, 14);
      } else {
        counter -= 1;
        // return to page three
        controlPages(hoursDisplayed, timeUnit, futureTemp, 14, 21);
      }
    });
  }
}

export {
  applyHourly,
};
