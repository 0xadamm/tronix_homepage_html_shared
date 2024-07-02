(async () => {
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  const backendUrl = "https://new.tronixnetwork.com/api";
  const contentContainer = document.querySelector("#contentListBg");
  contentContainer.innerHTML = `
            <div style="display: flex; justify-content: start; align-items: center; padding: 3rem 0 0; gap: 1rem">
                <div style="background-color: #ffffff20; width: 100%; height: 200px; border-radius: 10px"></div>
                <div style="background-color: #ffffff20; width: 100%; height: 200px; border-radius: 10px"></div>
                <div style="background-color: #ffffff20; width: 100%; height: 200px; border-radius: 10px"></div>
            </div>
      `;
  fetch(`${backendUrl}/v2/contentList/1`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then(async (data) => {
      contentContainer.innerHTML = ``;
      let sortedData = data.data.sort((a, b) => {
        return a["sort"] - b["sort"];
      });
      for (let item of sortedData) {
        const response = await fetch(
          `${backendUrl}/v2/contentList/items/${item.content_list_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        );
        const contents = await response.json();
        const content_items = contents.data[item.content_list_id];
        const isPortrait = content_items[0].portrait_thumbs.original
          ? true
          : false;
        // load content items
        let itemHtml = "";
        const isNetworkingRow = item.content_list_name == "Network Trailers";

        if (isNetworkingRow) {
          content_items.forEach((_item) => {
            itemHtml += `
                          <div
                              class="swiper-slide modal-desc"
                              data-series_id="1"
                              data-api_series_id="${_item.series_id}"
                              data-series_name="${_item.series_name || _item.title}"
                              data-series_tags="${_item.series_tags}"
                              data-series_description="${_item.series_description}"
                              data-thumbnail="${_item.thumbs["200x288"]}"
                              data-video_poster="${_item.thumbs["768x432"]}"
                              data-copy_url="${_item.copy_url}"
                              data-shareable="${_item.shareable}"
                              data-is_series="${_item.is_series}"
                          >
                              <div class="show-image">
                                ${
                                  isNetworkingRow
                                    ? `
                                      <div class="toggleImg">
                                        <div  style="display:none">
                                           <img
                                            src="${_item.gif}"
                                          />

                                        </div>
                                        <div>
                                          <img
                                            src="${isPortrait ? _item.portrait_thumbs.original : _item.thumbs.original}"
                                          />
                                        </div>
                                      </div>
                                    ` // video
                                    : `
                                    <div >
                                      <img
                                        src="${isPortrait ? _item.portrait_thumbs.original : _item.thumbs.original}"
                                      />
                                    </div>
                                    `
                                }
  
                                
                              </div>
  
                              ${
                                _item.is_premium === "no"
                                  ? ""
                                  : `
                              <div class="premium-badge">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <g
                                    id="Subscription_for_card"
                                    data-name="Subscription for card"
                                    transform="translate(-287.001 -840.001)"
                                    class="ng-tns-c187-3"
                                  >
                                    <rect
                                      id="Rectangle_9978"
                                      data-name="Rectangle 9978"
                                      width="24"
                                      height="24"
                                      transform="translate(287.001 840.001)"
                                      fill="none"
                                      class="ng-tns-c187-3"
                                    >
                                    </rect>
                                    <g
                                      id="Group_88464"
                                      data-name="Group 88464"
                                      transform="translate(292.363 842.255)"
                                      class="ng-tns-c187-3"
                                    >
                                      <path
                                        id="Path_112621"
                                        data-name="Path 112621"
                                        d="M57.05,19.23a17.128,17.128,0,0,1-2.884.078c-.243,0-.314.121-.423,0a.858.858,0,0,1-.169-.578q-.007-.743-.013-1.485c-.906-.025-1.942-.724-2.848-.862-.251-.038-.444.037-.562-.1s-.048.13-.061-.122q-.059-1.161-.1-2.322a.658.658,0,0,1,.158-.53.746.746,0,0,1,.562-.126,48.493,48.493,0,0,0,5.545.079.505.505,0,0,0,.4-.193.7.7,0,0,0,.14-.426.768.768,0,0,0-.128-.507.532.532,0,0,0-.4-.172c-1.036-.115-2.075-.257-3.115-.414a4.706,4.706,0,0,1-2.347-.986,2.918,2.918,0,0,1-.882-2.4q.011-1.042.039-2.084a3.718,3.718,0,0,1,1.017-2.551,4.13,4.13,0,0,1,2.573-1.246q.006-.764.013-1.527a.853.853,0,0,1,.17-.578c.11-.121.332-.108.576-.107A16.374,16.374,0,0,1,57.07.249a.886.886,0,0,1,.541.271.967.967,0,0,1,.2.584q.042.714.076,1.427.967.154,1.935.387a1.092,1.092,0,0,1,.562.3.9.9,0,0,1,.213.55q.089,1.094.144,2.188a.552.552,0,0,1-.152.484.772.772,0,0,1-.562.094q-2.408-.255-4.816-.3A.491.491,0,0,0,54.8,6.4a.679.679,0,0,0-.144.447.73.73,0,0,0,.146.459.559.559,0,0,0,.416.212c1.033.15,2.067.316,3.1.486a5.382,5.382,0,0,1,2.363.959,2.447,2.447,0,0,1,.878,2.157q-.025.934-.078,1.868a3.761,3.761,0,0,1-1.068,2.382A5.344,5.344,0,0,1,57.867,16.9q-.037.734-.082,1.467a.98.98,0,0,1-.2.586.89.89,0,0,1-.538.275"
                                        transform="translate(-48.283 0.002)"
                                        fill="#711abf"
                                        class="ng-tns-c187-3"
                                        ></path>
                                        <path
                                        id="Path_112622"
                                        data-name="Path 112622"
                                        d="M10.75,8.914a4.825,4.825,0,0,0-2.358-.976c-1.034-.15-2.067-.289-3.1-.407a.539.539,0,0,1-.414-.2.685.685,0,0,1-.141-.448.7.7,0,0,1,.15-.447A.531.531,0,0,1,5.3,6.25q2.408-.078,4.816.054a.756.756,0,0,0,.565-.137.683.683,0,0,0,.162-.539q-.032-1.193-.082-2.386a.894.894,0,0,0-.194-.576.873.873,0,0,0-.556-.246Q9.045,2.3,8.078,2.258q-.009-.741-.02-1.483A.871.871,0,0,0,7.884.2.7.7,0,0,0,7.351,0a16.928,16.928,0,0,0-2.8.19.857.857,0,0,0-.54.261.954.954,0,0,0-.194.585q-.039.739-.07,1.479A5.181,5.181,0,0,0,1.142,3.978,3.677,3.677,0,0,0,.066,6.4Q.02,7.346,0,8.293a2.557,2.557,0,0,0,.88,2.2,5.264,5.264,0,0,0,2.354.988c1.041.184,2.081.359,3.119.515a.556.556,0,0,1,.405.191.829.829,0,0,1,.135.522.685.685,0,0,1-.134.427.463.463,0,0,1-.4.173,48.86,48.86,0,0,1-5.545-.4.767.767,0,0,0-.559.078.519.519,0,0,0-.147.47q.064,1.056.163,2.111a.92.92,0,0,0,.217.546,1.148,1.148,0,0,0,.561.312A23.456,23.456,0,0,0,3.768,17q.033.719.072,1.438a.966.966,0,0,0,.195.586.856.856,0,0,0,.537.265,16.014,16.014,0,0,0,2.779.2.7.7,0,0,0,.53-.194.876.876,0,0,0,.173-.581q.012-.762.022-1.524a4.184,4.184,0,0,0,2.508-1.314,3.8,3.8,0,0,0,1.005-2.518q.033-1.034.048-2.068a2.838,2.838,0,0,0-.885-2.376"
                                        transform="translate(-0.001 0.001)"
                                        fill="#b579f5"
                                        class="ng-tns-c187-3"
                                        >
                                      </path>
                                    </g>
                                  </g>
                                </svg>
                              </div>
                              `
                              }
                              ${isPortrait ? `<div class="category">${_item.videoid ? "Video" : "Series"}</div>` : ""}
                              <div class="show-details">
                              <div class="desc">
                                  <span class="title">${isPortrait ? `${(_item.series_name || _item.title).substr(0, 14)}${(_item.series_name || _item.title).length > 14 ? "..." : ""}` : `${(_item.series_name || _item.title).substr(0, 24)}${(_item.series_name || _item.title).length > 24 ? "..." : ""}`}</span>
  
                                  ${
                                    isPortrait
                                      ? `<div class="action-btn">
                                    <div>
                                        <div class="bg-add"></div>
                                    </div>
                                    <div>
                                        <div class="bg-share"></div>
                                    </div>
                                  </div>`
                                      : ``
                                  }
                              </div>
                              ${
                                isPortrait
                                  ? `<div class="meta" data-series_id="${_item.series_id}">
                                      <span class="season_count"></span>
                                      <span>•</span>
                                      <span class="category_name">Reality</span>
                                      <span>•</span>
                                      <span class="language">English</span>
                                    </div>`
                                  : ""
                              }
                            </div>
                          </div>
                  `;
          });
        }
        content_items.forEach((_item) => {
          itemHtml += `
                        <div
                            class="swiper-slide modal-desc"
                            data-series_id="1"
                            data-api_series_id="${_item.series_id}"
                            data-series_name="${_item.series_name || _item.title}"
                            data-series_tags="${_item.series_tags}"
                            data-series_description="${_item.series_description}"
                            data-thumbnail="${_item.thumbs["200x288"]}"
                            data-video_poster="${_item.thumbs["768x432"]}"
                            data-copy_url="${_item.copy_url}"
                            data-shareable="${_item.shareable}"
                            data-is_series="${_item.is_series}"
                            data-videoid="${_item.videoid ?? _item.trailer.content_trailer_id}"
                        >
                            <div class="show-image">
                              ${
                                isNetworkingRow
                                  ? `
                                    <div id="toggleImg">
                                      <div  style="display:none" id="video-box">
                                        <video
                                          autoplay
                                          loop
                                          muted
                                          poster="https://tronixnetworkprod.s3.us-west-1.amazonaws.com/gudsho-upload-thumbnail-images/20-06-2024/1718859311045-blob.webp"
                                        ></video>
                                      </div>
                                      <div id="img-box">
                                        <img
                                          src="${isPortrait ? _item.portrait_thumbs.original : _item.thumbs.original}"
                                        />
                                      </div>
                                    </div>
                                  ` // video
                                  : `
                                  <div >
                                    <img
                                      src="${isPortrait ? _item.portrait_thumbs.original : _item.thumbs.original}"
                                    />
                                  </div>
                                  `
                              }

                              
                            </div>

                            ${
                              _item.is_premium === "no"
                                ? ""
                                : `
                            <div class="premium-badge">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <g
                                  id="Subscription_for_card"
                                  data-name="Subscription for card"
                                  transform="translate(-287.001 -840.001)"
                                  class="ng-tns-c187-3"
                                >
                                  <rect
                                    id="Rectangle_9978"
                                    data-name="Rectangle 9978"
                                    width="24"
                                    height="24"
                                    transform="translate(287.001 840.001)"
                                    fill="none"
                                    class="ng-tns-c187-3"
                                  >
                                  </rect>
                                  <g
                                    id="Group_88464"
                                    data-name="Group 88464"
                                    transform="translate(292.363 842.255)"
                                    class="ng-tns-c187-3"
                                  >
                                    <path
                                      id="Path_112621"
                                      data-name="Path 112621"
                                      d="M57.05,19.23a17.128,17.128,0,0,1-2.884.078c-.243,0-.314.121-.423,0a.858.858,0,0,1-.169-.578q-.007-.743-.013-1.485c-.906-.025-1.942-.724-2.848-.862-.251-.038-.444.037-.562-.1s-.048.13-.061-.122q-.059-1.161-.1-2.322a.658.658,0,0,1,.158-.53.746.746,0,0,1,.562-.126,48.493,48.493,0,0,0,5.545.079.505.505,0,0,0,.4-.193.7.7,0,0,0,.14-.426.768.768,0,0,0-.128-.507.532.532,0,0,0-.4-.172c-1.036-.115-2.075-.257-3.115-.414a4.706,4.706,0,0,1-2.347-.986,2.918,2.918,0,0,1-.882-2.4q.011-1.042.039-2.084a3.718,3.718,0,0,1,1.017-2.551,4.13,4.13,0,0,1,2.573-1.246q.006-.764.013-1.527a.853.853,0,0,1,.17-.578c.11-.121.332-.108.576-.107A16.374,16.374,0,0,1,57.07.249a.886.886,0,0,1,.541.271.967.967,0,0,1,.2.584q.042.714.076,1.427.967.154,1.935.387a1.092,1.092,0,0,1,.562.3.9.9,0,0,1,.213.55q.089,1.094.144,2.188a.552.552,0,0,1-.152.484.772.772,0,0,1-.562.094q-2.408-.255-4.816-.3A.491.491,0,0,0,54.8,6.4a.679.679,0,0,0-.144.447.73.73,0,0,0,.146.459.559.559,0,0,0,.416.212c1.033.15,2.067.316,3.1.486a5.382,5.382,0,0,1,2.363.959,2.447,2.447,0,0,1,.878,2.157q-.025.934-.078,1.868a3.761,3.761,0,0,1-1.068,2.382A5.344,5.344,0,0,1,57.867,16.9q-.037.734-.082,1.467a.98.98,0,0,1-.2.586.89.89,0,0,1-.538.275"
                                      transform="translate(-48.283 0.002)"
                                      fill="#711abf"
                                      class="ng-tns-c187-3"
                                      ></path>
                                      <path
                                      id="Path_112622"
                                      data-name="Path 112622"
                                      d="M10.75,8.914a4.825,4.825,0,0,0-2.358-.976c-1.034-.15-2.067-.289-3.1-.407a.539.539,0,0,1-.414-.2.685.685,0,0,1-.141-.448.7.7,0,0,1,.15-.447A.531.531,0,0,1,5.3,6.25q2.408-.078,4.816.054a.756.756,0,0,0,.565-.137.683.683,0,0,0,.162-.539q-.032-1.193-.082-2.386a.894.894,0,0,0-.194-.576.873.873,0,0,0-.556-.246Q9.045,2.3,8.078,2.258q-.009-.741-.02-1.483A.871.871,0,0,0,7.884.2.7.7,0,0,0,7.351,0a16.928,16.928,0,0,0-2.8.19.857.857,0,0,0-.54.261.954.954,0,0,0-.194.585q-.039.739-.07,1.479A5.181,5.181,0,0,0,1.142,3.978,3.677,3.677,0,0,0,.066,6.4Q.02,7.346,0,8.293a2.557,2.557,0,0,0,.88,2.2,5.264,5.264,0,0,0,2.354.988c1.041.184,2.081.359,3.119.515a.556.556,0,0,1,.405.191.829.829,0,0,1,.135.522.685.685,0,0,1-.134.427.463.463,0,0,1-.4.173,48.86,48.86,0,0,1-5.545-.4.767.767,0,0,0-.559.078.519.519,0,0,0-.147.47q.064,1.056.163,2.111a.92.92,0,0,0,.217.546,1.148,1.148,0,0,0,.561.312A23.456,23.456,0,0,0,3.768,17q.033.719.072,1.438a.966.966,0,0,0,.195.586.856.856,0,0,0,.537.265,16.014,16.014,0,0,0,2.779.2.7.7,0,0,0,.53-.194.876.876,0,0,0,.173-.581q.012-.762.022-1.524a4.184,4.184,0,0,0,2.508-1.314,3.8,3.8,0,0,0,1.005-2.518q.033-1.034.048-2.068a2.838,2.838,0,0,0-.885-2.376"
                                      transform="translate(-0.001 0.001)"
                                      fill="#b579f5"
                                      class="ng-tns-c187-3"
                                      >
                                    </path>
                                  </g>
                                </g>
                              </svg>
                            </div>
                            `
                            }
                            ${isPortrait ? `<div class="category">${_item.videoid ? "Video" : "Series"}</div>` : ""}
                            <div class="show-details">
                            <div class="desc">
                                <span class="title">${isPortrait ? `${(_item.series_name || _item.title).substr(0, 14)}${(_item.series_name || _item.title).length > 14 ? "..." : ""}` : `${(_item.series_name || _item.title).substr(0, 24)}${(_item.series_name || _item.title).length > 24 ? "..." : ""}`}</span>

                                ${
                                  isPortrait
                                    ? `<div class="action-btn">
                                  <div>
                                      <div class="bg-add"></div>
                                  </div>
                                  <div>
                                      <div class="bg-share"></div>
                                  </div>
                                </div>`
                                    : ``
                                }
                            </div>
                            ${
                              isPortrait
                                ? `<div class="meta" data-series_id="${_item.series_id}">
                                    <span class="season_count"></span>
                                    <span>•</span>
                                    <span class="category_name">Reality</span>
                                    <span>•</span>
                                    <span class="language">English</span>
                                  </div>`
                                : ""
                            }
                          </div>
                        </div>
                `;
        });

        contentContainer.innerHTML += `
            <div class="content-list-carousel-container">
                <h1>${item.content_list_name}</h1>
                <div class="${isPortrait ? "tv-series" : "new-shows-coming-soon"}">
                    <div class="swiper-wrapper">
                        ${itemHtml}
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
          `;

        // add hover effect of content cards
        const swiperSlide = document.querySelectorAll(".swiper-slide");

        swiperSlide.forEach((item, index) => {
          item.addEventListener("mouseenter", async () => {
            const season_count_el = item.querySelector(".season_count");

            if (season_count_el?.dataset.is_loaded) {
              return;
            }

            // fetch season data
            const series_id = item.dataset.api_series_id;
            const season_data = await fetch(
              `${backendUrl}/season/list/${series_id}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
              },
            );

            const seasons = await season_data.json();
            const season_count = seasons.data?.seasons?.length;
            if (season_count > 0) {
              item.querySelector(".season_count").innerHTML =
                `${season_count} Season${season_count > 1 ? "s" : ""}`;
            } else {
              item.querySelector(".season_count")?.nextElementSibling.remove();

              if (item.querySelector(".season_count"))
                item.querySelector(".season_count").innerHTML = "";
            }
            if (season_count_el && season_count_el.dataset)
              season_count_el.dataset.is_loaded = 1;
          });
        });

        // init swiper
        swiper = new Swiper(
          isPortrait ? ".tv-series" : ".new-shows-coming-soon",
          isPortrait
            ? {
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
              }
            : {
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
              },
        );

        // Add hover event to play video
        const toggleImg = document.querySelectorAll(".toggleImg");

        if (toggleImg) {
          toggleImg.forEach((ele) => {
            ele.addEventListener("mouseover", (targetElement) => {
              const childNodes = ele.children;

              childNodes[0].style.display = "block";
              childNodes[1].style.display = "none";
            });

            ele.addEventListener("mouseleave", () => {
              const childNodes = ele.children;

              childNodes[0].style.display = "none";
              childNodes[1].style.display = "block";
            });
          });
        }
      }
    });
})();
