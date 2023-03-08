const futureTemp = document.querySelectorAll('.future-temp');

function addHourlyDailyConversionAnimation() {
  futureTemp.forEach((tmp) => {
    const temp = tmp;
    temp.classList.add('future-temp-animation');
    temp.innerText = '';
  });
}

function removeHourlyDailyConversionAnimation() {
  futureTemp.forEach((tmp) => {
    tmp.classList.remove('future-temp-animation');
  });
}
export {
  addHourlyDailyConversionAnimation,
  removeHourlyDailyConversionAnimation,
};
