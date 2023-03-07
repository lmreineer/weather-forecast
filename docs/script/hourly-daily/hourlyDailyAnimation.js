// infos for future forecast
const timeUnit = document.querySelectorAll('.time-unit');
const futureIcon = document.querySelectorAll('.future-icon');
const futureTemp = document.querySelectorAll('.future-temp');
const arrows = document.querySelectorAll('.arrow');
const group = document.querySelectorAll('.group');

function addHourlyDailyAnimation() {
  // add preloading animation
  timeUnit.forEach((t) => {
    const time = t;
    time.classList.add('lds-ring');
    time.innerText = '';
  });

  futureIcon.forEach((fi) => {
    const icon = fi;
    icon.src = '';
  });

  futureTemp.forEach((tmp) => {
    const temp = tmp;
    temp.classList.add('lds-ring');
    temp.innerText = '';
  });

  // remove arrows
  arrows.forEach((a) => {
    const arrow = a;
    arrow.style.display = 'none';
  });

  // refresh total groups after removing
  group.forEach((g) => {
    const grp = g;
    grp.style.display = 'flex';
  });
}

function removeHourlyDailyAnimation() {
  timeUnit.forEach((t) => {
    t.classList.remove('lds-ring');
  });

  futureIcon.forEach((fi) => {
    fi.classList.remove('lds-ring');
  });

  futureTemp.forEach((tmp) => {
    tmp.classList.remove('lds-ring');
  });
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
  addHourlyDailyAnimation,
  removeHourlyDailyAnimation,
};
