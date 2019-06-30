'use strict';

(function () {
  var DefaultEffectsValues = {
    'none': '',
    'chrome': 1,
    'sepia': 1,
    'marvin': 100,
    'phobos': 3,
    'heat': 3
  };
  var slider = document.querySelector('.effect-level__pin');
  var levelLine = document.querySelector('.effect-level__line');
  var effectsField = document.querySelector('.img-upload__effects');
  var effectLevel = document.querySelector('.effect-level');
  var effectsRadioElements = document.querySelectorAll('.effects__radio');
  var imgUploadPreview = document.querySelector('.img-upload__preview');

  var getEffectStyle = function (effect, value) {
    var curValue = (value) ? value * DefaultEffectsValues[effect] : DefaultEffectsValues[effect];

    switch (effect) {
      case 'chrome':
        return 'grayscale(' + curValue + ')';
      case 'sepia':
        return 'sepia(' + curValue + ')';
      case 'marvin':
        return 'invert(' + curValue + '%)';
      case 'phobos':
        return 'blur(' + curValue + 'px)';
      case 'heat':
        return 'brightness(' + curValue + ')';
      default:
        return DefaultEffectsValues.none;
    }
  };
  var changeEffects = function (evt) {
    var effect = evt.target.value;

    effectLevel.classList[(effect !== 'none') ? 'remove' : 'add']('hidden');
    imgUploadPreview.style.filter = getEffectStyle(effect);

  };

  effectsRadioElements.forEach(function (item) {
    item.addEventListener('change', changeEffects);
  });

  var changeIntensityEffect = function () {
    var currentLevel = (slider.offsetLeft / levelLine.clientWidth).toFixed(1);
    var currentEffect = effectsField.querySelector('input:checked').value;

    imgUploadPreview.style.filter = getEffectStyle(currentEffect, currentLevel);
  };

  window.contentSlider(changeIntensityEffect);
})();
