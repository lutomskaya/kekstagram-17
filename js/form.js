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

    document.removeEventListener('keydown', onPopupEscPress);
  };

  textDescription.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  uploadFile.addEventListener('change', openPopup);

  uploadClose.addEventListener('click', closePopup);


  uploadClose.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, closePopup);
  });

  var successBlock = function () {
    var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success').cloneNode(true);
    document.querySelector('main').appendChild(successTemplate);
    var success = document.querySelector('.success');

    var successButton = document.querySelector('.success__button');
    successButton.addEventListener('click', function () {
      success.classList.add('visually-hidden');

    });

    var whereClick = function (evt) {
      var target = evt.target;
      if (target.className === success.className) {
        success.classList.add('visually-hidden');
      }
    };

    success.addEventListener('click', whereClick);
  };

  var errorBlock = function () {
    if (!document.querySelector('.error')) {
      var errorTemplate = document.querySelector('#error')
      .content.
      querySelector('.error').cloneNode(true);
      document.querySelector('main').appendChild(errorTemplate);
      var error = document.querySelector('.error');

      var errorButtons = document.querySelectorAll('.error__button');
      errorButtons.forEach(function (it) {
        it.addEventListener('click', function () {
          error.classList.add('visually-hidden');
        });
      });

      var whereClick = function (evt) {
        var target = evt.target;
        if (target.className === error.className) {
          error.classList.add('visually-hidden');
        }
      };

      error.addEventListener('click', whereClick);
    } else {
      document.querySelector('.error').classList.remove('visually-hidden');
    }
  };

  imgUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(imgUploadForm), successBlock, errorBlock);
    closePopup();
  });
})();
