let firstTime = true;

var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  loop: true,
  onAny(eventName, ...args) {
    if (eventName === "slideChange") {
      // console.log("Slide changed", args);
      // console.log(
      //   "Current slide is",
      //   args[0].activeIndex,
      //   "from ",
      //   args[0].previousIndex
      // );

      const currentVideo = args[0].slides[args[0].activeIndex].children[0];
      const prevVideo = args[0].slides[args[0].previousIndex].children[0];
      prevVideo?.pause();
      try {
        currentVideo.currentTime = 0;
        currentVideo.play();
      } catch (error) {
        console.log(error);
      }
    }
  },
});

window.addEventListener("click", (e) => {
  if (firstTime) {
    swiper.slides[swiper.activeIndex].children[0].play();
  } else {
    firstTime = false;
  }
});

const toggleMute = (e) => {
  if (!swiper.slides[swiper.activeIndex].children[0].muted) {
    e.classList.replace("bg-unmuted", "bg-muted");
  } else {
    e.classList.replace("bg-muted", "bg-unmuted");
  }

  swiper.slides.forEach((item) => {
    // console.log(item.children[0].muted);
    item.children[0].muted = !item.children[0].muted;
  });
};
