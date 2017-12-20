
'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  /**
 * Обработчик закрытия попапа
 * @param {Event} event событие
 */
  var onPopupEscPress = function (event) {
    if (event.keyCode === ESC_KEYCODE) {
      window.showCard.closePopup(false);
    }
  };

  window.showCard = {
    /**
     * Показывает карточку выбранного жилья по нажатию на метку на карте
     * @param {Array} advertisements объявления
     * @param {Object} mapPinsContainer контейнер с кнопками
     */
    showCard: function (advertisements, mapPinsContainer) {
      var clickedPin = event.target;
      var currentAdvertisementPopup;

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
          for (var i = 0; i < advertisements.length; i++) {
            if (pinImg.alt.indexOf(advertisements[i].offer.title) !== -1) {
              advertisement = advertisements[i];
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
          window.showCard.closePopup(currentAdvertisementPopup);
        });

        currentAdvertisementPopup.addEventListener('keydown', function (evt) {
          if (evt.keyCode === ENTER_KEYCODE) {
            window.showCard.closePopup(currentAdvertisementPopup);
          }
        });
      }
    },
    /**
     * Удаляет попап из DOM
     * @param {Object} toClosePopup попап для удаления
     */
    closePopup: function (toClosePopup) {
      if (toClosePopup) {
        // удаляем ноду, если клик
        toClosePopup.remove();
        document.removeEventListener('keydown', onPopupEscPress);
      } else {
        // обрабатываем esc
        var mapCard = document.querySelector('.map__card');
        if (mapCard) {
          mapCard.remove();
          document.removeEventListener('keydown', onPopupEscPress);
        }
      }
    }
  };
})();
