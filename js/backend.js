'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

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

    xhr.open('GET', URL);
    xhr.send();
  };
})();
