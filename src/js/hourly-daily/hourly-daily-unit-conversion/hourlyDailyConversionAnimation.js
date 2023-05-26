/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import { futureTemp } from '../hourlyDailyAnimation.js';

function addHourlyDailyConversionAnimation() {
  futureTemp.forEach((tmp) => {
    const temp = tmp;

    if (!tmp.classList.contains('future-temp-animation')) {
      temp.innerHTML = '<div class="future-temp-animation"></div>';
    }
  });
}

export { addHourlyDailyConversionAnimation };
