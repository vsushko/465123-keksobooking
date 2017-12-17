
'use strict';

(function () {

  window.showCard = {
    /**
     * Показывает карточку выбранного жилья по нажатию на метку на карте
     * @param {Object} mapPinsContainer контейнер с кнопками
     */
    showCard: function (mapPinsContainer) {
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
    }
  };
})();
