import {createErrorMessage,createSuccessMessage} from './utils.js';
import {setActiveMapFilters} from './form-state.js';
import {blockSubmitButton,unblockSubmitButton} from './form-validate.js';

//Получение и отправка данных на сервер
const serverAddressGetData = 'https://26.javascript.pages.academy/keksobooking/data';
const serverAddressSendData = 'https://26.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
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
      createErrorMessage(err.message) );
};

const sendData = (body) => {
  blockSubmitButton();
  fetch(serverAddressSendData,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        createSuccessMessage();
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      createErrorMessage('Не удалось отправить форму. Попробуйте ещё раз');
    }).finally(unblockSubmitButton);
};


export {getData,sendData};
