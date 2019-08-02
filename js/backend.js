'use strict';

(function () {
  var TIMEOUT = 10000;
  var Url = {
    LOAD: 'https://js.dump.academy/kekstagram/data',
    SAVE: 'https://js.dump.academy/kekstagram'
  };
  var Status = {
    STATUS_OK: 200,
    STATUS_INVALID_REQUEST: 400,
    STATUS_RESOURCE_IS_NOT_FOUND: 404,
    STATUS_SERVER_ERROR: 500
  };
  var xhr;

  function useServer(onLoad, onError) {
    xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      var errorMessage = '';
      switch (xhr.status) {
        case Status.STATUS_OK:
          onLoad(xhr.response);
          break;
        case Status.STATUS_INVALID_REQUEST:
          errorMessage = 'ОШИБКА! Неверный запрос! (400)';
          break;
        case Status.STATUS_RESOURCE_IS_NOT_FOUND:
          errorMessage = 'ОШИБКА! Ззапрашиваемый ресурс не найден! (404)';
          break;
        case Status.STATUS_SERVER_ERROR:
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
  }

  window.backend = {
    load: function (success, fail) {
      useServer(success, fail);
      xhr.open('GET', Url.LOAD);
      xhr.send();
    },
    save: function (success, fail, formData) {
      useServer(success, fail);
      xhr.open('POST', Url.SAVE);
      xhr.send(formData);
    }
  };
})();
