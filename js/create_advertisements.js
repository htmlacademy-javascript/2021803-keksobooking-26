import {TYPES_HOUSE} from './data.js';
import {getCorrectGrammar,createPhotos,createFeatures} from './utils.js';

const listAdvertisements = document.querySelector('#map-canvas');
const templateAdvertisements = document.querySelector ('#card')
  .content
  .querySelector('.popup');

const advertisementsFragment = document.createDocumentFragment();
const getRenderingAdvertisement = (advertisements) => {
  advertisements.forEach(({author, offer})=> {
    const advertisementsElement = templateAdvertisements.cloneNode(true);
    advertisementsElement.querySelector('.popup__avatar').src = author.avatar;
    advertisementsElement.querySelector('.popup__title').textContent = offer.title;
    advertisementsElement.querySelector('.popup__text--address').textContent=offer.address;
    advertisementsElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    advertisementsElement.querySelector('.popup__type').textContent = TYPES_HOUSE[offer.type];
    advertisementsElement.querySelector('.popup__text--capacity').textContent = getCorrectGrammar(offer.rooms,offer.guests);
    advertisementsElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    createFeatures(advertisementsElement,offer);
    createPhotos(advertisementsElement,offer);
    advertisementsElement.querySelector('.popup__description').textContent = offer.description;
    advertisementsFragment.appendChild(advertisementsElement);
  });
  return listAdvertisements.appendChild(advertisementsFragment);
};
export {getRenderingAdvertisement};
