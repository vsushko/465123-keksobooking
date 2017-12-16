
'use strict';

(function () {
  var MAP_PIN_INDENT_X = 20;
  var MAP_PIN_INDENT_Y = 44;

  /**
   * Возвращает склонированную ноду кнопки с меткой
   * @param {Object} pinButton DOM-элемент пина для содания других пинов
   * @param {Object} advertisement объявление
   * @return {Object} нода
   */
  var renderAdvertisementPin = function (pinButton, advertisement) {
    var buttonElement = pinButton.cloneNode(true);

    buttonElement.setAttribute('style', 'left: ' + (advertisement.location.x + MAP_PIN_INDENT_X) + 'px; top: '
      + (advertisement.location.y + MAP_PIN_INDENT_Y) + 'px;');

    var buttonImgElement = buttonElement.querySelector('img');
    buttonImgElement.setAttribute('src', advertisement.author);

    return buttonElement;
  };

  window.pin = {
    /**
     * Генерирует пины по переданному списку объявлений
     * @param {Object} pinButton DOM-элемент пина для содания других пинов
     * @return {Object} buttonsFragment
     */
    generateAdvertisementPins: function (pinButton) {
      var buttonsFragment = document.createDocumentFragment();

      for (var i = 0; i < this.advertisements.length; i++) {
        buttonsFragment.appendChild(renderAdvertisementPin(pinButton, this.advertisements[i]));
      }
      return buttonsFragment;
    }
  };

})();
