import { getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getRandomArray, getAvatarLink } from './utils.js';

const COUNT_ADVERTISEMENTS = 1;
const PRICE = {
  min: 0,
  max: 200000
};
const ROOMS = {
  min: 1,
  max: 5
};
const GUESTS = {
  min: 1,
  max: 10
};
const LOCATION_LAT = {
  min: 35.65000,
  max: 35.70000
};
const LOCATION_LNG = {
  min: 139.70000,
  max: 139.80000
};

const TYPES_HOUSE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const TITLES = ['Сдаётся посуточно', 'Сдаётся от 1 месяца'];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKINS = ['12:00', '13:00', '14:00'];
const CHECKOUTS = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = ['Шикарное жильё для отдыха', 'Лучше не найти', 'Вы будете приятно удивлены', 'Отель с видом на море'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const createAdvertisement = (index) => ({
  author: {
    avatar: getAvatarLink(index),
  },
  offer: {
    title: getRandomArrayElement(TITLES),
    address: `${getRandomPositiveFloat(LOCATION_LAT.min, LOCATION_LAT.max)},${getRandomPositiveFloat(LOCATION_LNG.min, LOCATION_LNG.max)}`,
    price: getRandomPositiveInteger(PRICE.min, PRICE.max),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomPositiveInteger(ROOMS.min, ROOMS.max),
    guests: getRandomPositiveInteger(GUESTS.min, GUESTS.max),
    checkin: getRandomArrayElement(CHECKINS),
    checkout: getRandomArrayElement(CHECKOUTS),
    features: getRandomArray(FEATURES),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: getRandomArray(PHOTOS),
  },
  location: {
    lat: getRandomPositiveFloat(LOCATION_LAT.min, LOCATION_LAT.max),
    lng: getRandomPositiveFloat(LOCATION_LNG.min, LOCATION_LNG.max),
  },
});
const createAdvertisements = () => {
  const ADVERTISEMENTS = [];
  for (let i = 1; i <= COUNT_ADVERTISEMENTS; i++) {
    ADVERTISEMENTS.push(createAdvertisement(i));
  }
  return ADVERTISEMENTS;
};
export { createAdvertisements, TYPES_HOUSE};
