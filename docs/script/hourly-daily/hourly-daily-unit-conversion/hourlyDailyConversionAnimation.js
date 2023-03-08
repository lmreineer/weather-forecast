/* eslint-disable import/extensions */

import {
  futureTemp,
} from '../hourlyDailyAnimation.js';

function addHourlyDailyConversionAnimation() {
  futureTemp.forEach((tmp) => {
    const temp = tmp;
    temp.innerHTML = '<div class="future-temp-animation"></div>';
  });
}

function removeHourlyDailyConversionAnimation() {
  futureTemp.forEach((tmp) => { tmp.classList.remove('future-temp-animation'); });
}
export {
  addHourlyDailyConversionAnimation,
  removeHourlyDailyConversionAnimation,
};
