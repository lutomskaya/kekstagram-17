'use strict';

(function () {
  var DEFAULT_EFFECTS_VALUES = {
    'none': '',
    'chrome': 1,
    'sepia': 1,
    'marvin': 100,
    'phobos': 3,
    'heat': 3
  };
  var effectLevel = document.querySelector('.effect-level');
  var slider = effectLevel.querySelector('.effect-level__pin');
  var levelLine = effectLevel.querySelector('.effect-level__line');
  var effectsField = document.querySelector('.img-upload__effects');
  var effectsRadioElements = document.querySelectorAll('.effects__radio');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');

  function getEffectStyle(effect, value) {
    var curValue = (value) ? value * DEFAULT_EFFECTS_VALUES[effect] : DEFAULT_EFFECTS_VALUES[effect];

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
        return DEFAULT_EFFECTS_VALUES.none;
    }
  }

  function changeEffects(evt) {
    var effect = evt.target.value;

    effectLevel.classList[(effect !== 'none') ? 'remove' : 'add']('hidden');
    imgUploadPreview.style.filter = getEffectStyle(effect);
    imgUploadPreview.className = 'effects__preview--' + effect;
  }

  effectsRadioElements.forEach(function (item) {
    item.addEventListener('change', changeEffects);
  });

  function changeIntensityEffect() {
    var currentLevel = (slider.offsetLeft / levelLine.clientWidth).toFixed(1);
    var currentEffect = effectsField.querySelector('input:checked').value;

    imgUploadPreview.style.filter = getEffectStyle(currentEffect, currentLevel);
  }

  window.contentSlider(changeIntensityEffect);
})();
