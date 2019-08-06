'use strict';

(function () {

  var SIZE_MIN = 25;
  var SIZE_MAX = 100;
  var SIZE_STEP = 25;
  var currentIndex;
  var currentScaleValue = SIZE_MAX;
  var scaleUpButton = document.querySelector('.scale__control--bigger');
  var scaleDownButton = document.querySelector('.scale__control--smaller');
  var scaleInput = document.querySelector('.scale__control--value');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');

  function setImagePreviewScale(value) {
    imgUploadPreview.style.transform = 'scale(' + value / 100 + ')';
    currentIndex = value + '%';
    scaleInput.setAttribute('value', currentIndex);
  }

  function reduceZoom() {
    currentScaleValue -= SIZE_STEP;
    setImagePreviewScale(currentScaleValue);
  }

  function increaseZoom() {
    currentScaleValue += SIZE_STEP;
    setImagePreviewScale(currentScaleValue);
  }

  function onScaleImgOut() {
    if (currentScaleValue > SIZE_MIN) {
      reduceZoom();
    }
  }

  function onScaleImgIn() {
    if (currentScaleValue < SIZE_MAX) {
      increaseZoom();
    }
  }

  scaleDownButton.addEventListener('click', function () {
    onScaleImgOut();
  });

  scaleDownButton.addEventListener('keydown', function () {
    onScaleImgOut();
  });

  scaleUpButton.addEventListener('click', function () {
    onScaleImgIn();
  });

  scaleUpButton.addEventListener('keydown', function () {
    onScaleImgIn();
  });
})();
