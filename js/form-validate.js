import {sendData} from './api.js';
import {resetMap} from './map.js';
import {resetFile} from './file.js';
import {createSuccessMessage,createErrorMessage} from './utils.js';

const resetButton = document.querySelector('.ad-form__reset');
const form = document.querySelector('.ad-form');
const price = form.querySelector('#price');
const typeHouse = form.querySelector('#type');
const rooms = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const sliderElement = document.querySelector('.ad-form__slider');
const buttonForm = form.querySelector('.ad-form__submit');
const adsForm = document.querySelector('.ad-form');
const MIN_PRICE = 0;
const MAX_PRICE = 100000;
const START_SLIDER = 1000;
const TypeHouseMinPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const MatchingRoomsGuests = {
  1 : ['1'],
  2 : ['1','2'],
  3 : ['1','2','3'],
  100: ['0']
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error_text'
});

const validateForm = () => {
  //Проверка заголовка объявления (длина заголовка от 30 до 100 символов)
  const LengthTitle = {
    minLength : 30,
    maxLength : 100
  };

  const validateTitle = (value) => value.length >= LengthTitle.minLength && value.length <= LengthTitle.maxLength;
  pristine.addValidator(form.querySelector('#title'), validateTitle, `Длина заголовка должна быть от ${LengthTitle.minLength} до ${LengthTitle.maxLength} символов`);

  //Проверка цены за ночь (Максимальное значение - 100000)
  const validatePrice = (value) => value >= TypeHouseMinPrice[typeHouse.value] && value <= MAX_PRICE;
  const getErrorPriceValidation = () => `Цена за ночь должна быть от ${TypeHouseMinPrice[typeHouse.value]} до ${MAX_PRICE}`;
  pristine.addValidator(price, validatePrice, getErrorPriceValidation);

  //Проверка количества комнат и гостей
  const validateCountGuests = () => {
    const selectNumberRooms = MatchingRoomsGuests[rooms.value];
    return selectNumberRooms.includes(capacity.value);
  };
  pristine.addValidator(capacity, validateCountGuests, 'Данный вариант не подходит');

  //Синхронизация времени заезда и выезда
  const validateTimeIn = () => {
    timeIn.value=timeOut.value;
  };
  const validateTimeOut = () => {
    timeOut.value=timeIn.value;
  };

  rooms.addEventListener('change', (evt) => {
    evt.preventDefault();
    pristine.validate(capacity);
  });

  timeIn.addEventListener('change',validateTimeOut);
  timeOut.addEventListener('change',validateTimeIn);

  //Управление слайдером для цены.
  noUiSlider.create(sliderElement, {
    range: {
      min: MIN_PRICE,
      max: MAX_PRICE,
    },
    start: START_SLIDER,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        return Number.isInteger(value) ? value : value.toFixed(0);
      },
      from: function (value) {
        return Number(value);
      },
    },
  });

  price.addEventListener('change', (evt) => {
    sliderElement.noUiSlider.set(evt.target.value);
  });

  typeHouse.addEventListener('change', (evt) => {
    evt.preventDefault();
    pristine.validate(price);
    price.placeholder = TypeHouseMinPrice[typeHouse.value];
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: TypeHouseMinPrice[typeHouse.value],
        max: MAX_PRICE
      },
      start: price.value,
    });
  });
  sliderElement.noUiSlider.on('slide', () => {
    pristine.validate(price);
    price.value = sliderElement.noUiSlider.get();
  });
};

const blockSubmitButton = () => {
  buttonForm.disabled = true;
  buttonForm.textContent = 'Публикую...';
};
const unblockSubmitButton = () => {
  buttonForm.disabled = false;
  buttonForm.textContent = 'Опубликовать';
};

const resetForm = () => {
  form.reset();
  pristine.reset();
  resetMap();
  resetFile();
  sliderElement.noUiSlider.updateOptions({
    start: START_SLIDER,
    padding: MIN_PRICE,
  });

};

resetButton.addEventListener('click', (evt)=>{
  evt.preventDefault();
  resetForm();
});

const setAdsFormSubmit = () => {
  adsForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    const formData = new FormData(evt.target);
    if (isValid) {
      sendData(
        () => {
          createSuccessMessage();
          resetForm();
        },
        () => {
          createErrorMessage();
        },
        formData);
    }
  });
};

export {validateForm,setAdsFormSubmit,blockSubmitButton,unblockSubmitButton,resetForm};
