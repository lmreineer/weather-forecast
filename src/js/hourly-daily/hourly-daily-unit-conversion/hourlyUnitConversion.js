/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */

import {
  VCNG,
  IPGLCN,
} from '../../lesClés.js';

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

function getTemp(hoursDisplayed, scale) {
  return `${Math.round(hoursDisplayed.temp)}&deg${scale}`;
}

let dailyButtonClicked = false;

function applyGroupInfos(hoursDisplayed, temp, scale) {
  const futureTemp = temp;

  // apply infos to each groups
  for (const [i] of futureTemp.entries()) {
    // avoid overwriting preload animation with text
    if (!dailyButtonClicked) {
      futureTemp[i].innerHTML = getTemp(hoursDisplayed[i], scale);
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

// for page control
function controlPages(hours, temp, s, e, scale) {
  let hoursDisplayed = hours;
  const futureTemp = temp;

  // slice enough groups for a page
  hoursDisplayed = hoursDisplayed.slice(s, e);

  // apply infos to each groups
  applyGroupInfos(hoursDisplayed, futureTemp, scale);
}

// count arrow clicks
let counter = 0;

function applyUnitForHourly(weatherData, timeData, scale) {
  const futureTemp = document.querySelectorAll('.future-temp');

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

  // if groups only take first page
  if (hoursDisplayed.length <= 7) {
    // apply infos to each groups
    applyGroupInfos(hoursDisplayed, futureTemp, scale);

    // use seven as total number of groups able to display
    getTotalGroups(7, hoursDisplayed);

    // else if it takes more than one page
  } else if (hoursDisplayed.length > 7) {
    // execute for first page
    controlPages(hoursDisplayed, futureTemp, 0, 7, scale);

    // control functions with arrows
    if (counter === 1) {
      // for second page
      controlPages(hoursDisplayed, futureTemp, 7, 14, scale);
    } else if (counter === 2) {
      // for third page
      controlPages(hoursDisplayed, futureTemp, 14, 21, scale);
    } else if (counter === 3) {
      // for fourth page
      controlPages(hoursDisplayed, futureTemp, 21, 23, scale);
    }
  }
}

const rightArrow = document.querySelector('.right-arrow');
const leftArrow = document.querySelector('.left-arrow');

rightArrow.addEventListener('click', () => {
  counter += 1;
});

leftArrow.addEventListener('click', () => {
  counter -= 1;
});

function checkHourlyFahrenheit() {
  const locationTitle = document.querySelector('.location');

  const hourlyFahrenheitAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?&key=${VCNG}`;

  fetch(hourlyFahrenheitAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      const currentHourAPI = `https://api.ipgeolocation.io/astronomy?apiKey=${IPGLCN}&location=${locationTitle.innerText}`;

      fetch(currentHourAPI)
        .then((response) => response.json())
        .then((hourData) => {
          applyUnitForHourly(weatherData, hourData, 'F');
        });
    });
}

function checkHourlyCelcius() {
  const locationTitle = document.querySelector('.location');

  const hourlyFahrenheitAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationTitle.innerText}?unitGroup=metric&key=${VCNG}`;

  fetch(hourlyFahrenheitAPI)
    .then((response) => response.json())
    .then((weatherData) => {
      const currentHourAPI = `https://api.ipgeolocation.io/astronomy?apiKey=${IPGLCN}&location=${locationTitle.innerText}`;

      fetch(currentHourAPI)
        .then((response) => response.json())
        .then((hourData) => {
          applyUnitForHourly(weatherData, hourData, 'C');
        });
    });
}

const hourlyButton = document.querySelector('.hourly-button');
const dailyButton = document.querySelector('.daily-button');

hourlyButton.addEventListener('click', () => {
  if (dailyButtonClicked) {
    dailyButtonClicked = false;
  }
});

dailyButton.addEventListener('click', () => {
  if (!dailyButtonClicked) {
    dailyButtonClicked = true;
  }
});

export {
  checkHourlyFahrenheit,
  checkHourlyCelcius,
};
