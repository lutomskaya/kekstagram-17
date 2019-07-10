'use strict';
(function () {
  var NEW_PICTURES = 10;
  var MIN_AVATARS = 1;
  var MAX_AVATARS = 6;
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
  var bigPicture = document.querySelector('.big-picture');
  var urlPicture = bigPicture.querySelector('.big-picture__img img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var commentsList = bigPicture.querySelector('.social__comments');
  var socialComments = document.querySelector('.social__comment');
  var description = document.querySelector('.social__caption');
  var closeButton = bigPicture.querySelector('.big-picture__cancel');
  var fragment = document.createDocumentFragment();

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getBigPicture = function (photos) {
    bigPicture.classList.remove('hidden');
    urlPicture.src = photos.url;
    likesCount.textContent = photos.likes;
    commentsCount.textContent = photos.comments.length;
    description.textContent = photos.description;
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

    for (var i = 0; i < photos.comments.length; i++) {
      var comment = socialComments.cloneNode(true);

      comment.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(MIN_AVATARS, MAX_AVATARS) + '.svg';
      comment.querySelector('.social__text').textContent = photos.comments[i].message;

      fragment.appendChild(comment);
    }
    commentsList.appendChild(fragment);
  };

  var showBigPhoto = function (evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('picture__img')) {
      var attribute = evt.target.getAttribute('src');
      for (var i = 0; i < picturesBlock.length; i++) {
        if (picturesBlock[i].url === attribute) {
          getBigPicture(picturesBlock[i]);
        }
      }
    }
  };

  var openBigPicture = function (evt) {
    var target = evt.target;
    var picture = target.closest('.picture');
    if (!picture) {
      return;
    }
    showBigPhoto(evt);
  };

  pictureList.addEventListener('click', openBigPicture);

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeWindow);
  };

  var closeWindow = function () {
    bigPicture.classList.add('hidden');
  };

  closeButton.addEventListener('click', function () {
    closeWindow();
  });

  closeButton.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, closeWindow);
  });

  var escClose = function () {
    document.addEventListener('keydown', onPopupEscPress);
  };

  escClose();

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
    // var fragment = document.createDocumentFragment();
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
