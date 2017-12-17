
'use strict';

(function () {
  var AMOUNT_OF_ADVERTISEMENTS = 8;
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
    'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  window.data = {
    CHECKIN_TIMES: ['12:00', '13:00', '14:00'],
    CHECKOUT_TIMES: ['12:00', '13:00', '14:00'],
    HOUSE_TYPES: ['flat', 'house', 'bungalo', 'palace'],
    ROOM_NUMBERS: ['1', '2', '3', '100'],
    HOUSE_TYPE_PRICES: ['1000', '0', '5000', '10000'],
    APARTMENT_CAPACITY_VALUES: ['1', '2', '3', '0'],
    /**
     * Генерирует уникальные объявления
     * @return {Array} массив с уникальными объявлениями
     */
    generateSimilarAdvertisements: function () {
      var generatedAdvertisements = [];
      var avatars = getUserAvatarAddresses(AMOUNT_OF_ADVERTISEMENTS);
      var titles = window.util.shuffleArray(TITLES);

      for (var i = 0; i < AMOUNT_OF_ADVERTISEMENTS; i++) {
        var locationX = window.util.getRandomIntInclusive(299, 901);
        var locationY = window.util.getRandomIntInclusive(99, 501);

        generatedAdvertisements.push({
          'author': avatars[i],
          'offer': {
            'title': titles[i],
            'address': locationX + ', ' + locationY,
            'price': window.util.getRandomIntInclusive(999, 1000001),
            'type': this.HOUSE_TYPES[window.util.getRandomIntInclusive(0, this.HOUSE_TYPES.length - 1)],
            'rooms': window.util.getRandomIntInclusive(0, 6),
            'guests': window.util.getRandomIntInclusive(0, 6),
            'checkin': this.CHECKIN_TIMES[window.util.getRandomIntInclusive(0, this.CHECKIN_TIMES.length - 1)],
            'checkout': this.CHECKOUT_TIMES[window.util.getRandomIntInclusive(0, this.CHECKOUT_TIMES.length - 1)],
            'features': window.util.getRandomizedArrayWithVariableLength(FEATURES),
            'description': '',
            'photos': []
          },
          'location': {
            'x': locationX,
            'y': locationY,
          }
        });
      }
      return generatedAdvertisements;
    }
  };

  /**
   * Гененирует массив с ссылками на аватары  вида img/avatars/user{{xx}}.png,
   * где xx это число от 1 до 8 с ведущим нулем, аватары не повторяются
   * @param {Number} amountOfAdvertisements - кол-во объявлений
   * @return {Array} массив с ссылками на аватары
   */
  var getUserAvatarAddresses = function (amountOfAdvertisements) {
    var randomImages = [];

    while (randomImages.length < amountOfAdvertisements) {
      var randomNumber = Math.floor(Math.random() * amountOfAdvertisements) + 1;
      var path = getUserAvatarPath(randomNumber);

      if (randomImages.indexOf(path) > -1) {
        continue;
      }
      randomImages[randomImages.length] = path;
    }
    return randomImages;
  };

  /**
   * Возвращает адрес с изображением аватара пользователя
   * @param {Number} number номер пользователя
   * @return {String} адрес с изображением
   */
  var getUserAvatarPath = function (number) {
    return 'img/avatars/user0' + number + '.png';
  };
})();

