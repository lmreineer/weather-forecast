/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */

// hour time for hourly forecast
const timeUnit = document.querySelectorAll('.time-unit');
const futureIcon = document.querySelectorAll('.future-icon');
// hourly's high low
const futureTemp = document.querySelectorAll('.future-temp');

function addClass() {
  timeUnit.forEach((t) => { t.classList.add('dot-flashing'); });
  futureIcon.forEach((fi) => { fi.classList.add('dot-flashing'); });
  futureTemp.forEach((tmp) => { tmp.classList.add('dot-flashing'); });
}

function removeClass() {
  timeUnit.forEach((t) => { t.classList.remove('dot-flashing'); });
  futureIcon.forEach((fi) => { fi.classList.remove('dot-flashing'); });
  futureTemp.forEach((tmp) => { tmp.classList.remove('dot-flashing'); });
}

function removeText() {
  timeUnit.forEach((t) => { t.innerText = ''; });
  futureIcon.forEach((fi) => { fi.innerText = ''; });
  futureTemp.forEach((tmp) => { tmp.innerText = ''; });
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
