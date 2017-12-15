
'use strict';

(function () {
  // создадим DOM-элемент объявления на основе существующего
  var advertisementPopup = document.querySelector('template').content.querySelector('.map__card').cloneNode(true);

  window.card = {
    /**
     * Заполняет popup на основе данных переданного объявления
     * @param {Object} advertisement объявление
     * @return {Object} popup
     */
    createAdvertisementPopup: function (advertisement) {
      if (advertisement) {
        // заполним поля данными из объявления
        setElementTextContent('.popup__title', advertisement.offer.title);
        setElementTextContent('.popup__address small', advertisement.offer.address);
        setElementTextContent('.popup__price', advertisement.offer.price + '\u20bd/ночь');
        setElementTextContent('.popup__house_type', HOUSE_TYPES_MAP[advertisement.offer.type]);
        setElementTextContent('.popup__rooms_guests', advertisement.offer.rooms + ' для ' + advertisement.offer.guests + ' гостей');
        setElementTextContent('.popup__checkin_checkout', 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout);

        var fearuresElementsList = advertisementPopup.querySelector('.popup__features');

        // удаляем предзаполненные фичи из шаблона
        while (fearuresElementsList.firstChild) {
          fearuresElementsList.removeChild(fearuresElementsList.firstChild);
        }

        // создаем те которые есть в объявлении
        for (var i = 0; i < advertisement.offer.features.length; i++) {
          var newFeatureElement = document.createElement('li');
          newFeatureElement.setAttribute('class', 'feature feature--' + advertisement.offer.features[i]);
          fearuresElementsList.appendChild(newFeatureElement);
        }

        setElementTextContent('.popup__description', advertisement.offer.description);
        advertisementPopup.querySelector('.popup__avatar').setAttribute('src', advertisement.author);
      }
      return advertisementPopup;
    }
  }

  /**
   * Устанавливает элементу указанное значение
   * @param {Object} element
   * @param {Object} elementValue
   */
  var setElementTextContent = function (element, elementValue) {
    advertisementPopup.querySelector(element).textContent = elementValue;
  };
})();
