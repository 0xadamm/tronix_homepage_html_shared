var newShowsComingSoon = new Swiper(".new-shows-coming-soon", {
  slidesPerView: 4,
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    968: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
  spaceBetween: 16,
  maxBackfaceHiddenSlides: 6,
  virtual: true,
});
