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
      data.data.forEach(async (item) => {
        itemHtml += `
          <div class="swiper-slide">
            <video
              id="banner-video-${item.trailer.trailer_id}"
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
        async onAny(eventName, ...args) {
          if (eventName === "slideChange") {
            // set current video

            const currentVideo =
              args[0].slides[args[0].activeIndex].children[0]; // children[0] = video element

            const prevVideo = args[0].slides[args[0].previousIndex].children[0];

            const trailer_id = currentVideo.getAttribute("data-trailer_id");

            try {
              const response = await fetch(
                `${backendUrl}/v2/videos/${trailer_id}/playable`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                },
              );

              let video_url = await response.json();
              video_url = video_url.data[0].media[0];

              const player = videojs(`banner-video-${trailer_id}`);

              player.src({
                src: video_url,
                type: "application/x-mpegURL",
              });

              player.ready(function () {
                player.play();

                // set mute unmute button
                const muteUnmuteBtn = document.querySelector(
                  `.banner-promo-player-controls-mute-unmute`,
                );

                if (player.muted()) {
                  muteUnmuteBtn.classList.replace("bg-unmuted", "bg-muted");
                } else {
                  muteUnmuteBtn.classList.replace("bg-muted", "bg-unmuted");
                }
              });
            } catch (error) {
              console.log(error);
            }

            try {
              const prevPlayer = videojs(prevVideo.id);
              prevPlayer.pause();
            } catch (error) {
              console.log("Video Autoplay is not supported!");
            }
          }
        },
      });

      window.bannerCarousel = swiper;
    })
    .catch(() => {
      // TODO: Handle error
    });
})();

const toggleMute = (e) => {
  const swiper = window.bannerCarousel;
  const currentVideo = swiper.slides[swiper.activeIndex].children[0];

  const player = videojs(currentVideo.id);

  if (!player.muted()) {
    e.classList.replace("bg-unmuted", "bg-muted");
  } else {
    e.classList.replace("bg-muted", "bg-unmuted");
  }

  player.muted(!player.muted());
};
