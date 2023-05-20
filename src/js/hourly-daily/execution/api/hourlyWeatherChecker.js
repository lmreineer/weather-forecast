/* eslint-disable import/extensions */

import {
  VCNG,
  IPGLCN,
} from '../../../lesClés.js';

import { applyHourlyDetails } from '../../hourlyDetails.js';
import { removeHourlyDailyAnimation } from '../../hourlyDailyAnimation.js';

const hourlyWeatherChecker = (function setTwoMethods() {
  return {
    // for setting location when hourly button is clicked
    setInitialLocationOnTabClick() {
      const locationTitle = document.querySelector('.location');
      const search = document.querySelector('.search');

      search.value = locationTitle.innerText;

      const hourlyWeatherAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search.value}?unitGroup=metric&key=${VCNG}`;

      // avoid displaying on screen
      search.value = '';

      fetch(hourlyWeatherAPI)
        .then((response) => response.json())
        .then((weatherData) => {
          search.value = locationTitle.innerText;

          const currentHourAPI = `https://api.ipgeolocation.io/astronomy?apiKey=${IPGLCN}&location=New%20York,%20US`;

          // avoid displaying on screen
          search.value = '';

          fetch(currentHourAPI)
            .then((response) => response.json())
            .then((hourData) => {
              applyHourlyDetails(weatherData, hourData);

              removeHourlyDailyAnimation();
            });
        });
    },

    // for using enter or clicking loupe image when searching location using search bar
    useSearchBarForLocation() {
      const search = document.querySelector('.search');

      const hourlyWeatherAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search.value}?unitGroup=metric&key=${VCNG}`;

      fetch(hourlyWeatherAPI)
        .then((response) => response.json())
        .then((weatherData) => {
          const currentHourAPI = `https://api.ipgeolocation.io/astronomy?apiKey=${IPGLCN}&location=${search.value}`;

          fetch(currentHourAPI)
            .then((response) => response.json())
            .then((hourData) => {
              applyHourlyDetails(weatherData, hourData);

              removeHourlyDailyAnimation();
            })
            .catch(() => removeHourlyDailyAnimation());
        });
    },
  };
}());

function checkErrorsForHourly() {
  const errorMessage = document.querySelector('.error');

  // if error is visible
  if (errorMessage.style.visibility === 'visible') {
    // stop operations
    removeHourlyDailyAnimation();

    // else, show weather
  } else {
    hourlyWeatherChecker.useSearchBarForLocation();
  }
}

export {
  checkErrorsForHourly,
  hourlyWeatherChecker,
};
