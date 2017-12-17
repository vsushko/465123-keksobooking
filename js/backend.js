
'use strict';


backend.load = (function () {
  return function (onLoad, onError, callback) {
    if (typeof callback === 'function') {
      callback(onLoad, onError);
    }
  }
})();

backend.save = (function () {
  return function (data, onLoad, onError, callback) {
    if (typeof callback === 'function') {
      callback(onLoad, onError);
    }
  }
})();
