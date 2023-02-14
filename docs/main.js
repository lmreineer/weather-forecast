/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import {
  currentTemp,
  icons,
  description,
  feelsLike,
  highLow,
  wind,
  latestReport,
  sunrise,
  sunset,
  humidity,
  dewPoint,
  pressure,
} from './script/weather/currentWeather.js';

// elements for daily and hourly forecast
const day = document.querySelectorAll('.day');
const dayHighLow = document.querySelectorAll('.day-high-low');

function addClass() {
  // pick the following elements from currently section
  icons[0].classList.add('dot-flashing');
  highLow[0].classList.add('dot-flashing');

  currentTemp.classList.add('dot-flashing');
  description.classList.add('dot-flashing');
  feelsLike.classList.add('dot-flashing');
  wind.classList.add('dot-flashing');
  latestReport.classList.add('dot-flashing');
  sunrise.classList.add('dot-flashing');
  sunset.classList.add('dot-flashing');
  humidity.classList.add('dot-flashing');
  dewPoint.classList.add('dot-flashing');
  pressure.classList.add('dot-flashing');

  day.forEach((d) => { d.classList.add('dot-flashing'); });
  dayHighLow.forEach((hl) => { hl.classList.add('dot-flashing'); });
}

function removeClass() {
  // pick the following elements from currently section
  icons[0].classList.remove('dot-flashing');
  highLow[0].classList.remove('dot-flashing');

  currentTemp.classList.remove('dot-flashing');
  description.classList.remove('dot-flashing');
  feelsLike.classList.remove('dot-flashing');
  wind.classList.remove('dot-flashing');
  latestReport.classList.remove('dot-flashing');
  sunrise.classList.remove('dot-flashing');
  sunset.classList.remove('dot-flashing');
  humidity.classList.remove('dot-flashing');
  dewPoint.classList.remove('dot-flashing');
  pressure.classList.remove('dot-flashing');
  day.forEach((d) => { d.classList.remove('dot-flashing'); });
  dayHighLow.forEach((hl) => { hl.classList.remove('dot-flashing'); });
}

function removeText() {
  // pick the following elements from currently section
  icons[0].innerText = '';
  highLow[0].innerText = '';

  currentTemp.innerText = '';
  description.innerText = '';
  feelsLike.innerText = '';
  wind.innerText = '';
  latestReport.innerText = '';
  sunrise.innerText = '';
  sunset.innerText = '';
  humidity.innerText = '';
  dewPoint.innerText = '';
  pressure.innerText = '';
  day.forEach((d) => { d.innerText = ''; });
  dayHighLow.forEach((hl) => { hl.innerText = ''; });
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
  addClass,
  removeClass,
  removeText,
};
