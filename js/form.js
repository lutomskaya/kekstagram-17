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

  function getSortElements(array) {
    var unique = array.filter(function (it, i) {
      return array.indexOf(it.toLowerCase()) === i;
    });

    return unique.length === array.length;
  }

  function checkHashtag() {
    var hashtagsArr = textHashtags.value.trim().split(' ');
    textHashtags.setCustomValidity('');
    var hashtagsBorder = '2px solid red';

    for (var i = 0; i < hashtagsArr.length; i++) {
      if (hashtagsArr.length > MAX_HASHTAGS) {
        textHashtags.setCustomValidity('Нельзя указать больше ' + MAX_HASHTAGS + ' тегов');
        textHashtags.style.border = hashtagsBorder;
      } else if ((hashtagsArr[i][0] !== '#') && (hashtagsArr[i].length > 0)) {
        textHashtags.setCustomValidity('Хэш-тег должен начинаться с символа `#` (решётка)');
        textHashtags.style.border = hashtagsBorder;
      } else if ((hashtagsArr[i][0] === '#') && (hashtagsArr[i].length === 1)) {
        textHashtags.setCustomValidity('Хэш-тег не может состоять из одной `#` (решётки)');
        textHashtags.style.border = hashtagsBorder;
      } else if (hashtagsArr[i].slice(1).indexOf('#') > -1) {
        textHashtags.setCustomValidity('Хэш-теги нужно разделять пробелами');
        textHashtags.style.border = hashtagsBorder;
      } else if (hashtagsArr[i].length > MAX_HASHTAG_LENGTH) {
        textHashtags.setCustomValidity('Длина хэш-тега должна быть не более ' + MAX_HASHTAG_LENGTH + ' символов');
        textHashtags.style.border = hashtagsBorder;
      } else if (!getSortElements(hashtagsArr)) {
        textHashtags.setCustomValidity('Теги не должны повторяться');
        textHashtags.style.border = hashtagsBorder;
      } else {
        textHashtags.setCustomValidity('');
        textHashtags.style.border = '';
      }
    }
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
    if (textDescription !== document.activeElement && textHashtags !== document.activeElement) {
      window.util.isEscEvent(evt, closePopup);
    }
  }

  function openPopup() {

    scaleInput.value = DEFAULT_FILTER_VALUE;
    effectsRadioElements[0].checked = true;
    effectLevel.classList.add('hidden');
    document.addEventListener('keydown', onPopupEscPress);

    imgUploadForm.addEventListener('change', checkHashtag);

    uploadOverlay.classList.remove('hidden');
  }

  function closePopup() {
    uploadOverlay.classList.add('hidden');
    img.style.filter = 'none';
    imgUploadPreview.style.transform = '';
    imgUploadPreview.style.filter = '';
    img.className = '';
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
