'use strict';

(function () {
  var NEW_PICTURES = 10;
  var pictureBlocks = [];

  var pictureList = document.querySelector('.pictures');
  var filtersElement = document.querySelector('.img-filters');
  var filtersForm = document.querySelector('.img-filters__form');

  var clearPictures = function () {
    pictureList.querySelectorAll('.picture').forEach(function (element) {
      element.remove();
    });
  };

  var showDiscussedPhotos = function (photos) {
    var photoCopy = photos.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    }).slice(0, 9);
    return photoCopy;
  };

  var showNewPhotos = function (photos) {
    var photoCopy = photos
      .sort(function () {
        return Math.random() - 0.5;
      })
      .slice(-NEW_PICTURES);
    return photoCopy;
  };


  var sortPictures = window.util.debounce(function (evt) {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    clearPictures();
    filtersForm.querySelectorAll('.img-filters__button').forEach(function (element) {
      element.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
    if (evt.target.id === 'filter-discussed') {
      window.displayPictures(showDiscussedPhotos(pictureBlocks));
    } else if (evt.target.id === 'filter-new') {
      window.displayPictures(showNewPhotos(pictureBlocks));
    } else {
      window.displayPictures(pictureBlocks);
    }
  });

  window.showLoadSuccess = function (item) {
    pictureBlocks = item;
    window.displayPictures(pictureBlocks);
    filtersElement.classList.remove('img-filters--inactive');
    filtersForm.addEventListener('click', sortPictures);
  };

})();
