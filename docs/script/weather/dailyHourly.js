/* eslint-disable import/prefer-default-export */

// refer to below elements from DOM
const day = document.querySelectorAll('.day');
const dayHighLow = document.querySelectorAll('.day-high-low');

// apply daily hourly weather forecast below
function ApplyDailyHourly(forecast) {
  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const { time } = forecast.daily;
  // get the day from the original date
  const calculate = [
    'Today',
    weekday[new Date(time[1]).getDay()],
    weekday[new Date(time[2]).getDay()],
    weekday[new Date(time[3]).getDay()],
    weekday[new Date(time[4]).getDay()],
    weekday[new Date(time[5]).getDay()],
    weekday[new Date(time[6]).getDay()],
  ];

  // apply weekdays calculated from above
  [day[0].innerText,
    day[1].innerText,
    day[2].innerText,
    day[3].innerText,
    day[4].innerText,
    day[5].innerText,
    day[6].innerText] = calculate;

  const maxTemp = forecast.daily.temperature_2m_max;
  const minTemp = forecast.daily.temperature_2m_min;
  dayHighLow[0].innerHTML = `${maxTemp[0]} / <span style="opacity: 0.75">${minTemp[0]}</span>`;
  dayHighLow[1].innerHTML = `${maxTemp[1]} / <span style="opacity: 0.75">${minTemp[1]}</span>`;
  dayHighLow[2].innerHTML = `${maxTemp[2]} / <span style="opacity: 0.75">${minTemp[2]}</span>`;
  dayHighLow[3].innerHTML = `${maxTemp[3]} / <span style="opacity: 0.75">${minTemp[3]}</span>`;
  dayHighLow[4].innerHTML = `${maxTemp[4]} / <span style="opacity: 0.75">${minTemp[4]}</span>`;
  dayHighLow[5].innerHTML = `${maxTemp[5]} / <span style="opacity: 0.75">${minTemp[5]}</span>`;
  dayHighLow[6].innerHTML = `${maxTemp[6]} / <span style="opacity: 0.75">${minTemp[6]}</span>`;
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
  day,
  dayHighLow,
};
