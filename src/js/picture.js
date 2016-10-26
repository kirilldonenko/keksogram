'use strict';
// функция отрисовки одной маленькой фотографии

module.exports = (function getPictureMini() {
  var Gallery = require('./gallery');
  var template = document.querySelector('#picture-template');
  var templateContainer = 'content' in template ? template.content : template;
  var container = document.querySelector('.pictures');
  var PHOTO_LOAD_TIMEOUT = 10000;
  var IMAGE_WIDTH = 182;
  var IMAGE_LEIGHT = 182;
  return function(pic) {
    var arreyPics = Gallery.pictures;
    var pictureMini = templateContainer.querySelector('.picture').cloneNode(true);
    pictureMini.querySelector('.picture-comments').textContent = pic.comments;
    pictureMini.querySelector('.picture-likes').textContent = pic.likes;
    var photo = new Image();
    var photoTimeout = null;
    var image = pictureMini.getElementsByTagName('img')[0];
    photo.onload = function() {
      clearTimeout(photoTimeout);
      image.src = pic.url;
      image.width = IMAGE_WIDTH;
      image.leight = IMAGE_LEIGHT;
    };
    photo.onerror = function() {
      pictureMini.classList.add('picture-load-failure');
    };
    photo.src = pic.url;
    photoTimeout = setTimeout(function() {
      pictureMini.classList.add('picture-load-failure');
    }, PHOTO_LOAD_TIMEOUT);
    container.onclick = function(evt) {
      if(evt.target.tagName === 'IMG') {
        for (var i = 0; i < arreyPics.length; i++) {
          if(evt.target === arreyPics[i]) {
            Gallery.show(i);
          }
        }
      }
    };

    return pictureMini;
  };
})();
