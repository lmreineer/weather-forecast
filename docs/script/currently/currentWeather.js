/* eslint-disable import/prefer-default-export */

const currentTemp = document.querySelector('.temp');
const currentIcon = document.querySelector('.current-icon');
const description = document.querySelector('.desc');
const feelsLike = document.querySelector('.feels-like');
const currentHighLow = document.querySelector('.current-hl');
const wind = document.querySelector('.wind');
const latestReport = document.querySelector('.latest-report');
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const humidity = document.querySelector('.humidity');
const dewPoint = document.querySelector('.dew-point');
const pressure = document.querySelector('.pressure');

const assignCurrently = (function assignDetails() {
  return {
    currentTemp(conditions) {
      const temp = `${Math.round(conditions.temp)}&degC`;
      currentTemp.innerHTML = temp;
    },

    description(conditions) {
      description.innerText = conditions.conditions;
    },

    feelsLike(conditions) {
      const temp = `${Math.round(conditions.feelslike)}&degC`;
      feelsLike.innerHTML = `Feels like: ${temp}`;
    },

    highLow(weatherData) {
      const high = `${Math.round(weatherData.days[0].tempmax)}&degC`;
      const low = `${Math.round(weatherData.days[0].tempmin)}&degC`;
      currentHighLow.innerHTML = `H: ${high} L: ${low}`;

      // if main temp is higher than highest temp, make highest temp equal to main temp
      if (currentTemp.innerHTML > high) {
        currentHighLow.innerHTML = `H: ${currentTemp.innerHTML} L: ${low}`;
      }
    },

    wind(conditions) {
      const speed = Math.round(conditions.windspeed);
      const degrees = conditions.winddir;
      const directions = ['North', 'NNE', 'North East', 'ENE', 'East',
        'ESE', 'South East', 'SSE', 'South',
        'SSW', 'South West', 'WSW', 'West',
        'WNW', 'North West', 'NNW'];
      let section = Math.round(degrees / 22.5 + 0.5);
      section %= 16;

      wind.innerText = `Wind: ${speed} km/h ${directions[section]}`;
    },

    latestReport(conditions) {
      const time = conditions.datetime.slice(0, 5);
      latestReport.innerText = `Latest report: ${time}`;
    },

    sunTimes(conditions) {
      const sunriseTime = conditions.sunrise.slice(0, 5);
      const sunsetTime = conditions.sunset.slice(0, 5);
      sunrise.innerText = `Sunrise: ${sunriseTime}`;
      sunset.innerText = `Sunset: ${sunsetTime}`;
    },

    humidity(conditions) {
      const value = Math.round(conditions.humidity);
      humidity.innerText = `Humidity: ${value}%`;
    },

    dewPoint(conditions) {
      const value = Math.round(conditions.dew);
      dewPoint.innerHTML = `Dew point: ${value}&degC`;
    },

    pressure(conditions) {
      pressure.innerText = `Pressure: ${Math.round(conditions.pressure)} mbar`;
    },
  };
}());

// function for current weather above
function applyCurrently(weatherData) {
  // assign to current conditions
  const conditions = weatherData.currentConditions;

  assignCurrently.currentTemp(conditions);
  assignCurrently.description(conditions);
  assignCurrently.feelsLike(conditions);
  assignCurrently.wind(conditions);

  // high low only available to daily forecast
  assignCurrently.highLow(weatherData);

  assignCurrently.latestReport(conditions);
  assignCurrently.sunTimes(conditions);
  assignCurrently.humidity(conditions);
  assignCurrently.dewPoint(conditions);
  assignCurrently.pressure(conditions);

  const { icon } = weatherData.currentConditions;
  if (icon === 'clear-night') {
    currentIcon.src = '../res/icon-set/clear-night.svg';
  }
}

export {
  applyCurrently,
  currentTemp,
  currentIcon,
  description,
  feelsLike,
  currentHighLow,
  wind,
  latestReport,
  sunrise,
  sunset,
  humidity,
  dewPoint,
  pressure,
};
