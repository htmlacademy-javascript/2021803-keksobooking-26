//Функция получения рандомного целого числа из диапазона
function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

//Функция получения рандомного числа из диапазона, с указанием числа знаков после запятой
function getRandomPositiveFloat(a, b, digits = 5) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}
getRandomPositiveInteger(25, 26);
getRandomPositiveFloat(1, 8, 4);

const COUNT_ADVERTISEMENTS = 10;
const PRICE = {
  min: 0,
  max: 500000
};
const ROOMS = {
  min: 1,
  max: 20
};
const GUESTS = {
  min: 1,
  max: 40
};
const LOCATION_LAT = {
  min: 35.65000,
  max: 35.70000
};
const LOCATION_LNG = {
  min: 139.70000,
  max: 139.80000
};

const TITLES = ['Сдаётся посуточно', 'Сдаётся от 1 месяца'];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKINS = ['12:00', '13:00', '14:00'];
const CHECKOUTS = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = ['Шикарное жильё для отдыха', 'Лучше не найти', 'Вы будете приятно удивлены', 'Отель с видом на море'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getRandomArray = (elements) => {
  const ARRAY_LENGTH = getRandomPositiveInteger(0, elements.length - 1);
  const NEW_ARRAY = [];

  for (let i = 0; i < ARRAY_LENGTH; i++) {
    let arrayElement = getRandomArrayElement(elements);
    while (NEW_ARRAY.includes(arrayElement)) {
      arrayElement = getRandomArrayElement(elements);
    }
    NEW_ARRAY.push(arrayElement);
  }
  return NEW_ARRAY;
};

const getAvatarLink = (index) => index < 10 ? `img/avatars/user0${index}.png` : `img/avatars/user${index}.png`;

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
const ADVERTISEMENTS = [];
for (let i = 1; i <= COUNT_ADVERTISEMENTS; i++) {
  ADVERTISEMENTS.push(createAdvertisement(i));
}


