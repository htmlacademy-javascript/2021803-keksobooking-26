const formAdvertisement = document.querySelector('.ad-form');
const allFieldsetsFormAdvertisement = formAdvertisement.querySelectorAll ('fieldset');
const formFilterAdvertisement = document.querySelector('.map__filters');
const allFieldsetsFormFilterAdvertisement = formFilterAdvertisement.querySelectorAll ('fieldset');
const slider = document.querySelector('.ad-form__slider');

//Блокировка формы
const setInactiveForm = () => {
  formAdvertisement.classList.add('ad-form--disabled');
  allFieldsetsFormAdvertisement.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'true');
  });
  slider.setAttribute('disabled', 'true');
};
setInactiveForm();

//Блокировка фильтров карты
const setInactiveMapFilters =() => {
  formFilterAdvertisement.classList.add('map__filters--disabled');
  allFieldsetsFormFilterAdvertisement.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'true');
  });
};
setInactiveMapFilters();

//Активация формы
const setActiveForm = () => {
  formAdvertisement.classList.remove('ad-form--disabled');
  allFieldsetsFormAdvertisement.forEach((fieldset) => {
    fieldset.removeAttribute('disabled', 'true');
  });
  slider.removeAttribute('disabled', 'true');
};

//Активация фильтров карты
const setActiveMapFilters =() => {
  formFilterAdvertisement.classList.remove('map__filters--disabled');
  allFieldsetsFormFilterAdvertisement.forEach((fieldset) => {
    fieldset.removeAttribute('disabled', 'true');
  });
};

export {setActiveForm,setActiveMapFilters};
