/* eslint-disable no-console */
//Функция получения рандомного целого числа из диапазона
const getRandomNumber = (min, max) => (max < min || min < 0 || max < 0 || !Number.isInteger(min) || !Number.isInteger(max)) ? 'Нижняя граница должна быть меньше верхней границы, границы должны быть целыми числами и не должны быть отрицательными числами' : (Math.floor(Math.random() * (max - min + 1)) + min);

//Функция получения рандомного числа из диапазона, с указанием числа знаков после запятой
const getRandomFractionalNumber = (min, max, count) => (max < min || min < 0 || max < 0 || count < 0 || !Number.isInteger(count)) ? 'Нижняя граница должна быть меньше верхней, границы не должны быть отрицательными числами, количество знаков после запятой должно быть не отрицательным целым числом' : Number(((Math.random() * (max - min)) + min).toFixed(count));
console.log(getRandomNumber(21.0, 26));
console.log(getRandomFractionalNumber(0, 0.3, 1));
