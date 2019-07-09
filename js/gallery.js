'use strict';
(function () {
  var NEW_PICTURES = 10;
  var picturesBlock = [];
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var pictureList = document.querySelector('.pictures');
  var filtersElement = document.querySelector('.img-filters');
  var filterPopular = filtersElement.querySelector('#filter-popular');
  var filterNew = filtersElement.querySelector('#filter-new');
  var filterDiscussed = filtersElement.querySelector('#filter-discussed');
  var filterButton = document.querySelectorAll('.img-filters__button');

  var clearPictures = function () {
    pictureList.querySelectorAll('.picture').forEach(function (element) {
      element.remove();
    });
  };

  var changeFilter = function (btn) {
    filterButton.forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });
    btn.classList.add('img-filters__button--active');
  };

  var showDiscussedPhotos = function (photos) {
    var photoCopy = photos.slice();
    photoCopy.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
    displayPictures(photoCopy);
  };

  var showNewPhotos = function (photos) {
    var photoCopy = photos
      .sort(function () {
        return Math.random() - 0.5;
      })
      .slice(-NEW_PICTURES);
    displayPictures(photoCopy);
  };

  var showLoadSuccess = function (photos) {
    picturesBlock = photos;
    filtersElement.classList.remove('img-filters--inactive');
    displayPictures(picturesBlock);
    return picturesBlock;
  };

  var onFilterClick = function (evt) {
    clearPictures();
    changeFilter(evt.target);
    var id = evt.target.id;
    switch (id) {
      case 'filter-popular':
        displayPictures(picturesBlock);
        break;
      case 'filter-new':
        showNewPhotos(picturesBlock);
        break;
      case 'filter-discussed':
        showDiscussedPhotos(picturesBlock);
    }
  };

  window.load(showLoadSuccess);

  var onFilterClickDebounce = window.util.debounce(onFilterClick);

  filterPopular.addEventListener('click', onFilterClickDebounce);
  filterDiscussed.addEventListener('click', onFilterClickDebounce);
  filterNew.addEventListener('click', onFilterClickDebounce);

  var renderPicture = function (photo) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;

    return pictureElement;
  };

  var displayPictures = function (pictureItems) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictureItems.length; i++) {
      var picture = renderPicture(pictureItems[i]);
      fragment.appendChild(picture);
    }
    pictureList.appendChild(fragment);
  };

  var showFilters = function () {
    filtersElement.classList.remove('img-filters--inactive');
  };
  showFilters();

  var onError = function (errorMessage) {
    var block = document.createElement('div');
    block.style.height = 150 + 'px';
    block.style.index = 100;
    block.style.position = 'fixed';
    block.style.color = 'red';
    block.style.fontWeight = 'bold';
    block.style.fontSize = '50px';

    block.textContent = errorMessage;
    return block;
  };

  window.load(displayPictures, onError);
})();
