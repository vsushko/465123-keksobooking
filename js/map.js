
'use strict';

var ENTER_KEYCODE = 13;
var INITIAL_PINS_COUNT = 1;

var mapPinButton = document.querySelector('.map__pin--main');

mapPinButton.addEventListener('mouseup', function () {
  // открываем карту
  document.querySelector('.map').classList.remove('map--faded');

  // элемент куда будем вставлять объявления
  var mapPinsContainer = document.querySelector('.map__pins');

  var generatedPinsCount = mapPinsContainer.querySelectorAll('.map__pin').length;

  if (generatedPinsCount <= INITIAL_PINS_COUNT) {
    // сгенерируем пины на основе существующего
    var pinButtonsFragment = window.pin.generateAdvertisementPins(window.data.advertisements);

    // вставляем сгенерированные
    mapPinsContainer.appendChild(pinButtonsFragment);

    // делаем форму активной
    document.querySelector('.notice__form').classList.remove('notice__form--disabled');

    // сделаем поля формы активными
    window.form.setFieldSetInaccessibility(false);

    mapPinsContainer.addEventListener('click', function () {
      window.showCard.showCard(window.data.advertisements, mapPinsContainer);
    });

    mapPinsContainer.addEventListener('keydown', function (event) {
      if (event.keyCode === ENTER_KEYCODE) {
        window.showCard.showCard(window.data.advertisements, mapPinsContainer);
      }
    });
  }
});

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
      addressField.value = 'x: ' + parseInt(mapPinButton.style.left + window.pin.MAP_PIN_INDENT_X, 10)
        + ', y: ' + parseInt(mapPinButton.style.top + window.pin.MAP_PIN_INDENT_Y, 10);
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
