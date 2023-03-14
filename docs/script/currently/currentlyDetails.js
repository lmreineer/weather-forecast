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

const details = (function assignDetails() {
  return {
    currentIcon(conditions) {
      const { icon } = conditions;
      currentIcon.src = `./res/icon-set/${icon}.svg`;
    },

    description(conditions) {
      description.innerText = conditions.conditions;
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

    pressure(conditions) {
      pressure.innerText = `Pressure: ${Math.round(conditions.pressure)} mbar`;
    },
  };
}());

const detailsWithCelcius = (function assignDetails() {
  return {
    currentTempCelcius(conditions) {
      const celciusTemp = Math.round(conditions.temp);
      const currentTempCelcius = `${celciusTemp} &degC | <span class="convert-unit">&degF</span>`;
      currentTemp.innerHTML = currentTempCelcius;
    },

    feelsLikeCelcius(conditions) {
      const temp = `${Math.round(conditions.feelslike)}&degC`;
      feelsLike.innerHTML = `Feels like: ${temp}`;
    },

    highLowCelcius(weatherData) {
      const highestTemp = `${Math.round(weatherData.days[0].tempmax)}&degC`;
      const lowestTemp = `${Math.round(weatherData.days[0].tempmin)}&degC`;
      currentHighLow.innerHTML = `<span class="high">High: ${highestTemp}</span> <span class="low">Low: ${lowestTemp}</span>`;
    },

    dewPointCelcius(conditions) {
      const value = Math.round(conditions.dew);
      dewPoint.innerHTML = `Dew point: ${value}&degC`;
    },
  };
}());

const detailsWithFahrenheit = (function assignDetails() {
  return {
    currentTempFahrenheit(conditions) {
      const temp = Math.round(conditions.temp * (9 / 5) + 32);
      const currentTempFahrenheit = `${temp} &degF | <span class="convert-unit">&degC</span>`;
      currentTemp.innerHTML = currentTempFahrenheit;
    },

    feelsLikeFahrenheit(conditions) {
      const feelsLikeTemp = Math.round(conditions.feelslike * (9 / 5) + 32);
      const feelsLikeFahrenheit = `${feelsLikeTemp}&degF`;
      feelsLike.innerHTML = `Feels like: ${feelsLikeFahrenheit}`;
    },

    highLowFahrenheit(weatherData) {
      const highest = Math.round(weatherData.days[0].tempmax * (9 / 5) + 32);
      const highestTempFahrenheit = `${highest}&degF`;
      const lowest = Math.round(weatherData.days[0].tempmin * (9 / 5) + 32);
      const lowestTempFahrenheit = `${lowest}&degF`;
      currentHighLow.innerHTML = `<span class="high">High: ${highestTempFahrenheit}</span> <span class="low">Low: ${lowestTempFahrenheit}</span>`;
    },

    dewPointFahrenheit(conditions) {
      const dewPointTemp = Math.round(conditions.dew * (9 / 5) + 32);
      const dewPointFahrenheit = dewPointTemp;
      dewPoint.innerHTML = `Dew point: ${dewPointFahrenheit}&degF`;
    },
  };
}());

let currentTempClicked = false;

function applyCurrentlyDetails(weatherData) {
  // assign to current conditions
  const conditions = weatherData.currentConditions;

  // if fahrenheit is converted
  if (currentTempClicked) {
    detailsWithFahrenheit.currentTempFahrenheit(conditions);
    detailsWithFahrenheit.feelsLikeFahrenheit(conditions);
    detailsWithFahrenheit.highLowFahrenheit(weatherData);
    detailsWithFahrenheit.dewPointFahrenheit(conditions);
  } else {
    detailsWithCelcius.currentTempCelcius(conditions);
    detailsWithCelcius.feelsLikeCelcius(conditions);
    detailsWithCelcius.highLowCelcius(weatherData);
    detailsWithCelcius.dewPointCelcius(conditions);
  }

  details.currentIcon(conditions);
  details.description(conditions);
  details.wind(conditions);
  details.latestReport(conditions);
  details.sunTimes(conditions);
  details.humidity(conditions);
  details.pressure(conditions);
}

// check if currentTemp element is clicked
currentTemp.addEventListener('click', () => {
  if (!currentTempClicked) {
    currentTempClicked = true;
  } else {
    currentTempClicked = false;
  }
});

export {
  applyCurrentlyDetails,
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
