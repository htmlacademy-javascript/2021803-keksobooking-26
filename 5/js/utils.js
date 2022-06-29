//Функция получения рандомного целого числа из диапазона
function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

//Функция получения рандомного числа из диапазона, с указанием числа знаков после запятой
function getRandomPositiveFloat(a, b, digits = 5) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

//Функция получения случайного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

//Функция получения случайного массива
const getRandomArray = (elements) => {
  const ARRAY_LENGTH = getRandomPositiveInteger(0, elements.length - 1);
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
export { getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getRandomArray, getAvatarLink,getCorrectGrammar};
