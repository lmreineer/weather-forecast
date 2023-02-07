/* eslint-disable import/prefer-default-export */

function checkWeather(lat, lon) {
  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9d1c0111da5cfffd3a11e8e5ec20332f`;

  fetch(weatherAPI)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}

export {
  checkWeather,
};
