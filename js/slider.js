'use strict';

(function () {

  var slider = document.querySelector('.effect-level__pin');
  var levelDepth = document.querySelector('.effect-level__depth');
  var effectsList = document.querySelector('.effects__list');
  var levelLine = document.querySelector('.effect-level__line');
  var effectsValue = document.querySelector('.effect-level__value');

  window.contentSlider = function (changeIntensityEffect) {
    effectsList.addEventListener('click', function () {
      slider.style.left = '100%';
      levelDepth.style.width = '100%';
    });

    function convertCoordInPercent(coord, fullWidth) {
      var percent = (coord * 100) / fullWidth + '%';
      return percent;
    }

    function changeSlider(evt) {
      evt.preventDefault();
      var startCoords = evt.clientX;
      var effectLevelLineWidth = levelLine.offsetWidth;
      var coordSliderLine = levelLine.getBoundingClientRect();
      var coordSliderLineRight = coordSliderLine.left + effectLevelLineWidth;

      function onMouseMove(moveEvt) {
        moveEvt.preventDefault();

        var shift = startCoords - moveEvt.clientX;
        startCoords = moveEvt.clientX;
        var effectPinCoord = slider.offsetLeft - shift;

        if (moveEvt.clientX < coordSliderLine.left) {
          effectPinCoord = 0;
        }

        if (moveEvt.clientX > coordSliderLineRight) {
          effectPinCoord = effectLevelLineWidth;
        }

        var pinPosition = convertCoordInPercent(effectPinCoord, effectLevelLineWidth);
        slider.style.left = pinPosition;
        levelDepth.style.width = pinPosition;
        effectsValue.setAttribute('value', pinPosition);

        changeIntensityEffect();
      }

      function onMouseUp(upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }

    slider.addEventListener('mousedown', changeSlider);
  };

})();
