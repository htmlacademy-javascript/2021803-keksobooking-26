const FILES_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const BASE_PHOTO = '';
const BASE_AVATAR = 'img/muffin-grey.svg';
const fileChooserAvatar = document.querySelector('#avatar');
const previewAvatar = document.querySelector('#avatar-img');
const fileChooserPhoto = document.querySelector('#images');
const previewPhoto = document.querySelector('.ad-form__photo');

const uploadFile = () => {
  fileChooserAvatar.addEventListener('change', () => {
    const file = fileChooserAvatar.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILES_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      previewAvatar.src = URL.createObjectURL(file);
    }
  });

  fileChooserPhoto.addEventListener('change', () => {
    const file = fileChooserPhoto.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILES_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const image = document.createElement('img');
      image.classList.add('.ad-form__photo-image');
      image.alt = 'Фото объекта';
      image.width = '70';
      image.height = '70';
      image.src = URL.createObjectURL(file);
      previewPhoto.appendChild(image);
    }
  });
};
const resetFile = () => {
  previewAvatar.src = BASE_AVATAR;
  previewPhoto.innerHTML = BASE_PHOTO;
};
export {uploadFile,resetFile};
