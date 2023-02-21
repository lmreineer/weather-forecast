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
function removeGroups(timeUnit) {
  const group = document.querySelectorAll('.group');
  // filter empty details
  const empty = Array.from(timeUnit).filter((t) => t.innerHTML === '');

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

// on page refresh, see if there is a missing group caused by removing groups
function addGroups() {
  const group = document.querySelectorAll('.group');
  // if each group are less than a total of seven
  if (group.length < 7) {
    // calculate how many groups to be added
    const calc = 7 - group.length;
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
}

// make the actual hour data equal to filtered returnLarger or returnLesser
function sliceHours(hourlyData, range) {
  // start and end of index that equals to hours
  const start = hourlyData.length - range.length;
  const end = hourlyData.length + range.length;
  return hourlyData.slice(start, end);
}

// for clicking next page
const rightArrow = document.querySelector('.right-arrow');
const leftArrow = document.querySelector('.left-arrow');
// count clicks
let counter = 0;

function controlPages(hours, time, temp, start, end) {
  let hoursDisplayed = hours;
  const timeUnit = time;
  const futureTemp = temp;
  // start and end of slice
  const s = start;
  const e = end;

  // remove and add arrows depending on the current page
  if (counter === 1 && hoursDisplayed.length > 14) {
    rightArrow.style.display = 'inline';
    leftArrow.style.display = 'inline';
  } else if (counter === 0) {
    // show arrow for next page
    rightArrow.style.display = 'inline';
    leftArrow.style.display = 'none';
  } else {
    rightArrow.style.display = 'none';
    leftArrow.style.display = 'inline';
  }

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
  // execute to add potentially missing groups caused by removing groups
  addGroups();

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
    // return hours to be applied
    hoursDisplayed = sliceHours(hourlyData, returnLesser);
  } else {
    // filter hours that is greater than the current hour
    returnLarger = hours.filter((n) => n > currentHour);
    // return hours to be applied
    hoursDisplayed = sliceHours(hourlyData, returnLarger);

    // if it takes more than one page
    if (hoursDisplayed.length > 7) {
      controlPages(hoursDisplayed, timeUnit, futureTemp, 0, 7);

      // control pages
      rightArrow.addEventListener('click', () => {
        if (counter === 0) {
          counter = 1;
          controlPages(hoursDisplayed, timeUnit, futureTemp, 7, 14);
        } else {
          counter = 2;
          controlPages(hoursDisplayed, timeUnit, futureTemp, 14, 21);
        }
      });

      // control pages
      leftArrow.addEventListener('click', () => {
        if (counter === 1) {
          counter = 0;
          controlPages(hoursDisplayed, timeUnit, futureTemp, 0, 7);
        } else {
          counter = 1;
          controlPages(hoursDisplayed, timeUnit, futureTemp, 7, 14);
        }
      });
    } else {
      // apply details to each sets
      for (const [i] of hoursDisplayed.entries()) {
        timeUnit[i].innerText = getHour(hoursDisplayed[i]);
        futureTemp[i].innerHTML = getTemp(hoursDisplayed[i]);
      }
    }

    // if (hoursDisplayed.length > 7) {
    //   // default first page
    //   hoursDisplayed = pages.firstPage(hoursDisplayed);

    //   rightArrow.addEventListener('click', () => {
    //     // refresh hours to be applied
    //     hoursDisplayed = sliceHours(hourlyData, returnLarger);
    //     if (counter === 0) {
    //       counter += 1;
    //       // proceed to next page
    //       pages.secondPage(hoursDisplayed, timeUnit, futureTemp);
    //     } else if (counter === 1) {
    //       pages.thirdPage(hoursDisplayed, timeUnit, futureTemp);
    //       counter = 0;
    //     }
    //   });

    //   leftArrow.addEventListener('click', () => {
    //     hoursDisplayed = pages.firstPage(hoursDisplayed);

    //     // apply details to each sets
    //     for (const [i] of hoursDisplayed.entries()) {
    //       timeUnit[i].innerText = getHour(hoursDisplayed[i]);
    //       futureTemp[i].innerHTML = getTemp(hoursDisplayed[i]);
    //     }
    //   });
    // }
  }

  // execute to slice groups if there are only less than seven
  removeGroups(timeUnit);
}

export {
  applyHourly,
};
