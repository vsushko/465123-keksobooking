
'use strict';

(function () {
  /**
  * Обработка неуспешного выполнения запроса
  * @param {String} message сообщение об ошибке
  */
  var onError = function (message) {
    console.error(message);
  };

  /**
   * Обработка успешного выполнения запроса
   * @param {Object} data набор полученных данных
   */
  var onLoad = function (data) {
    console.log(data);
    window.data = {
      advertisements: data
    }
  };

  // получим данные с сервера
  window.backend.load(onLoad, onError);
})();

