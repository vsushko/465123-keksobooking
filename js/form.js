
'use strict';

(function () {

  var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
  var HOUSE_TYPES = ['flat', 'house', 'bungalo', 'palace'];
  var HOUSE_TYPE_PRICES = ['1000', '0', '5000', '10000'];
  var APARTMENT_CAPACITY_VALUES = ['1', '2', '3', '0'];
  var ROOM_NUMBERS = ['1', '2', '3', '100'];

  var fieldSet = document.querySelector('.notice__form').querySelectorAll('fieldset');

  window.form = {
    /**
     * Делает поля активными в зависимости от переданного флага
     * @param {Boolean} deactivated флаг неактивности
     */
    setFieldSetInaccessibility: function (deactivated) {
      for (var i = 0; i < fieldSet.length; i++) {
        fieldSet[i].disabled = deactivated;
      }
    }
  };

  // изначально все поля недоступны
  window.form.setFieldSetInaccessibility(true);

  // синхронизация полей времени заезда и выезда
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  window.synchronizeFields(timeInSelect, timeOutSelect, CHECKIN_TIMES, CHECKOUT_TIMES, window.util.syncValues);
  window.synchronizeFields(timeOutSelect, timeInSelect, CHECKIN_TIMES, CHECKOUT_TIMES, window.util.syncValues);

  // оинхронизация типа жилья и минимальной цены
  var apartmentType = document.querySelector('#type');
  var pricePerNight = document.querySelector('#price');

  // односторонняя синхронизация значения первого поля с минимальным значением второго
  window.synchronizeFields(apartmentType, pricePerNight, HOUSE_TYPES, HOUSE_TYPE_PRICES, window.util.syncValueWithMin);

  // синхронизация поля кол-во Кол-во комнат с Количество мест
  var apartmentRoomsNumber = document.querySelector('#room_number');
  var apartmentCapacity = document.querySelector('#capacity');
  window.synchronizeFields(apartmentRoomsNumber, apartmentCapacity, ROOM_NUMBERS, APARTMENT_CAPACITY_VALUES, window.util.syncValues);
})();
