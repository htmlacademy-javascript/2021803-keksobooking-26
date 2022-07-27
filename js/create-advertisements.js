import {getCorrectGrammar,createPhotos,createFeatures} from './utils.js';

const TypesHouse = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const templateAdvertisements = document.querySelector ('#card')
  .content
  .querySelector('.popup');

const getRenderingAdvertisement = (advertisements) => {
  const advertisementsFragment = document.createDocumentFragment();
  advertisements
    .slice()
    .forEach(({author, offer})=> {
      const advertisementsElement = templateAdvertisements.cloneNode(true);
      advertisementsElement.querySelector('.popup__avatar').src = author.avatar;
      advertisementsElement.querySelector('.popup__title').textContent = offer.title;
      advertisementsElement.querySelector('.popup__text--address').textContent=offer.address;
      advertisementsElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
      advertisementsElement.querySelector('.popup__type').textContent = TypesHouse[offer.type];
      advertisementsElement.querySelector('.popup__text--capacity').textContent = getCorrectGrammar(offer.rooms,offer.guests);
      advertisementsElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
      createFeatures(advertisementsElement,offer);
      createPhotos(advertisementsElement,offer);
      advertisementsElement.querySelector('.popup__description').textContent = offer.description;
      advertisementsFragment.append(advertisementsElement);
    });
  return advertisementsFragment;
};
export {getRenderingAdvertisement};
