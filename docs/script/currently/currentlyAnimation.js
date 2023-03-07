/* eslint-disable import/extensions */

import {
  currentTemp,
  currentIcon,
  feelsLike,
  latestReport,
  sunrise,
  sunset,
  humidity,
  dewPoint,
  pressure,
} from './currentlyDetails.js';

function addCurrentlyAnimation() {
  // remove icon
  currentIcon.src = '';

  // add animations
  currentTemp.classList.add('lds-ring');
  feelsLike.classList.add('lds-ring');
  latestReport.classList.add('lds-ring');
  sunrise.classList.add('lds-ring');
  sunset.classList.add('lds-ring');
  humidity.classList.add('lds-ring');
  dewPoint.classList.add('lds-ring');
  pressure.classList.add('lds-ring');

  // remove texts
  currentTemp.innerText = '';
  feelsLike.innerText = '';
  latestReport.innerText = '';
  sunrise.innerText = '';
  sunset.innerText = '';
  humidity.innerText = '';
  dewPoint.innerText = '';
  pressure.innerText = '';
}

function removeCurrentlyAnimation() {
  currentTemp.classList.remove('lds-ring');
  feelsLike.classList.remove('lds-ring');
  latestReport.classList.remove('lds-ring');
  sunrise.classList.remove('lds-ring');
  sunset.classList.remove('lds-ring');
  humidity.classList.remove('lds-ring');
  dewPoint.classList.remove('lds-ring');
  pressure.classList.remove('lds-ring');
}

const hourlyButton = document.querySelector('.hourly-button');
const dailyButton = document.querySelector('.daily-button');

hourlyButton.addEventListener('click', () => {
  hourlyButton.style.border = '1px solid black';
  dailyButton.style.border = 'none';
});

dailyButton.addEventListener('click', () => {
  dailyButton.style.border = '1px solid black';
  hourlyButton.style.border = 'none';
});

export {
  addCurrentlyAnimation,
  removeCurrentlyAnimation,
};
