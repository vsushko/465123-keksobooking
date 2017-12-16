
'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// найдем DOM-элемент пина
var pinButton = document.querySelector('.map__pin');

// сгеренируем данные для пинов
window.pin.advertisements = window.data.generateSimilarAdvertisements();
// сгенерируем пины на основе существующего
var pinButtonsFragment = window.pin.generateAdvertisementPins(pinButton);

var mapPinButton = document.querySelector('.map__pin--main');

mapPinButton.addEventListener('mouseup', function () {

  // открываем карту
  document.querySelector('.map').classList.remove('map--faded');

  // элемент куда будем вставлять объявления
  var mapPinsContainer = document.querySelector('.map__pins');

  // вставляем сгенерированные
  mapPinsContainer.appendChild(pinButtonsFragment);

  // делаем форму активной
  document.querySelector('.notice__form').classList.remove('notice__form--disabled');

  // сделаем поля формы активными
  window.form.setFieldSetInaccessibility(false);

  mapPinsContainer.addEventListener('click', function () {
    openPopup(mapPinsContainer);
  });

  mapPinsContainer.addEventListener('keydown', function (event) {
    if (event.keyCode === ENTER_KEYCODE) {
      openPopup(mapPinsContainer);
    }
  });
});

/**
 * Обработчик закрытия попапа
 * @param {Event} event событие
 */
var onPopupEscPress = function (event) {
  if (event.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

/**
 * Обработчик открытия попапа
 * @param {Object} mapPinsContainer контейнер с кнопками
 */
var openPopup = function (mapPinsContainer) {
  var clickedPin = event.target;
  var currentAdvertisementPopup;
  var generatedAdvertisements = window.pin.advertisements;

  if (clickedPin) {
    // либо это клик мышкой по пину, либо нажали ENTER
    var pinImg = clickedPin.firstElementChild ? clickedPin.firstElementChild : clickedPin;

    if (pinImg && pinImg.nodeName === 'IMG') {
      var advertisement;

      // удалим map__pin--active у он был у кнопки
      window.util.removeContainerElementsClassesByName(mapPinsContainer.children, 'map__pin--active');

      var parentNode = event.target.parentNode;
      // добавим класс map__pin--active к кнопке
      // обрабатываем только вариант нажатия на изображение
      if (parentNode.className !== 'map__pins') {
        parentNode.classList.add('map__pin--active');
      }

      // найдем объявление
      for (var i = 0; i < generatedAdvertisements.length; i++) {
        if (pinImg.src.indexOf(generatedAdvertisements[i].author) !== -1) {
          advertisement = generatedAdvertisements[i];
        }
      }

      if (advertisement) {
        // создадим попап на основе переданного объявления
        currentAdvertisementPopup = window.card.createAdvertisementPopup(advertisement);
        // достанем блок .map__filters-container перед которым будем вставлять объявление
        var mapFiltersContainer = document.querySelector('.map__filters-container');
        // вставим объявление
        mapFiltersContainer.parentNode.insertBefore(currentAdvertisementPopup, mapFiltersContainer);
      }
    }
  }

  document.addEventListener('keydown', onPopupEscPress);

  if (currentAdvertisementPopup) {
    var closePopupButton = document.querySelector('.popup__close');
    closePopupButton.addEventListener('click', function () {
      closePopup(currentAdvertisementPopup);
    });

    currentAdvertisementPopup.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        closePopup(currentAdvertisementPopup);
      }
    });
  }
};

/**
 * Удаляет попап из DOM
 * @param {Object} toClosePopup попап для удаления
 */
var closePopup = function (toClosePopup) {
  if (toClosePopup) {
    // удаляем ноду, если клик
    toClosePopup.remove();
    document.removeEventListener('keydown', onPopupEscPress);
  } else {
    // обрабатываем esc
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  }
};

// добавим обработку события перетаскивания
mapPinButton.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  /**
   * При каждом движении мыши обновляем смещение относительно первоначальной точки
   * чтобы диалог смещался на необходимую величину
   * @param {Event} moveEvt
   */
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var newCoordYValue = mapPinButton.offsetTop - shift.y;
    var newCoordXValue = mapPinButton.offsetLeft - shift.x;

    if (newCoordXValue >= 40 && newCoordXValue <= 1160 && newCoordYValue >= 100 && newCoordYValue <= 500) {
      mapPinButton.style.top = newCoordYValue + 'px';
      mapPinButton.style.left = newCoordXValue + 'px';

      var addressField = document.getElementById('address');
      addressField.value = 'x: ' + parseInt(mapPinButton.style.left + 20, 10) + ', y: ' + parseInt(mapPinButton.style.top + 44, 10);
    }
  };

  /**
   * Обрабатывает опускание кнопки мыши
   * @param {Event} upEvt
   */
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
