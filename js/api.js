const serverAddressGetData = 'https://26.javascript.pages.academy/keksobooking/data';
const serverAddressSendData = 'https://26.javascript.pages.academ/keksobooking';

const getData = (onSuccess,onFail) => {
  fetch(serverAddressGetData)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка загрузки данных с сервера');
      }
      return response.json();
    })
    .then((advertisements) => {
      onSuccess(advertisements);
    })
    .catch ( (err) =>
      onFail(err.message) );
};

const sendData = (onSuccess, onFail, body) => {
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
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};
export {getData,sendData};
