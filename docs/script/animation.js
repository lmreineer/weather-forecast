/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import {
  currentTemp,
  currentIcon,
  description,
  feelsLike,
  currentHighLow,
  wind,
  latestReport,
  sunrise,
  sunset,
  humidity,
  dewPoint,
  pressure,
} from './weather/currentWeather.js';

// day or hour time for daily and hourly forecast
const timeUnit = document.querySelectorAll('.time-unit');
// daily and hourly's high low
const futureHighLow = document.querySelectorAll('.future-hl');

function addClass() {
  currentTemp.classList.add('dot-flashing');
  description.classList.add('dot-flashing');
  feelsLike.classList.add('dot-flashing');
  currentHighLow.classList.add('dot-flashing');
  wind.classList.add('dot-flashing');
  currentIcon.classList.add('dot-flashing');
  latestReport.classList.add('dot-flashing');
  sunrise.classList.add('dot-flashing');
  sunset.classList.add('dot-flashing');
  humidity.classList.add('dot-flashing');
  dewPoint.classList.add('dot-flashing');
  pressure.classList.add('dot-flashing');

  timeUnit.forEach((t) => { t.classList.add('dot-flashing'); });
  futureHighLow.forEach((hl) => { hl.classList.add('dot-flashing'); });
}

function removeClass() {
  currentTemp.classList.remove('dot-flashing');
  description.classList.remove('dot-flashing');
  feelsLike.classList.remove('dot-flashing');
  currentHighLow.classList.remove('dot-flashing');
  wind.classList.remove('dot-flashing');
  currentIcon.classList.remove('dot-flashing');
  latestReport.classList.remove('dot-flashing');
  sunrise.classList.remove('dot-flashing');
  sunset.classList.remove('dot-flashing');
  humidity.classList.remove('dot-flashing');
  dewPoint.classList.remove('dot-flashing');
  pressure.classList.remove('dot-flashing');

  timeUnit.forEach((t) => { t.classList.remove('dot-flashing'); });
  futureHighLow.forEach((hl) => { hl.classList.remove('dot-flashing'); });
}

function removeText() {
  currentTemp.innerText = '';
  description.innerText = '';
  feelsLike.innerText = '';
  currentHighLow.innerText = '';
  wind.innerText = '';
  currentIcon.innerText = '';
  latestReport.innerText = '';
  sunrise.innerText = '';
  sunset.innerText = '';
  humidity.innerText = '';
  dewPoint.innerText = '';
  pressure.innerText = '';

  timeUnit.forEach((t) => { t.innerText = ''; });
  futureHighLow.forEach((hl) => { hl.innerText = ''; });
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
