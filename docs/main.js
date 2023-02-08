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
  wind.classList.add('dot-flashing');
  currentImage.classList.add('dot-flashing');
  currentTime.classList.add('dot-flashing');
  humidity.classList.add('dot-flashing');
  pressure.classList.add('dot-flashing');
  sunrise.classList.add('dot-flashing');
  sunset.classList.add('dot-flashing');
}

function removeClass() {
  currentTemp.classList.remove('dot-flashing');
  description.classList.remove('dot-flashing');
  feelsLike.classList.remove('dot-flashing');
  highLow.classList.remove('dot-flashing');
  currentImage.classList.remove('dot-flashing');
  currentTime.classList.remove('dot-flashing');
  humidity.classList.remove('dot-flashing');
  pressure.classList.remove('dot-flashing');
  wind.classList.remove('dot-flashing');
  sunrise.classList.remove('dot-flashing');
  sunset.classList.remove('dot-flashing');
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

const hourly = document.querySelector('.hourly');
const daily = document.querySelector('.daily');

hourly.addEventListener('click', () => {
  hourly.style.border = '1px solid black';
  daily.style.border = 'none';
});

daily.addEventListener('click', () => {
  daily.style.border = '1px solid black';
  hourly.style.border = 'none';
});

export {
  addClass,
  removeClass,
  removeText,
};
