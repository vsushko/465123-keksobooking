
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
var HOUSE_TYPES_MAP = { 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало' };

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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
      'location': {
        'x': locationX,
        'y': locationY,
      }
    });
  }

  return generatedAdvertisements;
};

/**
 * Гененирует массив с ссылками на аватары  вида img/avatars/user{{xx}}.png,
 * где xx это число от 1 до 8 с ведущим нулем, аватары не повторяются
 * @param {Number} amountOfAdvertisements - кол-во объявлений
 * @return {Array} массив с ссылками на аватары
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
};

/**
 * Перемешивает массив случайным образом
 * @param {Array} array массив элементы которого нужно перемешать
 * @return {Array} перемешанный массив
 */
var shuffleArray = function (array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

/**
 * Возвращает адрес с изображением аватара пользователя
 * @param {Number} number номер пользователя
 * @return {String} адрес с изображением
 */
var getUserAvatarPath = function (number) {
  return 'img/avatars/user0' + number + '.png';
};

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
 * @return {Array} массив уникальных строк случайной длины
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
};

// сгеренируем объявления
var advertisements = generateSimilarAdvertisements(AMOUNT_OF_ADVERTISEMENTS);

// map__pin
var markButton = document.querySelector('.map__pin');

/**
 * Возвращает склонированную ноду кнопки с меткой
 * @param {Object} advertisement объявление
 * @return {Object} нода
 */
var renderAdvertisementPin = function (advertisement) {
  var buttonElement = markButton.cloneNode(true);

  buttonElement.setAttribute('style', 'left: ' + (advertisement.location.x + MAP_PIN_INDENT_X) + 'px; top: '
    + (advertisement.location.y + MAP_PIN_INDENT_Y) + 'px;');

  var buttonImgElement = buttonElement.querySelector('img');
  buttonImgElement.setAttribute('src', advertisement.author);

  return buttonElement;
};

// генерируем объекты с объявлениями
var buttonsFragment = document.createDocumentFragment();
for (var i = 0; i < advertisements.length; i++) {

  buttonsFragment.appendChild(renderAdvertisementPin(advertisements[i]));
}

// создадим DOM-элемент объявления на основе первого объявления
var advertisementPopup = document.querySelector('template').content.querySelector('.map__card').cloneNode(true);

/**
 * Заполняет popup на основе данных переданного объявления
 * @param {Object} advertisement объявление
 * @return {Object} popup
 */
var createAdvertisementPopup = function (advertisement) {

  if (advertisement) {
    // заполним поля данными из объявления
    advertisementPopup.querySelector('.popup__title').textContent = advertisement.offer.title;
    advertisementPopup.querySelector('.popup__address small').textContent = advertisement.offer.address;
    advertisementPopup.querySelector('.popup__price').textContent = advertisement.offer.price + '&#x20bd;/ночь';
    advertisementPopup.querySelector('.popup__house_type').textContent = HOUSE_TYPES_MAP[advertisement.offer.type];
    advertisementPopup.querySelector('.popup__rooms_guests').textContent = advertisement.offer.rooms + ' для ' + advertisement.offer.guests + ' гостей';
    advertisementPopup.querySelector('.popup__checkin_checkout').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;

    var fearuresElementsList = advertisementPopup.querySelector('.popup__features');

    // удаляем предзаполненные фичи из шаблона
    while (fearuresElementsList.firstChild) {
      fearuresElementsList.removeChild(fearuresElementsList.firstChild);
    }

    // создаем те которые есть в объявлении
    for (var j = 0; j < advertisement.offer.features.length; j++) {
      var newFeatureElement = document.createElement('li');
      newFeatureElement.setAttribute('class', 'feature feature--' + advertisement.offer.features[j]);
      fearuresElementsList.appendChild(newFeatureElement);
    }

    advertisementPopup.querySelector('.popup__description').textContent = advertisement.offer.description;
    advertisementPopup.querySelector('.popup__avatar').setAttribute('src', advertisement.author);
  }

  return advertisementPopup;
}

// все поля формы изначально должны быть недоступны
var fieldSet = document.querySelector('.notice__form').querySelectorAll('fieldset');

/**
 * Делает поля активными в зависимости от переданного флага
 * @param {Array} fieldSet список полей ввода
 * @param {Boolean} deactivated флаг неактивности
 */
var setFieldSetInaccessibility = function (fieldSet, deactivated) {
  for (var i = 0; i < fieldSet.length; i++) {
    fieldSet[i].disabled = deactivated;
  }
}

// изначально все поля недоступны
setFieldSetInaccessibility(fieldSet, true);

var mapPinButton = document.querySelector('.map__pin--main');

mapPinButton.addEventListener('mouseup', function () {

  // открываем карту
  document.querySelector('.map').classList.remove('map--faded');

  // элемент куда будем вставлять объявления
  var mapPinsContainer = document.querySelector('.map__pins');

  // удаляем предзаполненный элемент
  while (mapPinsContainer.firstChild) {
    mapPinsContainer.removeChild(mapPinsContainer.firstChild);
  }

  // вставляем сгенерированные
  mapPinsContainer.appendChild(buttonsFragment);

  // делаем форму активной
  document.querySelector('.notice__form').classList.remove('notice__form--disabled');

  // сделаем поля формы активными
  setFieldSetInaccessibility(fieldSet, false);

  mapPinsContainer.addEventListener('click', function () {
    openPopup(mapPinsContainer);
  });

  mapPinsContainer.addEventListener('keydown', function (event) {
    if (event.keyCode === ENTER_KEYCODE) {
      openPopup(mapPinsContainer);
    }
  });
});

var onPopupEscPress = function (event) {
  if (event.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function (mapPinsContainer) {
  var clickedPin = event.target;

  if (clickedPin) {
    // либо это клик мышкой по пину, либо нажали ENTER
    var pinImg = clickedPin.firstElementChild ? clickedPin.firstElementChild : clickedPin;

    if (pinImg && pinImg.nodeName === 'IMG') {
      var advertisement;

      // найдем объявление
      for (var n = 0; n < advertisements.length; n++) {
        if (pinImg.src.indexOf(advertisements[n].author) !== -1) {
          advertisement = advertisements[n];
        }
      }

      if (advertisement) {
        // создадим попап на основе переданного объявления
        var advertisementPopup = createAdvertisementPopup(advertisement);
        // достанем блок .map__filters-container перед которым будем вставлять объявление
        var mapFiltersContainer = document.querySelector('.map__filters-container');
        // вставим объявление
        mapFiltersContainer.parentNode.insertBefore(advertisementPopup, mapFiltersContainer);
      }
    }
  }

  // удалим map__pin--active у он был у кнопки
  for (var i = 0; i < mapPinsContainer.children.length; i++) {
    var pinsClasses = mapPinsContainer.children[i].classList;

    if (pinsClasses.contains('map__pin--active')) {
      pinsClasses.remove('map__pin--active')
    }
  }

  // добавим класс map__pin--active к кнопке
  event.target.parentNode.classList.add('map__pin--active');

  document.addEventListener('keydown', onPopupEscPress);

  if (advertisementPopup) {
    advertisementPopup.addEventListener('click', function () {
      closePopup(advertisementPopup);
    });

    advertisementPopup.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        closePopup(advertisementPopup);
      }
    });
  }
};

var closePopup = function (advertisementPopup) {
  //debugger
  if (advertisementPopup) {
    // удаляем ноду, если клик
    advertisementPopup.remove();
    document.removeEventListener('keydown', onPopupEscPress);
  } else {
    // var popup = document.querySelector('template').content.querySelector('.map__card');
    // popup.parentNode.removeChild(popup);
    advertisementPopup.remove();
  }
};
