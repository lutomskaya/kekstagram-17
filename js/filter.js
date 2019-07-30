'use strict';

(function () {
  var NEW_PICTURES = 10;
  var pictureBlocks = [];

  var filtersElement = document.querySelector('.img-filters');
  var filtersForm = document.querySelector('.img-filters__form');
  var filtersButton = filtersForm.querySelectorAll('.img-filters__button');
  var activeButton = filtersForm.querySelector('.img-filters__button--active');

  var getDiscussedPhotos = function (photos) {
    return photos.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  var getNewPhotos = function (photos) {
    return photos.sort(function () {
      return Math.random() - 0.5;
    }).slice(0, NEW_PICTURES - 1);
  };

  var onFilterButtonClick = function (buttonElement) {
    filtersButton.forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });

    buttonElement.classList.add('img-filters__button--active');
  };

  var getFilterPhotos = function (filter) {
    switch (filter) {
      case 'filter-discussed':
        return getDiscussedPhotos(pictureBlocks);
      case 'filter-new':
        return getNewPhotos(pictureBlocks);
      default:
        return pictureBlocks;
    }
  };

  var onFilterChange = function (evt) {
    evt.preventDefault();

    onFilterButtonClick(evt.target);
    window.gallery.render(getFilterPhotos(evt.target.id));
  };

  var showLoadSuccess = function (item) {
    pictureBlocks = item;
    window.gallery.render(getFilterPhotos(activeButton.id));
    filtersElement.classList.remove('img-filters--inactive');
    filtersForm.addEventListener('click', window.util.debounce(onFilterChange));
  };

  window.filter = {
    init: showLoadSuccess
  };
})();
