
'use strict';

var AMOUNT_OF_ADVERTISEMENTS = 8;

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var HOUSE_TYPES = ['flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

/**
 * Генерирует уникальные объявления
 * @param {Number} amountOfAdvertisements  количество объявлений
 * @returns {Array} массив с уникальными объявлениями
 */
var generateSimilarAdvertisements = function (amountOfAdvertisements) {
  var generatedAdvertisements = [];

  var avatars = getUserAvatarAddresses(AMOUNT_OF_ADVERTISEMENTS);
  var titles = shuffleArray(TITLES);

  for (var i = 0; i < amountOfAdvertisements; i++) {

    var locationX = getRandomIntInclusive(299, 901);
    var locationY = getRandomIntInclusive(99, 501);

    generatedAdvertisements.push({
      "author": avatars[i],
      "offer": {
        "title": titles[i],
        "address": locationX + ', ' + locationY,
        "price": getRandomIntInclusive(999, 1000001),
        "type": HOUSE_TYPES[getRandomIntInclusive(0, HOUSE_TYPES.length - 1)],
        "rooms": getRandomIntInclusive(0, 6),
        "guests": getRandomIntInclusive(0, 6),
        "checkin": CHECKIN_TIMES[getRandomIntInclusive(0, CHECKIN_TIMES.length - 1)],
        "checkout": CHECKOUT_TIMES[getRandomIntInclusive(0, CHECKOUT_TIMES.length - 1)],
        "features": getRandomizedArrayWithVariableLength(FEATURES),
        "description": '',
        "photos": []
      },
      "location": {
        "x": locationX,
        "y": locationY,
      }
    })
  }

  return generatedAdvertisements;
}

/**
 * Геренирует массив с ссылками на аватары  вида img/avatars/user{{xx}}.png,
 * где xx это число от 1 до 8 с ведущим нулем, аватары не повторяются
 * @param {Number} amountOfAdvertisements - кол-во объявлений
 * @returns {Array} массив с ссылками на аватары
 */
var getUserAvatarAddresses = function (amountOfAdvertisements) {

  var randomImages = [];

  while (randomImages.length < amountOfAdvertisements) {
    var randomNumber = Math.floor(Math.random() * amountOfAdvertisements + 1) + 1;
    var path = getUserAvatarPath(randomNumber);

    if (randomImages.indexOf(path) > -1) {
      continue;
    }
    randomImages[randomImages.length] = path;
  }

  return randomImages;
}

/**
 * Перемешивает массив случайным образом
 * @param {Array} array массив элементы которого нужно перемешать
 * @returns перемешанный массив
 */
var shuffleArray = function (array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/**
 * Возвращает адрес с изображением аватара пользователя
 * @param {Number} number номер пользователя
 * @returns {String} адрес с изображением
 */
var getUserAvatarPath = function (number) {
  return 'img/avatars/user0' + number + '.png'
}

/**
 * Возвращает случайное число в указанном интервале
 * @param {Number} min минимальное число
 * @param {Number} max максимальное числа
 * @return {Number} случайное значение
 */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Возвращает массив строк случайного размера который не больше размера переданного из уникальных значений переданного
 * @param {Array} arrayWithStrings массив строк
 * @returns {Array} массив уникальных строк случайной длины
 */
var getRandomizedArrayWithVariableLength = function (arrayWithStrings) {

  var arrayWithRandomSize = [];
  var randomArraySize = getRandomIntInclusive(1, arrayWithStrings.length - 1);

  while (arrayWithRandomSize.length < randomArraySize) {
    var randomNumber = Math.floor(Math.random() * arrayWithStrings.length - 1) + 1;

    var arrayWithStringsValue = arrayWithStrings[randomNumber];
    if (arrayWithRandomSize.indexOf(arrayWithStringsValue) > -1) {
      continue;
    }
    arrayWithRandomSize.push(arrayWithStringsValue);
  }

  return arrayWithRandomSize;
}

// сгеренируем объявления
var advertisements = generateSimilarAdvertisements(AMOUNT_OF_ADVERTISEMENTS);

// покажем блок .map
document.querySelector('.map').classList.remove('map--faded');

// шаблон
//var similarWizardTemplate = document.querySelector('#similar-wizard-template')
//.content.querySelector('.map__pins');
