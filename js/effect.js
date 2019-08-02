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
  var imgUploadPreview = document.querySelector('.img-upload__preview');

  function addFilterClassname(filterType) {
    imgUploadPreview.className = 'img-upload__preview';

    switch (filterType) {
      case 'chrome':
        imgUploadPreview.classList.add('effects__preview--chrome');
        break;
      case 'sepia':
        imgUploadPreview.classList.add('effects__preview--sepia');
        break;
      case 'marvin':
        imgUploadPreview.classList.add('effects__preview--blur');
        break;
      case 'phobos':
        imgUploadPreview.classList.add('effects__preview--phobos');
        break;
      case 'heat':
        imgUploadPreview.classList.add('effects__preview--heat');
        break;
    }
  }

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
    addFilterClassname(effect);
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
