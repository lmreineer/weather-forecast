/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */

// function to return hours for next day
function returnNextDayHours(hours, currentHour, hourlyData) {
  // filter next day hours to be displayed
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

function getIcon(hoursDisplayed) {
  const { icon } = hoursDisplayed;
  return `../res/icon-set/${icon}.svg`;
}

function getTemp(hoursDisplayed) {
  return `${Math.round(hoursDisplayed.temp)}&degC`;
}

function applyGroupInfos(hoursDisplayed, time, temp) {
  const timeUnit = time;
  const futureIcon = document.querySelectorAll('.future-icon');
  const futureTemp = temp;

  // apply infos ot each groups
  for (const [i] of hoursDisplayed.entries()) {
    timeUnit[i].innerText = getHour(hoursDisplayed[i]);
    futureIcon[i].src = getIcon(hoursDisplayed[i]);
    futureTemp[i].innerHTML = getTemp(hoursDisplayed[i]);
  }
}

function getTotalGroups(n, hours) {
  // use n as total hours able to display then calculate total groups to remove
  const totalRemoval = n - hours.length;
  // put six to correlate with nodeList index then calculate starting index
  let final = 6 - totalRemoval;

  const group = document.querySelectorAll('.group');
  // use total for number of iteration
  for (let i = 0; i < totalRemoval; i += 1) {
    // use starting index and continue
    group[final += 1].style.display = 'none';
  }
}

// elements for clicking next page
const rightArrow = document.querySelector('.right-arrow');
const leftArrow = document.querySelector('.left-arrow');
// count clicks
let counter = 0;

// function to show either or both arrows depending on the current page
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
    if (hours.length <= 21) {
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

// function for page control
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

// function for hourly weather forecast
function applyHourly(weatherData, timeData) {
  // get current hour data and slice to hour format
  const currentHour = timeData.current_time.slice(0, 2);
  let hoursDisplayed;

  // get hourly weather data
  const hourlyData = weatherData.days[0].hours;
  // make empty array
  const hours = [];

  hourlyData.forEach((data) => {
    // get twenty-four hours and slice to hour format
    const hourData = data.datetime.slice(0, 2);
    // push into empty array
    hours.push(hourData);
  });

  // elements for informations
  const timeUnit = document.querySelectorAll('.time-unit');
  const futureTemp = document.querySelectorAll('.future-temp');

  // if current hour is not 23:00
  if (currentHour !== '23') {
    // return hours to be applied, normally
    hoursDisplayed = returnNormalHours(hours, currentHour, hourlyData);

  // else if current hour is 23:00
  } else if (currentHour === '23') {
    // return hours to be applied, for next day instead
    hoursDisplayed = returnNextDayHours(hours, currentHour, hourlyData);
  }

  // if groups only take first page
  if (hoursDisplayed.length <= 7) {
    // execute to apply infos to each groups
    applyGroupInfos(hoursDisplayed, timeUnit, futureTemp);
    // use seven as total number of groups able to display
    getTotalGroups(7, hoursDisplayed);

    // else if it takes more than one page
  } else if (hoursDisplayed.length > 7) {
    // execute for first page
    controlPages(hoursDisplayed, timeUnit, futureTemp, 0, 7);

    // control functions with arrows
    if (counter === 1) {
      // execute for second page
      controlPages(hoursDisplayed, timeUnit, futureTemp, 7, 14);
    } else if (counter === 2) {
      // execute for third page
      controlPages(hoursDisplayed, timeUnit, futureTemp, 14, 21);
    } else if (counter === 3) {
      // execute for fourth page
      controlPages(hoursDisplayed, timeUnit, futureTemp, 21, 23);
    }
  }
}

// control pages
rightArrow.addEventListener('click', () => {
  counter += 1;
});

// control pages
leftArrow.addEventListener('click', () => {
  counter -= 1;
});

// turn page to one if searched or daily button is clicked
const search = document.querySelector('.search');
const loupe = document.querySelector('.fa-magnifying-glass');
const dailyButton = document.querySelector('.daily-button');

search.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    counter = 0;
  }
});

loupe.addEventListener('click', () => {
  if (search.value !== '') {
    counter = 0;
  }
});

dailyButton.addEventListener('click', () => {
  counter = 0;
});

export { applyHourly };
