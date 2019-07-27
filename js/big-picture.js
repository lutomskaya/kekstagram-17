'use strict';
(function () {
  var COMMENT_COUNT = 5;

  var bigPicture = document.querySelector('.big-picture');
  var urlPicture = bigPicture.querySelector('.big-picture__img img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var commentsList = bigPicture.querySelector('.social__comments');
  var commentsCountElement = bigPicture.querySelector('.social__comment-count');
  var commentLoader = bigPicture.querySelector('.comments-loader');
  var description = document.querySelector('.social__caption');
  var closeButton = bigPicture.querySelector('.big-picture__cancel');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeWindow);
  };

  var closeWindow = function () {
    bigPicture.classList.add('hidden');
    closeButton.removeEventListener('click', closeWindow);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var renderComment = function (comment) {
    var li = document.createElement('li');
    li.classList.add('social__comment');
    var image = document.createElement('img');
    image.classList.add('social__picture');
    var p = document.createElement('p');
    p.classList.add('social__text');

    image.src = comment.avatar;
    image.alt = comment.name;
    p.textContent = comment.message;

    li.appendChild(image);
    li.appendChild(p);

    return li;
  };

  var generateBigPicture = function (element) {
    urlPicture.src = element.url;
    likesCount.textContent = element.likes;
    commentsCount.textContent = element.comments.length;
    description.textContent = element.description;
  };

  var insertComments = function (comments) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < comments.length; i++) {
      fragment.appendChild(renderComment(comments[i]));
    }
    commentsList.appendChild(fragment);
  };

  var showBigPicture = function (photo) {
    var comments = photo.comments.slice();
    var addComments = comments.slice(0, COMMENT_COUNT);
    commentsList.innerHTML = '';
    commentsCountElement.classList.remove('visually-hidden');
    bigPicture.classList.remove('hidden');
    commentLoader.classList.remove('hidden');
    closeButton.addEventListener('click', closeWindow);
    document.addEventListener('keydown', onPopupEscPress);
    generateBigPicture(photo);
    insertComments(addComments);
    commentLoader.addEventListener('click', onCommentsLoaderClick);

    function onCommentsLoaderClick() {
      comments = comments.slice(COMMENT_COUNT);
      addComments = comments.slice(0, COMMENT_COUNT);
      insertComments(addComments);
      if (addComments.length < COMMENT_COUNT) {
        commentLoader.classList.add('hidden');
        commentLoader.removeEventListener('click', onCommentsLoaderClick);
      }
    }
  };

  window.bigPicture = {
    open: showBigPicture
  };

})();
