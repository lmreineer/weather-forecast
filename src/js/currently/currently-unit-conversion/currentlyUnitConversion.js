/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import {
  currentTemp,
  feelsLike,
  currentHighLow,
  dewPoint,
} from '../currentlyDetails.js';

const unit = (function assignUnit() {
  return {
    currentTemp(conditions, scale, secondScale) {
      const temp = `${Math.round(conditions.temp)} &deg${scale} | <span class="convert-unit">&deg${secondScale}</span>`;
      currentTemp.innerHTML = temp;
    },

    feelsLike(conditions, scale) {
      const temp = `${Math.round(conditions.feelslike)}&deg${scale}`;
      feelsLike.innerHTML = `Feels like: ${temp}`;
    },

    highLow(weatherData, scale) {
      const highestTemp = `${Math.round(weatherData.days[0].tempmax)}&deg${scale}`;
      const lowestTemp = `${Math.round(weatherData.days[0].tempmin)}&deg${scale}`;
      currentHighLow.innerHTML = `High: ${highestTemp} Low: ${lowestTemp}`;
    },

    dewPoint(conditions, scale) {
      const value = Math.round(conditions.dew);
      dewPoint.innerHTML = `Dew point: ${value}&deg${scale}`;
    },
  };
}());

function applyUnitForCurrently(weatherData, scale, secondScale) {
  const conditions = weatherData.currentConditions;

  unit.currentTemp(conditions, scale, secondScale);
  unit.feelsLike(conditions, scale);
  unit.highLow(weatherData, scale);
  unit.dewPoint(conditions, scale);
}

export { applyUnitForCurrently };
