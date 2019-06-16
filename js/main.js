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

var COMMENTS_MIN = 0;
var COMMENTS_MAX = 7;

var AVATARS_MIN = 1;
var AVATARS_MAX = 6;

var LIKES_MIN = 15;
var LIKES_MAX = 200;

var PHOTOS_QUANTITY = 25;

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

  for (var i = 0; i <= getRandomElement(COMMENTS_MIN, COMMENTS_MAX); i++) {
    comments.push({
      avatar: 'img/avatar-' + getRandomElement(AVATARS_MIN, AVATARS_MAX) + '.svg',
      message: COMMENTS[getRandomElement(0, COMMENTS.length)],
      name: NAMES[getRandomElement(0, NAMES.length)]
    });
  }

  return comments;
};

var getPhotoObject = function (number) {
  var photos = [];
  for (var i = 0; i <= number; i++) {
    photos.push({
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomElement(LIKES_MIN, LIKES_MAX),
      comments: getCommentObject()
    });
  }
  return photos;
};

var renderPicture = function (photo) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;

  return pictureElement;
};

var photos = getPhotoObject(PHOTOS_QUANTITY);

for (var i = 0; i < photos.length - 1; i++) {
  fragment.appendChild(renderPicture(photos[i]));
}

pictureList.appendChild(fragment);
