'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var NAMES = ['Иван', 'Карл', 'Даня', 'Паша', 'Стас', 'Рома'];

var photosQuantity = 25;

var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
var pictureList = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

var getRandomElement = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getCommentObject = function () {
  var comments = [];

  for (var i = 0; i < getRandomElement(1, 7); i++) {
    comments[i] = {
      avatar: 'img/avatar-' + getRandomElement(1, 6) + '.svg',
      message: COMMENTS[getRandomElement(0, COMMENTS.length)],
      name: NAMES[getRandomElement(0, NAMES.length)]
    };
  }

  return comments;
};

var getPhotoObject = function (number) {
  return {
    url: 'photos/' + (number + 1) + '.jpg',
    likes: getRandomElement(15, 200),
    comments: getCommentObject()
  };
};

var renderPicture = function (photo) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;

  return pictureElement;
};

for (var i = 0; i < photosQuantity; i++) {
  fragment.appendChild(renderPicture(getPhotoObject(i)));
}

pictureList.appendChild(fragment);
