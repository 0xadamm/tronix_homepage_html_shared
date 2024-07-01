// load banner data
let swiper;
(async () => {
  const backendUrl = "https://new.tronixnetwork.com/api";
  // load promo banner items
  fetch(`${backendUrl}/v2/contentList/items/1`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const bannerContainer = document.querySelector(
        ".mySwiper .banner-promo-items",
      );
      let itemHtml = "";
      data.data.forEach((item) => {
        itemHtml += `
          <div class="swiper-slide">
            <video
              class="banner"
              disablepictureinpicture="true"
              controlslist="nodownload"
              autoplay
              playsinline
              poster="${item.thumbs.original}"
              data-trailer_id="${item.trailer.trailer_id}"
            >
              
            </video>
          </div>
          `;
      });

      bannerContainer.innerHTML =
        itemHtml + `<div class="video-overlay"></div>`;

      let firstTime = true;

      swiper = new Swiper(".mySwiper", {
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
            // set current video

            const currentVideo =
              args[0].slides[args[0].activeIndex].children[0]; // children[0] = video element

            const trailer_id = currentVideo.getAttribute("data-trailer_id");

            currentVideo.innerHTML = `
              <source
                type="video/mp4"
                src=""
              />
              `;

            /* try {
              const prevVideo =
                args[0].slides[args[0].previousIndex].children[0];
              prevVideo?.pause();
              currentVideo.currentTime = 0;
              currentVideo.play();
            } catch (error) {
              console.log("Video Autoplay is not supported!");
            } */
          }
        },
      });

      // window.addEventListener("click", (e) => {
      //   if (firstTime) {
      //     swiper.slides[swiper.activeIndex].children[0].play();
      //   } else {
      //     firstTime = false;
      //   }
      // });
    })
    .catch(() => {
      // TODO: Handle error
    });
})();

const toggleMute = (e) => {
  if (!swiper.slides[swiper.activeIndex].children[0].muted) {
    e.classList.replace("bg-unmuted", "bg-muted");
  } else {
    e.classList.replace("bg-muted", "bg-unmuted");
  }

  swiper.slides.forEach((item) => {
    item.children[0].muted = !item.children[0].muted;
  });
};
