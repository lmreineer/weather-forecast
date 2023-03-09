/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-syntax */

function getTemp(hoursDisplayed, scale) {
  return `${Math.round()}&deg${scale}`;
}

function applyUnitForHourly(hoursDisplayed, scale) {
  const futureTemp = document.querySelectorAll('.future-temp');

  // apply infos to each groups
  for (const [i] of hoursDisplayed.entries()) {
    futureTemp[i].innerHTML = getTemp(hoursDisplayed[i], scale);
  }
}

export {
  applyUnitForHourly,
};
