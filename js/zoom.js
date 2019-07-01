'use strict';

(function () {

  var SIZE_MIN = 25;
  var SIZE_MAX = 100;
  var SIZE_STEP = 25;
  var currentScaleValue = SIZE_MAX;
  var scaleUpButton = document.querySelector('.scale__control--bigger');
  var scaleDownButton = document.querySelector('.scale__control--smaller');
  var scaleInput = document.querySelector('.scale__control--value');
  var imgUploadPreview = document.querySelector('.img-upload__preview');

  var setImagePreviewScale = function (value) {
    scaleInput.value = value + '%';
    imgUploadPreview.style.transform = 'scale(' + value / 100 + ')';
  };

  var outZoom = function () {
    currentScaleValue -= SIZE_STEP;
    setImagePreviewScale(currentScaleValue);
  };

  var inZoom = function () {
    currentScaleValue += SIZE_STEP;
    setImagePreviewScale(currentScaleValue);
  };

  var tryScaleImgOut = function () {
    if (currentScaleValue > SIZE_MIN) {
      outZoom();
    }
  };

  var tryScaleImgIn = function () {
    if (currentScaleValue < SIZE_MAX) {
      inZoom();
    }
  };

  scaleDownButton.addEventListener('click', function () {
    tryScaleImgOut();
  });

  scaleDownButton.addEventListener('keydown', function () {
    tryScaleImgOut();
  });

  scaleUpButton.addEventListener('click', function () {
    tryScaleImgIn();
  });

  scaleUpButton.addEventListener('keydown', function () {
    tryScaleImgIn();
  });
})();
