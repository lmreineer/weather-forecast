/* eslint-disable no-restricted-syntax */

// return hours for next day
function returnNextDayHours(hours, currentHour, hourlyWeatherData) {
  // filter next day hours to be displayed
  const hoursNextDay = hours.filter((n) => n < currentHour);
  // start and end of index that is equal to hours to be displayed
  const start = hourlyWeatherData.length - hoursNextDay.length;
  const end = hourlyWeatherData.length + hoursNextDay.length;
  return hourlyWeatherData.slice(start, end);
}

// return hours normally
function returnNormalHours(hours, currentHour, hourlyWeatherData) {
  // filter greater hours than current hour to be displayed
  const hoursNextDay = hours.filter((n) => n > currentHour);
  // start and end of index that is equal to hours to be displayed
  const start = hourlyWeatherData.length - hoursNextDay.length;
  const end = hourlyWeatherData.length + hoursNextDay.length;
  return hourlyWeatherData.slice(start, end);
}

function getHour(hoursDisplayed) {
  return hoursDisplayed.datetime.slice(0, 5);
}

function getIcon(hoursDisplayed) {
  const { icon } = hoursDisplayed;
  return `./res/icon-set/${icon}.svg`;
}

function getCelciusTemp(hoursDisplayed) {
  const celcius = Math.round(hoursDisplayed.temp);
  return `${celcius}&degC`;
}

function getFahrenheitTemp(hoursDisplayed) {
  const fahrenheit = Math.round(hoursDisplayed.temp * (9 / 5) + 32);
  return `${fahrenheit}&degF`;
}

let currentTempClicked = false;

function applyGroupInfos(hoursDisplayed, time, temp) {
  const timeUnit = time;
  const futureIcon = document.querySelectorAll('.future-icon');
  const futureTemp = temp;

  // apply infos to each groups
  for (const [i] of hoursDisplayed.entries()) {
    timeUnit[i].innerText = getHour(hoursDisplayed[i]);
    futureIcon[i].src = getIcon(hoursDisplayed[i]);

    // if fahrenheit is converted before clicking hourly button
    if (currentTempClicked) {
      // get fahrenheit temp initially
      futureTemp[i].innerHTML = getFahrenheitTemp(hoursDisplayed[i]);
    } else {
      futureTemp[i].innerHTML = getCelciusTemp(hoursDisplayed[i]);
    }
  }
}

function getTotalGroups(n, hours) {
  const group = document.querySelectorAll('.group');

  // use n as total hours able to display then calculate total groups to remove
  const totalRemoval = n - hours.length;
  // put six to match up with nodeList index then calculate starting index
  let final = 6 - totalRemoval;

  // use total for number of iteration
  for (let i = 0; i < totalRemoval; i += 1) {
    // use starting index and continue
    group[final += 1].style.display = 'none';
  }
}

const rightArrow = document.querySelector('.right-arrow');
const leftArrow = document.querySelector('.left-arrow');

// count arrow clicks
let counter = 0;

// show either or both arrows depending on the current page
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

// for page control
function controlPages(hours, time, temp, s, e) {
  showArrows(hours);

  let hoursDisplayed = hours;
  const timeUnit = time;
  const futureTemp = temp;

  // slice enough groups for a page
  hoursDisplayed = hoursDisplayed.slice(s, e);

  // apply infos to each groups
  applyGroupInfos(hoursDisplayed, timeUnit, futureTemp);
}

function applyHourlyDetails(weatherData, timeData) {
  // slice current hour to hour format
  const currentHour = timeData.current_time.slice(0, 2);

  let hoursDisplayed;

  const hours = [];

  const hourlyWeatherData = weatherData.days[0].hours;

  hourlyWeatherData.forEach((data) => {
    // slice twenty-four hours to hour format
    const twentyFourHours = data.datetime.slice(0, 2);
    hours.push(twentyFourHours);
  });

  // if current hour is not 23:00
  if (currentHour !== '23') {
    // return hours to be applied, normally
    hoursDisplayed = returnNormalHours(hours, currentHour, hourlyWeatherData);

  // else if current hour is 23:00
  } else if (currentHour === '23') {
    // return hours to be applied, for next day instead
    hoursDisplayed = returnNextDayHours(hours, currentHour, hourlyWeatherData);
  }

  const timeUnit = document.querySelectorAll('.time-unit');
  const futureTemp = document.querySelectorAll('.future-temp');

  // if groups only take first page
  if (hoursDisplayed.length <= 7) {
    // apply infos to each groups
    applyGroupInfos(hoursDisplayed, timeUnit, futureTemp);

    // use seven as total number of groups able to display
    getTotalGroups(7, hoursDisplayed);

    // else if it takes more than one page
  } else if (hoursDisplayed.length > 7) {
    // execute for first page
    controlPages(hoursDisplayed, timeUnit, futureTemp, 0, 7);

    // control functions with arrows
    if (counter === 1) {
      // for second page
      controlPages(hoursDisplayed, timeUnit, futureTemp, 7, 14);
    } else if (counter === 2) {
      // for third page
      controlPages(hoursDisplayed, timeUnit, futureTemp, 14, 21);
    } else if (counter === 3) {
      // for fourth page
      controlPages(hoursDisplayed, timeUnit, futureTemp, 21, 23);
    }
  }
}

rightArrow.addEventListener('click', () => {
  counter += 1;
});

leftArrow.addEventListener('click', () => {
  counter -= 1;
});

// return page to one if searched or daily button is clicked
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

// check if fahrenheit is converted before clicking hourly button
const currentTemp = document.querySelector('.temp');
currentTemp.addEventListener('click', () => {
  if (!currentTempClicked) {
    currentTempClicked = true;
  } else {
    currentTempClicked = false;
  }
});

export {
  applyHourlyDetails,
  getCelciusTemp,
  getFahrenheitTemp,
};
