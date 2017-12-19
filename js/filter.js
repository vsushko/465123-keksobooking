
'use strict';

(function () {

  // элемент с фильтрами
  var mapFilters = document.querySelector('.map__filters');
  // пины
  var mapPins = document.querySelector('.map__pins');

  // пины для фильтрации
  var filteringPins;

  // добавим обработчик который будет отлавливать изменения на панели фильтров
  mapFilters.addEventListener('change', function (event) {

    // проинициализируем пины для фильтрации
    filteringPins = Array.from(mapPins.children).slice(2);

    // объявления для фильтрации
    var advertisements = window.data.advertisements;

    filteringPins.filter(function (mapPin) {

      switch (event.target.id) {
        case 'housing-type':
          var selectedText = event.target.options[event.target.selectedIndex].text;
          var currentPinValue = window.card.HOUSE_TYPES_MAP[mapPin.data.offer.type];

          if (currentPinValue !== selectedText) {
            mapPin.classList.add('hidden');
          } else if (mapPin.classList.contains('hidden')) {
            mapPin.classList.remove('hidden');
          }
          break;
        case 'housing-price':
          break;
        case 'housing-rooms':
          break;
        case 'housing-guests':
          break;
        case 'housing-features':
          break;
        default:
          break;
      }
    });
  });


})();
