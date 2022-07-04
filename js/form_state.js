// Функция изменения состояния страницы:
// 0 - неактивное состояние
// 1 - активное состояние
const changeState = (state) => {
  const formAdvertisement = document.querySelector('.ad-form');
  const formFilterAdvertisement = document.querySelector('.map__filters');
  if(state === 0) {
    formAdvertisement.classList.add('ad-form--disabled');
    formFilterAdvertisement.classList.add('map__filters--disabled');
    formAdvertisement.setAttribute('disabled','disabled');
    formFilterAdvertisement.setAttribute('disabled','disabled');
  } else if (state ===1) {
    formAdvertisement.classList.remove('ad-form--disabled');
    formFilterAdvertisement.classList.remove('map__filters--disabled');
    formAdvertisement.removeAttribute('disabled');
    formFilterAdvertisement.removeAttribute('disabled');
  }
};
export {changeState};
