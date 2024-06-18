var tvSeries = new Swiper(".tv-series", {
  slidesPerView: 6,
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    968: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 6,
      spaceBetween: 20,
    },
  },
  spaceBetween: 16,
  maxBackfaceHiddenSlides: 6,
  virtual: true,
});
