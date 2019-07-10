'use strict';
(function () {
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var pictureList = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  var renderPicture = function (photo) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;

    return pictureElement;
  };

  window.displayPictures = function (pictureItems) {
    for (var i = 0; i < pictureItems.length; i++) {
      var picture = renderPicture(pictureItems[i]);
      fragment.appendChild(picture);
    }
    pictureList.appendChild(fragment);
  };

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

  window.load(window.displayPictures, onError);
})();
