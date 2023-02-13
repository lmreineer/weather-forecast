/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import {
  findMapLocation,
} from './mapConfigs.js';

function editLocationTitle(properties) {
  // put location name to HTML
  const currentLocation = document.querySelector('.current-location');
  const anyDigit = /\d/gm;
  // remove any number (prevents any postal codes)
  const initialLocation = properties.address_line1.replace(anyDigit, '').trimEnd();
  const { country } = properties;
  if (initialLocation === country) {
    currentLocation.innerText = `${country}`;
    // if there are parentheses (airport name), avoid it and only put the first name of the location
  } else if (initialLocation.includes('(')) {
    currentLocation.innerText = `${initialLocation.split(' ')[0]}, ${country}`;
    // only put the first name of the location if the country is undefined
  } else if (country === undefined) {
    currentLocation.innerText = initialLocation;
  } else {
    currentLocation.innerText = `${initialLocation}, ${country}`;
  }
}

function applyLocation(data) {
// show location input property datas from API
  const { properties } = data.features[0];
  findMapLocation(properties);
  editLocationTitle(properties);
}

export {
  applyLocation,
};
