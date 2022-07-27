import {setActiveMapFilters} from './form-state.js';
import {blockSubmitButton,unblockSubmitButton} from './form-validate.js';

//Получение и отправка данных на сервер
const serverAddressGetData = 'https://26.javascript.pages.academy/keksobooking/data';
const serverAddressSendData = 'https://26.javascript.pages.academy/keksobooking';

const getData = (onSuccess,onError) => {
  fetch(serverAddressGetData)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка загрузки данных с сервера');
      }
      setActiveMapFilters();
      return response.json();
    })
    .then((advertisements) => {
      onSuccess(advertisements);
    })
    .catch ( (err) =>
      onError(err.message));
};

const sendData = (onSuccess,onError,body) => {
  blockSubmitButton();
  fetch(serverAddressSendData,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch((err) => {
      onError(err.message);
    }).finally(unblockSubmitButton);
};


export {getData,sendData};
