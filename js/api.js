//Получение и отправка данных на сервер
const serverAddressGetData = 'https://26.javascript.pages.academy/keksobooking/data';
const serverAddressSendData = 'https://26.javascript.pages.academy/keksobooking';
const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
const successTemplateElement = document.querySelector('#success').content.querySelector('.success');

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

//Создание окна ошибки и успешной загрузки ( с обработчиками)
const onErrorButtonClick = (formContainer) => {
  const errorButton = formContainer.querySelector('.error__button');
  errorButton.addEventListener(
    'click',
    () => {
      formContainer.remove();
    },
    { once: true },
  );
};

const onPopupEscKeydown = (formContainer) => {
  window.addEventListener(
    'keydown',
    (evt) => {
      const key = evt.key;
      if (key === 'Escape') {
        formContainer.remove();
      }
    },
    { once: true },
  );
};

const onPopupClick = (formContainer) => {
  document.addEventListener(
    'click',
    () => {
      formContainer.remove();
    },
    { once: true },
  );
};

const createErrorMessage = () => {
  const errorElement = errorTemplateElement.cloneNode(true);
  document.body.append(errorElement);

  onErrorButtonClick(errorElement);
  onPopupEscKeydown(errorElement);
  onPopupClick(errorElement);
};

const createSuccessMessage = () => {
  const successElement = successTemplateElement.cloneNode(true);
  document.body.append(successElement);

  onPopupEscKeydown(successElement);
  onPopupClick(successElement);
};


export {getData,sendData,createErrorMessage,createSuccessMessage};
