import {setActiveForm,setActiveMapFilters} from './form-state.js';
import {getRenderingAdvertisement} from './create-advertisements.js';
import {getData} from './api.js';
import {getRandomArray,debounce,createErrorMessage} from './utils.js';
import {addEventChangeFilter,filterAdvertisements,resetMapFilters} from './filter.js';

const RERENDER_DELAY = 500;
const address = document.querySelector('#address');
const DefaultAddress ={
  lat: 35.6895,
  lng: 139.692
};
const DEFAULT_ZOOM = '12';

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: DefaultAddress.lat,
    lng: DefaultAddress.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
const map = L.map('map-canvas');

const markerGroup = L.layerGroup().addTo(map);
const createMarker = (advertisements) => {
  markerGroup.clearLayers();
  const advertisementsFragment = getRenderingAdvertisement(advertisements);
  for (let i = 0; i< advertisements.length; i++){
    const marker = L.marker(
      {
        lat: advertisements[i].location.lat,
        lng: advertisements[i].location.lng,
      },
      {
        icon,
      },
    );
    marker
      .addTo(markerGroup)
      .bindPopup(advertisementsFragment.children[i]);
  }
};

map.on('load', () => {
  setActiveForm();
  getData((advertisements) => {
    createMarker(getRandomArray(advertisements));
    addEventChangeFilter (debounce ( () => createMarker(filterAdvertisements(advertisements)),RERENDER_DELAY),
      setActiveMapFilters());
  },createErrorMessage);
})
  .setView({
    lat: DefaultAddress.lat,
    lng: DefaultAddress.lng,
  }, DEFAULT_ZOOM);

address.value = `${DefaultAddress.lat.toFixed(5)},${DefaultAddress.lng.toFixed(5)}`;
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

mainPinMarker.addTo(map);
mainPinMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  address.value = `${coordinates.lat.toFixed(5)},${coordinates.lng.toFixed(5)}`;
});

const resetMap = () => {
  mainPinMarker.setLatLng({
    lat: DefaultAddress.lat,
    lng: DefaultAddress.lng,
  });
  map.setView({
    lat: DefaultAddress.lat,
    lng: DefaultAddress.lng,
  }, 10);
  address.value = `${DefaultAddress.lat.toFixed(5)},${DefaultAddress.lng.toFixed(5)}`;
  resetMapFilters();
};

export {resetMap,createMarker};
