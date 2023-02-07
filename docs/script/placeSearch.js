/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
// eslint-disable-next-line max-len

import {
  checkWeather,
} from './weather.js';

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

function proceedNewAddress(location) {
// show address input
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
  const currentAddress = document.querySelector('.address-name');
  const anyDigit = /\d/gm;
  // remove any number (prevents any postal codes)
  const initialPlace = collection.properties.address_line1.replace(anyDigit, '').trimEnd();
  const { country } = collection.properties;
  if (initialPlace === country) {
    currentAddress.innerText = `${country}`;
    // if there are parentheses (potentially an airport name), avoid it and only put the first name of the place
  } else if (initialPlace.includes('(')) {
    currentAddress.innerText = `${initialPlace.split(' ')[0]}, ${country}`;
  } else {
    currentAddress.innerText = `${initialPlace}, ${country}`;
  }
}

function geocodeAddress() {
  if (marker) {
    marker.remove();
  }

  const geocodeAPI = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(search.value)}&apiKey=25cbd14dd9d249728f260c7ca6470fdd`;

  fetch(geocodeAPI)
    .then((response) => response.json())
    .then((location) => {
      // show error message if no location results found, otherwise, stay hidden
      if (location.features.length === 0) {
        errorMessage.style.visibility = 'visible';
      } else {
        errorMessage.style.visibility = 'hidden';
        proceedNewAddress(location);
      }
    });
}

const loupe = document.querySelector('.fa-magnifying-glass');

search.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    geocodeAddress();
  }
});

loupe.addEventListener('click', () => {
  if (search.value !== '') {
    geocodeAddress();
  }
});
