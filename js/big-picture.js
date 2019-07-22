'use strict';
(function () {
  var MIN_AVATARS = 1;
  var MAX_AVATARS = 6;

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

    document.addEventListener('keydown', onPopupEscPress);

  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeWindow);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var closeWindow = function () {
    bigPicture.classList.add('hidden');
  };

  closeButton.addEventListener('click', closeWindow);

  closeButton.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, closeWindow);
  });

  window.bigPicture = {
    open: getBigPicture
  };

})();
