'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var SAVE_URL = 'https://js.dump.academy/kekstagram';
  var TIMEOUT = 10000;

  var loadData = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      var errorMessage = '';
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          errorMessage = 'ОШИБКА! Неверный запрос! (400)';
          break;
        case 404:
          errorMessage = 'ОШИБКА! Ззапрашиваемый ресурс не найден! (404)';
          break;
        case 500:
          errorMessage = 'ОШИБКА! На сервере произошла ошибка! (500)';
          break;
        default:
          errorMessage = 'ОШИБКА! Статус ошибки: ' + xhr.status;
      }
      if (errorMessage) {
        onError(errorMessage);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' секунд!');
    });

    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  var saveData = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      var errorMessage = '';
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 500:
          errorMessage = 'ОШИБКА! На сервере произошла ошибка! (500)';
          break;
        default:
          errorMessage = 'ОШИБКА! Статус ошибки: ' + xhr.status;
      }
      if (errorMessage) {
        onError(errorMessage);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' секунд!');
    });

    xhr.open('POST', SAVE_URL);
    xhr.send(data);
  };

  window.backend = {
    load: loadData,
    save: saveData
  };
})();
