
'use strict';

(function () {

  var MAX_PINS_AMOUNT_TO_SHOW = 5;

  // найдем DOM-элемент пина
  var pinButton = document.querySelector('.map__pin');

  /**
   * Возвращает склонированную ноду кнопки с меткой
   * @param {Object} advertisement объявление
   * @return {Object} нода
   */
  var renderAdvertisementPin = function (advertisement) {
    var buttonElement = pinButton.cloneNode(true);

    buttonElement.setAttribute('style', 'left: ' + (advertisement.location.x + window.pin.MAP_PIN_INDENT_X) + 'px; top: '
      + (advertisement.location.y + window.pin.MAP_PIN_INDENT_Y) + 'px;');

    var buttonImgElement = buttonElement.querySelector('img');
    buttonImgElement.setAttribute('src', advertisement.author.avatar);
    buttonImgElement.setAttribute('alt', advertisement.offer.title);

    // добавим данные о объявлени в ноду пина
    buttonElement.data = advertisement;
    // установим кликабельный курсор
    buttonElement.style.cursor = 'pointer';

    return buttonElement;
  };

  window.pin = {
    MAP_PIN_INDENT_X: 20,
    MAP_PIN_INDENT_Y: 44,
    /**
     * Генерирует пины по переданному списку объявлений
     * @param {Array} advertisements объявления
     * @return {Object} buttonsFragment
     */
    generateAdvertisementPins: function (advertisements) {
      var buttonsFragment = document.createDocumentFragment();

      for (var i = 0; i < advertisements.length; i++) {
        var generatedAdvertisement = renderAdvertisementPin(advertisements[i]);
        // показываем не больше доступного числа пинов
        if (i >= MAX_PINS_AMOUNT_TO_SHOW - 1) {
          generatedAdvertisement.classList.add('hidden');
        }
        buttonsFragment.appendChild(generatedAdvertisement);
      }
      return buttonsFragment;
    }
  };
})();
