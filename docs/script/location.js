/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
// eslint-disable-next-line max-len

import {
  checkWeather,
} from './weather.js';

import {
  geoapify,
} from './apiKeys.js';

import {
  addClass,
  removeClass,
  removeText,
} from '../main.js';

const map = L.map('map', { zoomControl: false, scrollWheelZoom: false }).setView([51.505, -0.09], 3);
let marker = L.marker([51.5, -0.09]).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 4,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

map.dragging.disable();
map.doubleClickZoom.disable();
marker.dragging.disable();

const search = document.querySelector('.search');
const errorMessage = document.querySelector('.error');

function applyLocation(location) {
// show location input
  const collection = location.features[0];

  // put marker to new location input
  marker = L.marker(new L.LatLng(collection.properties.lat, collection.properties.lon)).addTo(map);
  // drag the map to new location input
  map.panTo(new L.LatLng(collection.properties.lat, collection.properties.lon));

  // convert new location input to lat and lon to check weather based on new location
  const latitude = collection.geometry.coordinates[1];
  const longitude = collection.geometry.coordinates[0];
  checkWeather(latitude, longitude);

  // put location name to HTML DOM
  const currentLocation = document.querySelector('.current-location');
  const anyDigit = /\d/gm;
  // remove any number (prevents any postal codes)
  const initialLocation = collection.properties.address_line1.replace(anyDigit, '').trimEnd();
  const { country } = collection.properties;
  if (initialLocation === country) {
    currentLocation.innerText = `${country}`;
    // if there are parentheses (potentially an airport name), avoid it and only put the first name of the location
  } else if (initialLocation.includes('(')) {
    currentLocation.innerText = `${initialLocation.split(' ')[0]}, ${country}`;
    // only put the first name of the location if the country is undefined
  } else if (country === undefined) {
    currentLocation.innerText = initialLocation;
  } else {
    currentLocation.innerText = `${initialLocation}, ${country}`;
  }
}

function geocodeLocation() {
  // when searching for a location, display loading animation
  removeText();
  addClass();

  if (marker) {
    marker.remove();
  }

  const geocodeAPI = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(search.value)}&apiKey=${geoapify}`;

  fetch(geocodeAPI)
    .then((response) => response.json())
    .then((location) => {
      // if location is already searched, remove loading animation
      removeClass();
      // show error message if no location results found, otherwise, stay hidden
      if (location.features.length === 0) {
        errorMessage.style.visibility = 'visible';
      } else {
        errorMessage.style.visibility = 'hidden';
        applyLocation(location);
      }
    });
}

const loupe = document.querySelector('.fa-magnifying-glass');

search.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    geocodeLocation();
  }
});

loupe.addEventListener('click', () => {
  if (search.value !== '') {
    geocodeLocation();
  }
});

window.addEventListener('load', () => {
  search.value = 'London';
  geocodeLocation();
  search.value = '';
});
