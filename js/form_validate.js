const validateForm = () => {
  const form = document.querySelector('.ad-form');

  const pristine = new Pristine(form, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorTextClass: 'ad-form__error_text'
  });

  //Проверка заголовка объявления (длина заголовка от 30 до 100 символов)
  const LengthTitle = {
    minLength : 30,
    maxLength : 100
  };

  const validateTitle = (value) => value.length >= LengthTitle.minLength && value.length <= LengthTitle.maxLength;
  pristine.addValidator(form.querySelector('#title'), validateTitle, `Длина заголовка должна быть от ${LengthTitle.minLength} до ${LengthTitle.maxLength} символов`);

  //Проверка цены за ночь (Максимальное значение - 100000)
  const MAX_PRICE = 100000;
  const TypeHouseMinPrice = {
    bungalow: 0,
    flat: 1000,
    hotel: 3000,
    house: 5000,
    palace: 10000,
  };
  const price = form.querySelector('#price');
  const typeHouse = form.querySelector('#type');

  const validatePrice = (value) => value >= TypeHouseMinPrice[typeHouse.value] && value <= MAX_PRICE;
  const errorValidatePrice = () => `Цена за ночь должна быть от ${TypeHouseMinPrice[typeHouse.value]} до ${MAX_PRICE}`;
  pristine.addValidator(price, validatePrice, errorValidatePrice);

  //Проверка количества комнат и гостей
  const MatchingRoomsGuests = {
    1 : ['1'],
    2 : ['1','2'],
    3 : ['1','2','3'],
    100: ['0']
  };
  const rooms = form.querySelector('#room_number');
  const capacity = form.querySelector('#capacity');

  const validateCountGuests = () => {
    const selectNumberRooms = MatchingRoomsGuests[rooms.value];
    return selectNumberRooms.includes(capacity.value);
  };
  pristine.addValidator(capacity, validateCountGuests, 'Данный вариант не подходит');


  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      form.submit();
    }
  });
  rooms.addEventListener('change', (evt) => {
    evt.preventDefault();
    pristine.validate(capacity);
  });
  typeHouse.addEventListener('change', (evt) => {
    evt.preventDefault();
    price.placeholder = TypeHouseMinPrice[typeHouse.value];
    pristine.validate(price);
  });
};
export {validateForm};
