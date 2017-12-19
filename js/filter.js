
'use strict';

(function () {

  // ms
  var DEBOUNCE_INTERVAL = 300;

  // элемент с фильтрами
  var mapFilters = document.querySelector('.map__filters');
  // пины
  var mapPins = document.querySelector('.map__pins');
  // элементы для фильтрации
  var housingTypeSelect = document.querySelector('#housing-type');
  var housingPriceSelect = document.querySelector('#housing-price');
  var housingRoomsSelect = document.querySelector('#housing-rooms');
  var housingGuestsSelect = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');

  // пины для фильтрации
  var filteringPins;

  // добавим обработчик который будет отлавливать изменения на панели фильтров
  mapFilters.addEventListener('change', function (event) {

    // проинициализируем пины для фильтрации
    filteringPins = Array.from(mapPins.children).slice(2);

    window.debounce(function () {
      filteringPins.filter(function (mapPin) {
        if (mapPin.classList.contains('hidden')) {
          mapPin.classList.remove('hidden');
        }

        var filtered = false;

        // селектор типа жилья
        var housingTypeSelector = housingTypeSelect.options[housingTypeSelect.selectedIndex];
        var currentHousingType = window.card.HOUSE_TYPES_MAP[mapPin.data.offer.type];
        var isAnyHousingTypeSelected = housingTypeSelector.value === 'any';

        if (currentHousingType !== housingTypeSelector.text && !(isAnyHousingTypeSelected)) {
          filtered = true;
        }

        // селектор цены
        var housingPriceSelectorValue = housingPriceSelect.options[housingPriceSelect.selectedIndex].value;
        var currentHousingPrice = mapPin.data.offer.price;

        if (housingPriceSelectorValue === 'middle' && !(currentHousingPrice <= 50000 && currentHousingPrice >= 10000)) {
          filtered = true;
        } else if (housingPriceSelectorValue === 'low' && !(currentHousingPrice < 10000)) {
          filtered = true;
        } else if (housingPriceSelectorValue === 'high' && !(currentHousingPrice > 50000)) {
          filtered = true;
        } else if (!filtered && !(housingPriceSelectorValue === 'any')) {
          filtered = false;
          mapPin.classList.remove('hidden');
        }

        // селектор числа комнат
        var housingRoomsSelectorValue = housingRoomsSelect.options[housingRoomsSelect.selectedIndex].value;
        var currentHousingRooms = mapPin.data.offer.rooms;
        var isAnyRoomsSelected = housingRoomsSelectorValue === 'any';

        if (parseInt(housingRoomsSelectorValue, 10) !== currentHousingRooms && !(isAnyRoomsSelected)) {
          filtered = true;
        }

        // селектор числа гостей
        var housingGuestsSelectorValue = housingGuestsSelect.options[housingGuestsSelect.selectedIndex].value;
        var currentHousingGuests = mapPin.data.offer.guests;
        var isAnyGuestsSelected = housingGuestsSelectorValue === 'any';

        if (parseInt(housingGuestsSelectorValue, 10) !== currentHousingGuests && !(isAnyGuestsSelected)) {
          filtered = true;
        }

        // чекбоксы фич
        var featuresCheckboxes = housingFeatures.querySelectorAll("input[type=checkbox]");

        for (var i = 0; i < featuresCheckboxes.length; i++) {
          var featureCheckbox = featuresCheckboxes[i];
          if (featureCheckbox.checked && !(mapPin.data.offer.features.indexOf(featureCheckbox.value) > -1)) {
            filtered = true;
          }
        }

        if (filtered) {
          mapPin.classList.add('hidden');
        } else {
          mapPin.classList.remove('hidden');
        }

        window.closeCard.closePopup();
      });
    });
  });
})();
