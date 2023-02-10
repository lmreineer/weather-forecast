/* eslint-disable import/prefer-default-export */

// refer to below elements from DOM
const day = document.querySelectorAll('.day');
const dayHighLow = document.querySelector('.day-high-low');

// apply daily hourly weather forecast below
function ApplyDailyHourly(forecast) {
  const { time } = forecast.daily;
}

function checkDailyHourly(lat, lon) {
  const dailyHourlyAPI = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`;
  fetch(dailyHourlyAPI)
    .then((response) => response.json())
    .then((forecast) => ApplyDailyHourly(forecast))
    // eslint-disable-next-line no-console
    .catch((error) => console.error(error));
}

export {
  checkDailyHourly,
};
