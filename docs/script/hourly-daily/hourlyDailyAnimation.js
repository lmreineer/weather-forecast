const timeUnit = document.querySelectorAll('.time-unit');
const futureIcon = document.querySelectorAll('.future-icon');
const futureTemp = document.querySelectorAll('.future-temp');

function addHourlyDailyAnimation() {
  timeUnit.forEach((t) => {
    const unit = t;
    unit.classList.add('future-temp-animation');
    unit.innerText = '';
  });

  futureIcon.forEach((fi) => {
    const icon = fi;
    icon.src = '';
  });

  futureTemp.forEach((tmp) => {
    const temp = tmp;
    temp.classList.add('future-temp-animation');
    temp.innerText = '';
  });

  const arrows = document.querySelectorAll('.arrow');
  const group = document.querySelectorAll('.group');

  // remove arrows
  arrows.forEach((a) => {
    const arrow = a;
    arrow.style.display = 'none';
  });

  // refresh total groups in case of removal
  group.forEach((g) => {
    const grp = g;
    grp.style.display = 'flex';
  });
}

function removeHourlyDailyAnimation() {
  timeUnit.forEach((t) => { t.classList.remove('future-temp-animation'); });
  futureIcon.forEach((fi) => { fi.classList.remove('future-temp-animation'); });
  futureTemp.forEach((tmp) => { tmp.classList.remove('future-temp-animation'); });
}

const hourlyButton = document.querySelector('.hourly-button');
const dailyButton = document.querySelector('.daily-button');

hourlyButton.addEventListener('click', () => {
  hourlyButton.style.border = '1px solid black';
  dailyButton.style.border = '1px solid #FAFBFB';
});

dailyButton.addEventListener('click', () => {
  dailyButton.style.border = '1px solid black';
  hourlyButton.style.border = '1px solid #FAFBFB';
});

export {
  addHourlyDailyAnimation,
  removeHourlyDailyAnimation,
  futureTemp,
};
