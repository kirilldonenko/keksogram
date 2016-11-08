'use strict';
// функция показа всех маленьких фотографий
(function() {
  var Gallery = require('./gallery');
  var Picture = require('./picture');
  var pictures = require('./load');
  var GAP = 100;
  var TROTTLE_TIMEOUT = 100;
  var PICTURES_LOAD_URL = 'http://localhost:1507/api/pictures';

  var container = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');
  filters.classList.add('hidden');
  var footer = document.querySelector('.footer');
  var numberPic;
  var pageSize = 12;
  var filter = 'filter-popular';

  var showPicturesMini = function(pics) {
    pics.forEach(function(pic, num) {
      var miniPic = new Picture(pic, num);
      container.appendChild(miniPic.element);

    });
    Gallery.setPictures(pics);
  };
  var changeFilter = function(filterID) {
    container.innerHTML = '';
    numberPic = 0;
    pictures(PICTURES_LOAD_URL, {
      from: numberPic * pageSize,
      to: numberPic * pageSize + pageSize,
      filter: filterID
    },
      showPicturesMini);
    if (footer.getBoundingClientRect().top < window.innerHeight) {
      numberPic++;
      pictures(PICTURES_LOAD_URL, {
        from: numberPic * pageSize,
        to: numberPic * pageSize + pageSize,
        filter: filterID
      },
        showPicturesMini);
      numberPic++;
    }
  };
  changeFilter(filter);
  var lastCall = Date.now();
  window.addEventListener('scroll', function() {
    if (Date.now() - lastCall >= TROTTLE_TIMEOUT) {
      if (footer.getBoundingClientRect().top - window.innerHeight - GAP < 0) {
        pictures(PICTURES_LOAD_URL, {
          from: numberPic * pageSize,
          to: numberPic * pageSize + pageSize,
          filter: filter
        }, showPicturesMini);
        numberPic++;
      }
      lastCall = Date.now();
    }

  });


  filters.addEventListener('change', function(evt) {
    if (evt.target.classList.contains('filters-radio')) {
      filter = evt.target.id;
      changeFilter(filter);
    }
  }, true);
  filters.classList.remove('hidden');
})();
