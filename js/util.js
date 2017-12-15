
'use strict';

(function () {
  window.util = {
    /**
     * Перемешивает массив случайным образом
     * @param {Array} array массив элементы которого нужно перемешать
     * @return {Array} перемешанный массив
     */
    shuffleArray: function (array) {
      var currentIndex = array.length;
      var temporaryValue;
      var randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    },
    /**
    * Возвращает случайное число в указанном интервале
    * @param {Number} min минимальное число
    * @param {Number} max максимальное числа
    * @return {Number} случайное значение
    */
    getRandomIntInclusive: function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    /**
     * Возвращает массив строк случайного размера который не больше размера переданного из уникальных значений переданного
     * @param {Array} arrayWithStrings массив строк
     * @return {Array} массив уникальных строк случайной длины
     */
    getRandomizedArrayWithVariableLength: function (arrayWithStrings) {
      var arrayWithRandomSize = [];
      var randomArraySize = this.getRandomIntInclusive(1, arrayWithStrings.length - 1);

      while (arrayWithRandomSize.length < randomArraySize) {
        var randomNumber = Math.floor(Math.random() * arrayWithStrings.length - 1) + 1;
        var arrayWithStringsValue = arrayWithStrings[randomNumber];

        if (arrayWithRandomSize.indexOf(arrayWithStringsValue) > -1) {
          continue;
        }
        arrayWithRandomSize.push(arrayWithStringsValue);
      }
      return arrayWithRandomSize;
    },
    /**
     * Удаляет у элементов контейнера указанные классы
     * @param {Array} elementWithClasses контейнер с объектами у которых нужно удалить класс
     * @param {String} classToRemove имя класса
     */
    removeContainerElementsClassesByName: function (elementWithClasses, classToRemove) {
      for (var i = 0; i < elementWithClasses.length; i++) {
        var pinsClasses = elementWithClasses[i].classList;

        if (pinsClasses.contains(classToRemove)) {
          pinsClasses.remove(classToRemove);
        }
      }
    }
  };
})();

