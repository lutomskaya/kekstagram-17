'use strict';

(function () {
  var NEW_PICTURES = 10;
  var pictures = [];

  var filtersElement = document.querySelector('.img-filters');
  var filtersForm = document.querySelector('.img-filters__form');
  var filtersButton = filtersForm.querySelectorAll('.img-filters__button');
  var activeButton = filtersForm.querySelector('.img-filters__button--active');

  function getDiscussedPhotos(photos) {
    return photos.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  }

  function getNewPhotos(photos) {
    return photos.sort(function () {
      return Math.random() - 0.5;
    }).slice(0, NEW_PICTURES - 1);
  }

  function onFilterButtonClick(buttonElement) {
    filtersButton.forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });

    buttonElement.classList.add('img-filters__button--active');
  }

  function getFilterPhotos(filter) {
    switch (filter) {
      case 'filter-discussed':
        return getDiscussedPhotos(pictures);
      case 'filter-new':
        return getNewPhotos(pictures);
      default:
        return pictures;
    }
  }

  function onFilterChange(evt) {
    evt.preventDefault();

    onFilterButtonClick(evt.target);
    window.gallery.render(getFilterPhotos(evt.target.id));
  }

  function showLoadSuccess(item) {
    pictures = item;
    window.gallery.render(getFilterPhotos(activeButton.id));
    filtersElement.classList.remove('img-filters--inactive');
    filtersForm.addEventListener('click', window.util.debounce(onFilterChange));
  }

  window.filter = {
    init: showLoadSuccess
  };
})();
