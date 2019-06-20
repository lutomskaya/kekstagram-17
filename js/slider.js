'use strict';

(function () {

  var slider = document.querySelector('.effect-level__pin');
  var levelDepth = document.querySelector('.effect-level__depth');
  var effectsList = document.querySelector('.effects__list');

  window.contentSlider = function (changeIntensityEffect) {
    effectsList.addEventListener('click', function () {
      slider.style.left = '100%';
      levelDepth.style.width = '100%';
    });

    slider.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startCoords = evt.clientX;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = startCoords - moveEvt.clientX;
        startCoords = moveEvt.clientX;

        slider.style.left = (slider.offsetLeft - shift) + 'px';
        levelDepth.style.width = (slider.offsetLeft) + 'px';

        changeIntensityEffect();
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

})();
