
'use strict';

(function () {
  var MAP_PIN_INDENT_X = 20;
  var MAP_PIN_INDENT_Y = 44;

  // найдем DOM-элемент пина
  var pinButton = document.querySelector('.map__pin');

  /**
   * Возвращает склонированную ноду кнопки с меткой
   * @param {Object} advertisement объявление
   * @return {Object} нода
   */
  var renderAdvertisementPin = function (advertisement) {
    var buttonElement = pinButton.cloneNode(true);

    buttonElement.setAttribute('style', 'left: ' + (advertisement.location.x + MAP_PIN_INDENT_X) + 'px; top: '
      + (advertisement.location.y + MAP_PIN_INDENT_Y) + 'px;');

    var buttonImgElement = buttonElement.querySelector('img');
    buttonImgElement.setAttribute('src', advertisement.author.avatar);
    buttonImgElement.setAttribute('alt', advertisement.offer.title);

    return buttonElement;
  };

  window.pin = {
    /**
     * Генерирует пины по переданному списку объявлений
     * @param {Array} advertisements объявления
     * @return {Object} buttonsFragment
     */
    generateAdvertisementPins: function (advertisements) {
      var buttonsFragment = document.createDocumentFragment();

      for (var i = 0; i < advertisements.length; i++) {
        buttonsFragment.appendChild(renderAdvertisementPin(advertisements[i]));
      }
      return buttonsFragment;
    }
  };
})();
