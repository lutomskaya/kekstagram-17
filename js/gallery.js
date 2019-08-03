'use strict';
(function () {

  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var picturesList = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  function renderPicture(photo) {
    var picturesElement = pictureTemplate.cloneNode(true);
    picturesElement.querySelector('.picture__img').src = photo.url;
    picturesElement.querySelector('.picture__comments').textContent = photo.comments.length;
    picturesElement.querySelector('.picture__likes').textContent = photo.likes;

    picturesElement.addEventListener('click', onPictureClick);

    return picturesElement;

    function onPictureClick(evt) {
      evt.preventDefault();
      window.bigPicture.open(photo);
    }
  }

  function displayPictures(pictureItems) {

    for (var i = 0; i < pictureItems.length; i++) {
      var picture = renderPicture(pictureItems[i]);
      fragment.appendChild(picture);
    }
    picturesList.appendChild(fragment);
  }

  function onError(errorMessage) {
    var block = document.createElement('div');
    block.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    block.style.position = 'absolute';
    block.style.left = 0;
    block.style.right = 0;
    block.style.fontSize = '50px';

    block.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', block);
  }

  window.backend.load(window.filter.init, onError);

  window.gallery = {
    render: displayPictures
  };
})();
