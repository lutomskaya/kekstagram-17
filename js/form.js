'use strict';

(function () {
  var DEFAULT_FILTER_VALUE = 100;
  var MAX_HASHTAGS = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadClose = document.querySelector('.img-upload__cancel');
  var scaleInput = document.querySelector('.scale__control--value');
  var effectLevel = document.querySelector('.effect-level');
  var effectRadioElement = document.querySelectorAll('.effects__radio');
  var textDescription = document.querySelector('.text__description');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var img = document.querySelector('img');
  var textHashtag = document.querySelector('.text__hashtags');
  var imgUploadForm = document.querySelector('.img-upload__form');
  var mainElement = document.querySelector('main');
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  function onHashtagInput(evt) {
    var hashArr = textHashtag.value.trim().replace(/\s+/g, ' ').split(' ');
    var target = evt.target;
    if (checkHashtag(hashArr, target)) {
      target.setCustomValidity(checkHashtag(hashArr, target));
    } else {
      target.setCustomValidity('');
      target.removeAttribute('style');
    }
  }

  textHashtag.addEventListener('input', onHashtagInput);

  function checkHashtag(arr, target) {
    function outlineColorChanger() {
      target.style.outline = '2px solid red';
    }
    var errorMessage;

    arr.forEach(function (elem, k) {
      if (elem[0] !== '#' && elem !== '') {
        outlineColorChanger();
        errorMessage = 'Хеш тег должен начинаться символом #';
      } else if (elem.length > MAX_HASHTAG_LENGTH) {
        outlineColorChanger();
        errorMessage = 'Длина хеш тега не должна превышать ' + MAX_HASHTAG_LENGTH + ' ';
      } else if (arr.length > MAX_HASHTAGS) {
        outlineColorChanger();
        errorMessage = 'Хеш тегов не может быть больше ' + MAX_HASHTAGS;
      } else if (elem === '#' && elem.length < 2) {
        outlineColorChanger();
        errorMessage = 'Хеш тег не может состоять из одной решётки';
      }
      for (var j = k + 1; j < arr.length; j++) {
        if (elem.toUpperCase() === arr[j].toUpperCase()) {
          outlineColorChanger();
          errorMessage = 'Один и тот же хеш-тег не может быть использован дважды';
        }
      }
    });
    return errorMessage;
  }

  function onFileLoad() {
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
  }

  uploadFile.addEventListener('change', onFileLoad);

  function onPopupEscPress(evt) {
    if (textDescription !== document.activeElement && textHashtag !== document.activeElement) {
      window.util.isEscEvent(evt, closePopup);
    }
  }

  function openPopup() {

    scaleInput.defaultValue = DEFAULT_FILTER_VALUE + '%';
    effectRadioElement[0].checked = true;
    effectLevel.classList.add('hidden');
    document.addEventListener('keydown', onPopupEscPress);

    uploadOverlay.classList.remove('hidden');
  }

  function closePopup() {
    uploadOverlay.classList.add('hidden');
    img.style.filter = 'none';
    imgUploadPreview.style.transform = '';
    imgUploadPreview.style.filter = 'none';
    img.className = 'none';
    textHashtag.setCustomValidity('');
    textHashtag.style.outline = '';
    imgUploadForm.reset();

    document.removeEventListener('keydown', onPopupEscPress);
  }

  uploadFile.addEventListener('change', openPopup);

  uploadClose.addEventListener('click', closePopup);

  function onSuccessMessage() {
    var element = successTemplate.cloneNode(true);
    mainElement.appendChild(element);
    var successButton = element.querySelector('.success__button');
    var successInner = element.querySelector('.success__inner');

    var onMessageRemove = function () {
      element.remove();
    };

    successButton.addEventListener('click', onMessageRemove);

    function onSuccessClick(evt) {
      if (evt.target !== successInner && !successInner.contains(evt.target)) {
        onMessageRemove();
        document.removeEventListener('click', onSuccessClick);
      }
    }

    function onSuccessEscPress(evt) {
      window.util.isEscEvent(evt, function () {
        onMessageRemove();
        document.removeEventListener('keydown', onSuccessEscPress);
      });
    }

    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', onSuccessClick);

    closePopup();
  }

  function onErrorMessage() {
    var element = errorTemplate.cloneNode(true);
    mainElement.appendChild(element);
    var errorButton = element.querySelectorAll('.error__button');
    var errorInner = element.querySelector('.error__inner');

    function onErrorRemove() {
      element.remove();
    }

    function onErrorClick(evt) {
      if (evt.target !== errorInner && !errorInner.contains(evt.target)) {
        onErrorRemove();
        document.removeEventListener('click', onErrorClick);
      }
    }

    function onErrorEscPress(evt) {
      window.util.isEscEvent(evt, function () {
        onErrorRemove();
        document.removeEventListener('keydown', onErrorEscPress);
      });
    }

    errorButton.forEach(function (button) {
      button.addEventListener('click', onErrorRemove);
    });

    document.addEventListener('keydown', onErrorEscPress);
    document.addEventListener('click', onErrorClick);

    closePopup();
  }

  imgUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var data = new FormData(imgUploadForm);
    window.backend.save(data, onSuccessMessage, onErrorMessage);
  });
})();
