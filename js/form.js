
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

  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');

  timeInSelect.addEventListener('change', onChangeTimeInEvent);

  /**
   * Связывает «время заезда» и «время выезда»
   */
  function onChangeTimeInEvent() {
    timeOutSelect.value = timeInSelect.value;
  }

  timeOutSelect.addEventListener('change', onChangeTimeOutEvent);

  /**
   * Связывает «время выезда» и «время заезда»
   */
  function onChangeTimeOutEvent() {
    timeInSelect.value = timeOutSelect.value;
  }

  var apartmentType = document.querySelector('#type');
  var pricePerNight = document.querySelector('#price');
  apartmentType.addEventListener('change', onChangeApartmentTypeEvent);

  /**
   * Связывает Тип жилья с минимальной ценой
   */
  function onChangeApartmentTypeEvent() {
    switch (window.card.HOUSE_TYPES_MAP[apartmentType.value]) {
      case 'Лачуга':
        pricePerNight.min = 0;
        break;
      case 'Квартира':
        pricePerNight.min = 1000;
        break;
      case 'Дом':
        pricePerNight.min = 1000;
        break;
      case 'Дворец':
        pricePerNight.min = 10000;
        break;
      default:
        pricePerNight.min = 1000;
    }
  }

  var apartmentRoomsNumber = document.querySelector('#room_number');
  var apartmentCapacity = document.querySelector('#capacity');

  apartmentRoomsNumber.addEventListener('change', onChangeApartmentRoomsNumber);

  /**
   * Связывает кол-во комнат с кол-вом гостей
   */
  function onChangeApartmentRoomsNumber() {
    switch (parseInt(apartmentRoomsNumber.value, 10)) {
      case 1:
        apartmentCapacity.value = 1;
        break;
      case 2:
        apartmentCapacity.value = 2;
        break;
      case 3:
        apartmentCapacity.value = 3;
        break;
      case 100:
        apartmentCapacity.value = 0;
        break;
      default:
        break;
    }
  }
})();
