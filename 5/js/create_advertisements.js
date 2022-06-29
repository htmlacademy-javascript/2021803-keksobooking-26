import {ADVERTISEMENTS, TYPES_HOUSE} from './data.js';
import {getCorrectGrammar} from './utils.js';

const LIST_ADVERTISEMENTS = document.querySelector('#map-canvas');
const TEMPLATE_ADVERTISEMENTS = document.querySelector ('#card')
  .content
  .querySelector('.popup');

const ADVERTISEMENTS_FRAGMENT = document.createDocumentFragment();

ADVERTISEMENTS.forEach(({author, offer})=> {
  const ADVERTISEMENTS_ELEMENT = TEMPLATE_ADVERTISEMENTS.cloneNode(true);
  ADVERTISEMENTS_ELEMENT.querySelector('.popup__avatar').src = author.avatar;
  ADVERTISEMENTS_ELEMENT.querySelector('.popup__title').textContent = offer.title;
  ADVERTISEMENTS_ELEMENT.querySelector('.popup__text--address').textContent=offer.address;
  ADVERTISEMENTS_ELEMENT.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  ADVERTISEMENTS_ELEMENT.querySelector('.popup__type').textContent = TYPES_HOUSE[offer.type];
  ADVERTISEMENTS_ELEMENT.querySelector('.popup__text--capacity').textContent = getCorrectGrammar(offer.rooms,offer.guests);
  ADVERTISEMENTS_ELEMENT.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  const FEATURES_CONTAINER = ADVERTISEMENTS_ELEMENT.querySelector('.popup__features');
  const FEATURES_LIST = FEATURES_CONTAINER.querySelectorAll('.popup__feature');
  FEATURES_LIST.forEach((featuresListItem) => {
    const isNecessary = offer.features.some ((feature) =>featuresListItem.classList.contains(`popup__feature--${  feature}` ),);
    if (!isNecessary) {
      featuresListItem.remove();
    }
  });
  ADVERTISEMENTS_ELEMENT.querySelector('.popup__description').textContent = offer.description;
  const PHOTOS = ADVERTISEMENTS_ELEMENT.querySelector('.popup__photos');
  const PHOTO_ELEMENT = PHOTOS.querySelector('.popup__photo').cloneNode(true);
  PHOTOS.querySelector('.popup__photo').remove();
  for (let i = 0; i<offer.photos.length;i++){
    if(offer.photos[i]){
      PHOTO_ELEMENT.src = offer.photos[i];
      PHOTOS.appendChild(PHOTO_ELEMENT);}
  }
  ADVERTISEMENTS_FRAGMENT.appendChild(ADVERTISEMENTS_ELEMENT);
});
LIST_ADVERTISEMENTS.appendChild(ADVERTISEMENTS_FRAGMENT);


