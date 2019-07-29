'use strict';

(function () {
  var DEFAULT_FILTER_VALUE = 100;
  var MAX_HASHTAGS = 5;
  var MAX_HASHTAG_SIZE = 20;
  var MIN_HASHTAG_SIZE = 2;
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadClose = document.querySelector('.img-upload__cancel');
  var scaleInput = document.querySelector('.scale__control--value');
  var effectLevel = document.querySelector('.effect-level');
  var effectsRadioElements = document.querySelectorAll('.effects__radio');
  var textDescription = document.querySelector('.text__description');
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var img = document.querySelector('img');
  var textHashtags = document.querySelector('.text__hashtags');
  var imgUploadForm = document.querySelector('.img-upload__form');
  var mainElement = document.querySelector('main');
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var checkHashtag = function () {
    var hashtagsArr = textHashtags.value.split(' ');
    textHashtags.addEventListener('input', function () {
      textHashtags.setCustomValidity('');
    });
    if (hashtagsArr.length > MAX_HASHTAGS) {
      onHashtagsError();
      return 'Нельзя указать больше ' + MAX_HASHTAGS + ' тегов';
    }
    for (var i = 0; i < hashtagsArr.length; i++) {
      if (hashtagsArr[i] === '#') {
        onHashtagsError();
        return 'Хэштег не может состоять из одной решетки';
      } else if (hashtagsArr[i].length === MIN_HASHTAG_SIZE) {
        onHashtagsError();
        return 'Хэштег не может состоять из одной буквы';
      } else if (hashtagsArr[i].charAt(0) !== '#') {
        onHashtagsError();
        return 'Хэштег должен начинаться с символа #';
      } else if (hashtagsArr[i].length > MAX_HASHTAG_SIZE) {
        onHashtagsError();
        return 'Максимальная длина одного хэштега ' + MAX_HASHTAG_SIZE + ' символов, включая решётку';
      } else if (hashtagsArr[i].indexOf('#', 1) !== -1) {
        onHashtagsError();
        return 'Хэштеги должны разделяться пробелом';
      }
    }
    return '';
  };

  var hashtagsError = function (errorMessage, field) {
    if (errorMessage) {
      field.style.outline = '2px solid red';
      field.setCustomValidity(errorMessage);
    }
  };

  var onHashtagsError = function () {
    event.preventDefault();
  };

  var submitValidate = function () {
    hashtagsError(checkHashtag(), textHashtags);
  };

  imgUploadForm.addEventListener('submit', submitValidate);

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    uploadOverlay.classList.remove('hidden');

    effectsRadioElements[0].checked = true;
    scaleInput.value = DEFAULT_FILTER_VALUE;
    img.className = '';
    img.style.filter = 'none';
    effectLevel.classList.add('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    uploadOverlay.classList.add('hidden');

    uploadFile.value = '';
    imgUploadPreview.style.transform = '';
    imgUploadPreview.style.filter = '';
    img.className = '';
    imgUploadForm.reset();

    document.removeEventListener('keydown', onPopupEscPress);
  };

  textDescription.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  uploadFile.addEventListener('change', function () {
    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        img.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  uploadFile.addEventListener('change', openPopup);

  uploadClose.addEventListener('click', closePopup);


  uploadClose.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, closePopup);
  });

  var onSuccessMessage = function () {
    var element = successTemplate.cloneNode(true);
    mainElement.appendChild(element);
    var successButton = element.querySelector('.success__button');
    var successInner = element.querySelector('.success__inner');

    var onMessageRemove = function () {
      element.remove();
    };

    successButton.addEventListener('click', onMessageRemove);

    var onSuccessClick = function (evt) {
      if (evt.target !== successInner && !successInner.contains(evt.target)) {
        onMessageRemove();
        document.removeEventListener('click', onSuccessClick);
      }
    };

    var onSuccessEscPress = function (evt) {
      window.util.isEscEvent(evt, function () {
        onMessageRemove();
        document.removeEventListener('keydown', onSuccessEscPress);
      });
    };

    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', onSuccessClick);

    closePopup();
  };

  var onErrorMessage = function () {
    var element = errorTemplate.cloneNode(true);
    mainElement.appendChild(element);
    var errorButton = element.querySelectorAll('.error__button');
    var errorInner = element.querySelector('.error__inner');

    var onErrorRemove = function () {
      element.remove();
    };

    var onErrorClick = function (evt) {
      if (evt.target !== errorInner && !errorInner.contains(evt.target)) {
        onErrorRemove();
        document.removeEventListener('click', onErrorClick);
      }
    };

    var onErrorEscPress = function (evt) {
      window.util.isEscEvent(evt, function () {
        onErrorRemove();
        document.removeEventListener('keydown', onErrorEscPress);
      });
    };

    errorButton.forEach(function (button) {
      button.addEventListener('click', onErrorRemove);
    });

    document.addEventListener('keydown', onErrorEscPress);
    document.addEventListener('click', onErrorClick);

    closePopup();
  };

  imgUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var data = new FormData(imgUploadForm);
    window.backend.save(data, onSuccessMessage, onErrorMessage);
  });
})();
