
'use strict';

(function () {

  var MAX_PINS_AMOUNT_TO_SHOW = 5;

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

  // кол-во видимых пинов
  var visiblePinsCount;

  // добавим обработчик который будет отлавливать изменения на панели фильтров
  mapFilters.addEventListener('change', function () {

    filteringPins = Array.from(mapPins.children);
    // отфильтруем пины чтобы остались только загруженные
    var usersPins = filteringPins.filter(window.util.isElementDataExist);
    // отфильтруем пины
    window.debounce(filterPins(usersPins));
    // закрываем popup
    window.closeCard.closePopup();
  });

  /**
   * Фильтрует пины
   * @param {Object} toFilteringPins пины для фильтрации
   */
  var filterPins = function (toFilteringPins) {
    visiblePinsCount = 0;

    toFilteringPins.filter(function (mapPin) {
      var filtered = false;

      // селектор типа жилья
      var housingTypeSelector = housingTypeSelect.options[housingTypeSelect.selectedIndex];
      var currentHousingType = window.card.houseTypeMap[mapPin.data.offer.type];
      var isAnyHousingTypeSelected = housingTypeSelector.value === 'any';

      if (currentHousingType !== housingTypeSelector.text && !(isAnyHousingTypeSelected)) {
        filtered = true;
      }

      // селектор цены
      var housingPriceSelectorValue = housingPriceSelect.options[housingPriceSelect.selectedIndex].value;
      var currentHousingPrice = mapPin.data.offer.price;
      var isAnyHousingPriceSelected = housingPriceSelectorValue === 'any';

      if (!isAnyHousingPriceSelected) {
        if (housingPriceSelectorValue === 'middle' && !(currentHousingPrice <= 50000 && currentHousingPrice >= 10000)) {
          filtered = true;
        } else if (housingPriceSelectorValue === 'low' && !(currentHousingPrice < 10000)) {
          filtered = true;
        } else if (housingPriceSelectorValue === 'high' && !(currentHousingPrice > 50000)) {
          filtered = true;
        }
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
      var featuresCheckboxes = housingFeatures.querySelectorAll('input[type=checkbox]');

      for (var i = 0; i < featuresCheckboxes.length; i++) {
        var featureCheckbox = featuresCheckboxes[i];
        if (featureCheckbox.checked && !(mapPin.data.offer.features.indexOf(featureCheckbox.value) > -1)) {
          filtered = true;
        }
      }

      if (filtered || visiblePinsCount >= MAX_PINS_AMOUNT_TO_SHOW - 1) {
        mapPin.classList.add('hidden');
      } else if (visiblePinsCount < MAX_PINS_AMOUNT_TO_SHOW) {
        visiblePinsCount++;
        mapPin.classList.remove('hidden');
      }
    });
  };
})();
