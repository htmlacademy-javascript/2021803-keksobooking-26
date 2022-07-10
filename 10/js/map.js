import {changeState} from './form_state.js';
import {createAdvertisements} from './data.js';
import {getRenderingAdvertisement} from './create_advertisements.js';

const resetButton = document.querySelector('.ad-form__reset');
const address = document.querySelector('#address');
const DefaultAddress ={
  lat: 35.6895,
  lng: 139.692
};
const DEFAULT_ZOOM = '12';
const getMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      changeState(1);
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
  mainPinMarker.addTo(map);
  mainPinMarker.on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    address.value = `${coordinates.lat.toFixed(5)},${coordinates.lng.toFixed(5)}`;
  });
  const icon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const markerGroup = L.layerGroup().addTo(map);
  const advertisements = createAdvertisements();
  const advertisementsFragment = getRenderingAdvertisement(createAdvertisements());

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

  resetButton.addEventListener('click', () => {
    mainPinMarker.setLatLng({
      lat: DefaultAddress.lat,
      lng: DefaultAddress.lng,
    });
    map.setView({
      lat: DefaultAddress.lat,
      lng: DefaultAddress.lng,
    }, 10);
  });
};
export {getMap};
