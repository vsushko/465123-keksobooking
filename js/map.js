
'use strict';

var AMOUNT_OF_ADVERTISEMENTS = 8;

var MAP_PIN_INDENT_X = 20;
var MAP_PIN_INDENT_Y = 44;

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var HOUSE_TYPES = ['flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var HOUSE_TYPES_MAP = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};

/**
 * Генерирует уникальные объявления
 * @param {Number} amountOfAdvertisements  количество объявлений
 * @return {Array} массив с уникальными объявлениями
 */
var generateSimilarAdvertisements = function (amountOfAdvertisements) {
  var generatedAdvertisements = [];

  var avatars = getUserAvatarAddresses(AMOUNT_OF_ADVERTISEMENTS);
  var titles = shuffleArray(TITLES);

  for (var i = 0; i < amountOfAdvertisements; i++) {

    var locationX = getRandomIntInclusive(299, 901);
    var locationY = getRandomIntInclusive(99, 501);

    generatedAdvertisements.push({
      'author': avatars[i],
      'offer': {
        'title': titles[i],
        'address': locationX + ', ' + locationY,
        'price': getRandomIntInclusive(999, 1000001),
        'type': HOUSE_TYPES[getRandomIntInclusive(0, HOUSE_TYPES.length - 1)],
        'rooms': getRandomIntInclusive(0, 6),
        'guests': getRandomIntInclusive(0, 6),
        'checkin': CHECKIN_TIMES[getRandomIntInclusive(0, CHECKIN_TIMES.length - 1)],
        'checkout': CHECKOUT_TIMES[getRandomIntInclusive(0, CHECKOUT_TIMES.length - 1)],
        'features': getRandomizedArrayWithVariableLength(FEATURES),
        'description': '',
        'photos': []
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
    var randomNumber = Math.floor(Math.random() * amountOfAdvertisements) + 1;
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

// map__pin
var markButton = document.querySelector('.map__pin');

/**
 * Возвращает склонированную ноду кнопки с меткой
 * @param {Object} advertisement
 * @returns {Object} нода
 */
var renderAdvertisementMark = function (advertisement) {
  var buttonElement = markButton.cloneNode(true);

  buttonElement.setAttribute('style', 'left: ' + (advertisement.location.x + MAP_PIN_INDENT_X) + 'px; top: '
    + (advertisement.location.y + MAP_PIN_INDENT_Y) + 'px;');

  var buttonImgElement = buttonElement.querySelector('img');
  buttonImgElement.setAttribute('src', advertisement.author);

  return buttonElement;
}

// генерируем объекты с объявлениями
var buttonsFragment = document.createDocumentFragment();
for (var i = 0; i < advertisements.length; i++) {
  buttonsFragment.appendChild(renderAdvertisementMark(advertisements[i]));
}

// элемент куда будем вставлять объявления
var similarListElement = document.querySelector('.map__pins');

// удаляем предзаполненные метки
while (similarListElement.firstChild) {
  similarListElement.removeChild(similarListElement.firstChild);
}

// вставляем сгенерированные
similarListElement.appendChild(buttonsFragment);

// создадим DOM-элемент объявления на основе первого объявления
var advertisementArticle = document.querySelector('template').content.querySelector('.map__card');

var firstAdvertisement = advertisements[0];

// заполним поля данными из объявления
advertisementArticle.querySelector('.popup__title').textContent = firstAdvertisement.offer.title;
advertisementArticle.querySelector('.popup__address small').textContent = firstAdvertisement.offer.address;
advertisementArticle.querySelector('.popup__price').textContent = firstAdvertisement.offer.price + '&#x20bd;/ночь';
advertisementArticle.querySelector('.popup__house_type').textContent = HOUSE_TYPES_MAP[firstAdvertisement.offer.type];
advertisementArticle.querySelector('.popup__rooms_guests').textContent = firstAdvertisement.offer.rooms + ' для ' + firstAdvertisement.offer.guests + ' гостей';
advertisementArticle.querySelector('.popup__checkin_checkout').textContent = 'Заезд после ' + firstAdvertisement.offer.checkin + ', выезд до ' + firstAdvertisement.offer.checkout;

var fearuresElementsList = advertisementArticle.querySelector('.popup__features');

// удаляем предзаполненные фичи из шаблона
while (fearuresElementsList.firstChild) {
  fearuresElementsList.removeChild(fearuresElementsList.firstChild);
}

// создаем те которые есть в объявлении
for (var i = 0; i < firstAdvertisement.offer.features.length; i++) {
  var newFeatureElement = document.createElement("li");
  newFeatureElement.setAttribute('class', 'feature feature--' + firstAdvertisement.offer.features[i]);
  fearuresElementsList.appendChild(newFeatureElement);
}

advertisementArticle.querySelector('.popup__description').textContent = firstAdvertisement.offer.description;
advertisementArticle.querySelector('.popup__avatar').setAttribute('src', firstAdvertisement.author);

// вставляем перед блоком .map__filters-container объявление
var mapFiltersContainer = document.querySelector('.map__filters-container');
mapFiltersContainer.parentNode.insertBefore(advertisementArticle, mapFiltersContainer);

