// infos for future forecast
const timeUnit = document.querySelectorAll('.time-unit');
const futureIcon = document.querySelectorAll('.future-icon');
const futureTemp = document.querySelectorAll('.future-temp');
const arrows = document.querySelectorAll('.arrow');
const group = document.querySelectorAll('.group');

function addAnimation() {
  // add preloading animation
  timeUnit.forEach((t) => {
    const time = t;
    time.classList.add('dot-flashing');
    time.innerText = '';
  });

  futureIcon.forEach((fi) => {
    const icon = fi;
    icon.classList.add('dot-flashing');
    icon.innerText = '';
  });

  futureTemp.forEach((tmp) => {
    const temp = tmp;
    temp.classList.add('dot-flashing');
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

function removeAnimation() {
  timeUnit.forEach((t) => {
    t.classList.remove('dot-flashing');
  });

  futureIcon.forEach((fi) => {
    fi.classList.remove('dot-flashing');
  });

  futureTemp.forEach((tmp) => {
    tmp.classList.remove('dot-flashing');
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
  addAnimation,
  removeAnimation,
};
