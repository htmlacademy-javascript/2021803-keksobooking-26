const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
const successTemplateElement = document.querySelector('#success').content.querySelector('.success');

//Функция получения рандомного целого числа из диапазона
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Функция получения случайного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

//Функция получения случайного массива
const getRandomArray = (elements) => {
  //const ARRAY_LENGTH = getRandomPositiveInteger(0, elements.length - 1);
  const ARRAY_LENGTH = 10;
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

//Функция получения ссылки на аватар
const getAvatarLink = (index) => index < 10 ? `img/avatars/user0${index}.png` : `img/avatars/user${index}.png`;

//Функция верной грамматики
const getCorrectGrammar = (rooms,guests) => {
  let correctRooms = 'комната';
  if(rooms>4){
    correctRooms = 'комнат';
  } else if (rooms>1) {
    correctRooms = 'комнаты';
  }
  let correctGuests = 'гостя';
  if(guests>1){
    correctGuests = 'гостей';
  }
  return `${rooms} ${correctRooms} для ${guests} ${correctGuests}`;
};

//Функция отрисовки особенностей объекта
const createFeatures = (advertisementsElement,offer) => {
  const featuresContainer = advertisementsElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  featuresList.forEach((featuresListItem) => {
    if (offer.features){
      const isNecessary = offer.features.some ((feature) =>featuresListItem.classList.contains(`popup__feature--${  feature}` ),);
      if (!isNecessary) {
        featuresListItem.remove();
        featuresContainer.classList.add ('hidden');
      }
    }
  });
};
//Функция отрисовки фото объекта
const createPhotos = (advertisementsElement,offer) =>{
  const photos = advertisementsElement.querySelector('.popup__photos');
  const photoElement = photos.querySelector('.popup__photo').cloneNode(true);
  photos.querySelector('.popup__photo').remove();
  if(offer.photos){
    for (let i = 0; i<offer.photos.length;i++){
      if(offer.photos[i]){
        photoElement.src = offer.photos[i];
        photoElement.width = '45';
        photoElement.height = '40';
        photoElement.alt = 'Фотография жилья';
        photos.appendChild(photoElement);}
    }
  } else {
    photos.classList.add ('hidden');
  }
};

//Функция отображения описания
const createDescription = (advertisementsElement,offer) => {
  const description = advertisementsElement.querySelector('.popup__description');
  if(offer.description){
    description.textContent = offer.description;
  } else {
    description.classList.add ('hidden');
  }
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

//Создание сообщений с обработчиками
const isEscapeKey = (evt) => evt.key ==='Escape';
const createMessage = (formContainer) => {
  document.body.append(formContainer);

  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey) {
      evt.preventDefault();
      formContainer.remove();
      document.removeEventListener('keydown', onPopupEscKeydown);
    }
  };

  formContainer.addEventListener('click', () => {
    formContainer.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
  });
  document.addEventListener('keydown', onPopupEscKeydown);
};

const createErrorMessage = () => {
  const formContainer = errorTemplateElement.cloneNode(true);
  createMessage(formContainer);
};
const createSuccessMessage = () => {
  const formContainer = successTemplateElement.cloneNode(true);
  createMessage(formContainer);
};

export {getRandomArrayElement, getRandomArray, getAvatarLink,getCorrectGrammar,createPhotos,createFeatures,debounce,createErrorMessage,createSuccessMessage,createDescription};
