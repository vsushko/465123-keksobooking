
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
  window.synchronizeFields(timeInSelect, timeOutSelect, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], window.util.syncValues);
  window.synchronizeFields(timeOutSelect, timeInSelect, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], window.util.syncValues);

  // оинхронизация типа жилья и минимальной цены
  var apartmentType = document.querySelector('#type');
  var pricePerNight = document.querySelector('#price');

  // односторонняя синхронизация значения первого поля с минимальным значением второго
  window.synchronizeFields(apartmentType, pricePerNight, ['flat', 'bungalo', 'house', 'palace'], ['1000', '0', '5000', '10000'], window.util.syncValueWithMin);

  // синхронизация поля кол-во Кол-во комнат с Количество мест
  var apartmentRoomsNumber = document.querySelector('#room_number');
  var apartmentCapacity = document.querySelector('#capacity');
  window.synchronizeFields(apartmentRoomsNumber, apartmentCapacity, ['1', '2', '3', '100'], ['1', '2', '3', '0'], window.util.syncValues);
})();
