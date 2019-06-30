'use strict';

(function () {
  var DEFAULT_FILTER_VALUE = 100;
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadClose = document.querySelector('.img-upload__cancel');
  var scaleInput = document.querySelector('.scale__control--value');
  var effectLevel = document.querySelector('.effect-level');
  var effectsRadioElements = document.querySelectorAll('.effects__radio');
  var textDescription = document.querySelector('.text__description');
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var img = document.querySelector('img');
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;


  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && evt.target !== textDescription) {
      closePopup();
    }
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

  uploadFile.addEventListener('change', openPopup);

  uploadClose.addEventListener('click', closePopup);


  uploadClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });
})();
