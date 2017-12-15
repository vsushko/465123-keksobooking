
'use strict';

(function () {
  var AMOUNT_OF_ADVERTISEMENTS = 8;

  var MAP_PIN_INDENT_X = 20;
  var MAP_PIN_INDENT_Y = 44;

  // пин пользователя
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

  window.pin = {
    advertisements: window.data.generateSimilarAdvertisements(AMOUNT_OF_ADVERTISEMENTS),
    /**
     * Генерирует пины по переданному списку объявлений
     * @return {Object} buttonsFragment
     */
    generateAdvertisementPins: function () {
      var buttonsFragment = document.createDocumentFragment();

      for (var i = 0; i < this.advertisements.length; i++) {
        buttonsFragment.appendChild(renderAdvertisementPin(this.advertisements[i]));
      }
      return buttonsFragment;
    }
  }

})();
