/* eslint-disable import/extensions */
import {
  currentTemp,
  currentImage,
  description,
  feelsLike,
  highLow,
  humidity,
  pressure,
  wind,
} from './script/weather.js';

import {
  currentTime,
  sunrise,
  sunset,
} from './script/time.js';

function addClass() {
  currentTemp.classList.add('dot-flashing');
  description.classList.add('dot-flashing');
  feelsLike.classList.add('dot-flashing');
  highLow.classList.add('dot-flashing');
  currentImage.classList.add('dot-flashing');
  currentTime.classList.add('dot-flashing');
  sunrise.classList.add('dot-flashing');
  sunset.classList.add('dot-flashing');
  humidity.classList.add('dot-flashing');
  pressure.classList.add('dot-flashing');
  wind.classList.add('dot-flashing');
}

function removeClass() {
  currentTemp.classList.remove('dot-flashing');
  description.classList.remove('dot-flashing');
  feelsLike.classList.remove('dot-flashing');
  highLow.classList.remove('dot-flashing');
  currentImage.classList.remove('dot-flashing');
  currentTime.classList.remove('dot-flashing');
  sunrise.classList.remove('dot-flashing');
  sunset.classList.remove('dot-flashing');
  humidity.classList.remove('dot-flashing');
  pressure.classList.remove('dot-flashing');
  wind.classList.remove('dot-flashing');
}

function removeText() {
  currentTemp.innerText = '';
  description.innerText = '';
  feelsLike.innerText = '';
  highLow.innerText = '';
  currentImage.innerText = '';
  humidity.innerText = '';
  pressure.innerText = '';
  wind.innerText = '';
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
