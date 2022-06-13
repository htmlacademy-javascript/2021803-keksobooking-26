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

const countAd = 10;
const price = {
  min: 0,
  max: 500000
};
const rooms = {
  min: 1,
  max: 20
};
const guests = {
  min: 1,
  max: 40
};
const locationLat = {
  min: 35.65000,
  max: 35.70000
};
const locationLng = {
  min: 139.70000,
  max: 139.80000
};

const title = ['Сдаётся посуточно', 'Сдаётся от 1 месяца'];
const type = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkin = ['12:00', '13:00', '14:00'];
const checkout = ['12:00', '13:00', '14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const description = ['Шикарное жильё для отдыха', 'Лучше не найти', 'Вы будете приятно удивлены', 'Отель с видом на море'];
const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getRandomArray = (elements) => {
  const arrayLength = getRandomPositiveInteger(0, elements.length - 1);
  const newArray = [];

  for (let i = 0; i < arrayLength; i++) {
    let arrayElement = getRandomArrayElement(elements);
    while (newArray.includes(arrayElement)) {
      arrayElement = getRandomArrayElement(elements);
    }
    newArray.push(arrayElement);
  }
  return newArray;
};

const getAvatarLink = (index) => index < 10 ? `img/avatars/user0${index}.png` : `img/avatars/user${index}.png`;

const createAd = (index) => ({
  author: {
    avatar: getAvatarLink(index),
  },
  offer: {
    title: getRandomArrayElement(title),
    address: `${getRandomPositiveFloat(locationLat.min, locationLat.max)},${getRandomPositiveFloat(locationLng.min, locationLng.max)}`,
    price: getRandomPositiveInteger(price.min, price.max),
    type: getRandomArrayElement(type),
    rooms: getRandomPositiveInteger(rooms.min, rooms.max),
    guests: getRandomPositiveInteger(guests.min, guests.max),
    checkin: getRandomArrayElement(checkin),
    checkout: getRandomArrayElement(checkout),
    features: getRandomArray(features),
    description: getRandomArrayElement(description),
    photos: getRandomArray(photos),
  },
  location: {
    lat: getRandomPositiveFloat(locationLat.min, locationLat.max),
    lng: getRandomPositiveFloat(locationLng.min, locationLng.max),
  },
});
const advertisements = [];
for (let i = 1; i <= countAd; i++) {
  advertisements.push(createAd(i));
}


