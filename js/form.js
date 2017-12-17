
'use strict';

(function () {

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
  window.synchronizeFields(timeInSelect, timeOutSelect, window.data.CHECKIN_TIMES, window.data.CHECKOUT_TIMES, window.util.syncValues);
  window.synchronizeFields(timeOutSelect, timeInSelect, window.data.CHECKIN_TIMES, window.data.CHECKOUT_TIMES, window.util.syncValues);

  // оинхронизация типа жилья и минимальной цены
  var apartmentType = document.querySelector('#type');
  var pricePerNight = document.querySelector('#price');

  // односторонняя синхронизация значения первого поля с минимальным значением второго
  window.synchronizeFields(apartmentType, pricePerNight, window.data.HOUSE_TYPES, window.data.HOUSE_TYPE_PRICES, window.util.syncValueWithMin);

  // синхронизация поля кол-во Кол-во комнат с Количество мест
  var apartmentRoomsNumber = document.querySelector('#room_number');
  var apartmentCapacity = document.querySelector('#capacity');
  window.synchronizeFields(apartmentRoomsNumber, apartmentCapacity, window.data.ROOM_NUMBERS, window.data.APARTMENT_CAPACITY_VALUES, window.util.syncValues);
})();
