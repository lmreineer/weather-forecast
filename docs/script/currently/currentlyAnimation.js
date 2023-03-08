/* eslint-disable import/extensions */

import {
  currentTemp,
  description,
  currentIcon,
  feelsLike,
  currentHighLow,
  wind,
  latestReport,
  sunrise,
  sunset,
  humidity,
  dewPoint,
  pressure,
} from './currentlyDetails.js';

function addCurrentlyAnimation() {
  currentIcon.src = '';

  currentTemp.classList.add('currently-animation');
  feelsLike.classList.add('currently-animation');
  currentHighLow.classList.add('currently-animation');
  wind.classList.add('currently-animation');
  latestReport.classList.add('currently-animation');
  sunrise.classList.add('currently-animation');
  sunset.classList.add('currently-animation');
  humidity.classList.add('currently-animation');
  dewPoint.classList.add('currently-animation');
  pressure.classList.add('currently-animation');

  currentTemp.innerText = '';
  description.innerText = '';
  feelsLike.innerText = '';
  currentHighLow.innerText = '';
  wind.innerText = '';
  latestReport.innerText = '';
  sunrise.innerText = '';
  sunset.innerText = '';
  humidity.innerText = '';
  dewPoint.innerText = '';
  pressure.innerText = '';
}

function removeCurrentlyAnimation() {
  currentTemp.classList.remove('currently-animation');
  feelsLike.classList.remove('currently-animation');
  currentHighLow.classList.remove('currently-animation');
  wind.classList.remove('currently-animation');
  latestReport.classList.remove('currently-animation');
  sunrise.classList.remove('currently-animation');
  sunset.classList.remove('currently-animation');
  humidity.classList.remove('currently-animation');
  dewPoint.classList.remove('currently-animation');
  pressure.classList.remove('currently-animation');
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
