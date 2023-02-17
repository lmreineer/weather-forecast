/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */

function addAnimation() {
  // hour time for hourly forecast
  const timeUnit = document.querySelectorAll('.time-unit');
  const futureIcon = document.querySelectorAll('.future-icon');
  // hourly's temp
  const futureTemp = document.querySelectorAll('.future-temp');

  // add preloading animation
  timeUnit.forEach((t) => { t.classList.add('dot-flashing'); });
  futureIcon.forEach((fi) => { fi.classList.add('dot-flashing'); });
  futureTemp.forEach((tmp) => { tmp.classList.add('dot-flashing'); });
  // remove text
  timeUnit.forEach((t) => { t.innerText = ''; });
  futureIcon.forEach((fi) => { fi.innerText = ''; });
  futureTemp.forEach((tmp) => { tmp.innerText = ''; });
}

function removeAnimation() {
  // hour time for hourly forecast
  const timeUnit = document.querySelectorAll('.time-unit');
  const futureIcon = document.querySelectorAll('.future-icon');
  // hourly's temp
  const futureTemp = document.querySelectorAll('.future-temp');

  timeUnit.forEach((t) => { t.classList.remove('dot-flashing'); });
  futureIcon.forEach((fi) => { fi.classList.remove('dot-flashing'); });
  futureTemp.forEach((tmp) => { tmp.classList.remove('dot-flashing'); });
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
  addAnimation,
  removeAnimation,
};
