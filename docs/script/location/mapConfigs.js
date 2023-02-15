/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */

// configure map, and set map location automatically to london
const map = L.map('map', { zoomControl: false, scrollWheelZoom: false }).setView([51.505, -0.09], 3);
let marker = L.marker([51.5, -0.09]).addTo(map);

function optimizeMap() {
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 4,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  map.dragging.disable();
  map.doubleClickZoom.disable();
  marker.dragging.disable();
}

optimizeMap();

// find location on map based on input
function findMapLocation(properties) {
  // remove previous marker before moving to new location
  if (marker) {
    marker.remove();
  }

  // declare latitude and longitude for styling maps
  const latitude = properties.lat;
  const longitude = properties.lon;
  // put marker to new location input
  marker = L.marker(new L.LatLng(latitude, longitude)).addTo(map);
  // drag the map to new location input
  map.panTo(new L.LatLng(latitude, longitude));
}

export {
  findMapLocation,
};
