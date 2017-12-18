
'use strict';

(function () {
  window.util = {
    /**
     * Перемешивает массив случайным образом
     * @param {Array} arrayWithElements массив элементы которого нужно перемешать
     * @return {Array} перемешанный массив
     */
    shuffleArray: function (arrayWithElements) {
      var currentIndex = arrayWithElements.length;
      var temporaryValue;
      var randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = arrayWithElements[currentIndex];
        arrayWithElements[currentIndex] = arrayWithElements[randomIndex];
        arrayWithElements[randomIndex] = temporaryValue;
      }
      return arrayWithElements;
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
    },
    /**
     * Устанавливает элементу указанное значение
     * @param {Object} element элемент кторому нужно установить значение
     * @param {Object} value значение
     */
    syncValues: function (element, value) {
      element.value = value;
    },
    /**
     * Устанавливает минимальному элементу указанное значение
     * @param {Object} element элемент кторому нужно установить значение
     * @param {Object} value значение
     */
    syncValueWithMin: function (element, value) {
      element.min = value;
    },

    /**
     * Удаляет первые элеметы у указанного элемента
     * @param {Object} elementWithChilds список элементов
     */
    removeFirstChilds: function(elementWithChilds) {
      while (elementWithChilds.firstChild) {
        elementWithChilds.removeChild(elementWithChilds.firstChild);
      }
    },

    /**
     * Добавляет в дом элемент с указанным сообщением об ошибке
     * @param {String} errorMessage сообщение
     */
    onError: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; font-weight: bold; text-align: center; border-top-right-radius: 0; border-top-left-radius: 0; box-shadow: 0 5px 20px -8px rgba(0, 0, 0, 0.5); border: 1px solid transparent; border-radius: 4px; color: #c09853; background-color: #fcf8e3; border-color: #fbeed5;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '14px';

      node.textContent = 'Произошла ошибка: ' + errorMessage + '. Попробуйте еще раз.';
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();

