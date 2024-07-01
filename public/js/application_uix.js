document.addEventListener("DOMContentLoaded", function () {
  // Get Header Position
  const stickyHeader = document.getElementById("sticky-header");
  const stickyHeaderOffsetTop = stickyHeader.offsetTop;

  window.addEventListener("scroll", function () {
    if (parseInt(window.scrollY) > stickyHeaderOffsetTop) {
      stickyHeader.classList.add("blur");
    } else {
      stickyHeader.classList.remove("blur");
    }
  });
});

//   Show profile menu
function showProfileMenu() {
  const profileMenu = document.querySelector(".profile-menu");
  profileMenu.classList.add("shown");
}

function hideProfileMenu() {
  const profileMenu = document.querySelector(".profile-menu");
  profileMenu.classList.remove("shown");
}

// mobile side menu
const mobileMenuOpenBtn = document.querySelector(".mobile-menu-btn");

mobileMenuOpenBtn.addEventListener("click", () => {
  // body non scrollabale
  document.body.style.overflow = "hidden";

  const mobileSideMenu = document.querySelector(".mobile-side-menu-container");
  mobileSideMenu.classList.add("shown");

  const mobileMenu = document.querySelector(
    ".mobile-side-menu-container .mobile-menu",
  );

  mobileMenu.classList.add("shown");

  mobileSideMenu.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      mobileSideMenu.classList.remove("shown");
      mobileMenu.classList.remove("shown");
      document.body.style.overflow = "auto";
    }
  });
});

const searchBtn = document.querySelector(
  "header div.header ul li.search-container",
);

searchBtn.addEventListener("click", () => {
  const searchContainer = document.querySelector(
    "header div.header ul li.search-container",
  );

  // add event listener in input
  const searchInput = document.querySelector("header div.header ul li input");
  searchContainer.classList.add("opened");
  searchContainer.children[0].focus();

  const closeBtn = document.querySelector(
    "header div.header ul li.search-container.opened button.search-btn",
  );

  // Define the event handler function
  function handleCloseClick(e) {
    e.stopPropagation();
    searchContainer.classList.remove("opened");
    // Remove the event listener
    closeBtn.removeEventListener("click", handleCloseClick);
  }

  closeBtn.addEventListener("click", handleCloseClick);
});

// add event listener to search input
const inputField = document.querySelector("li.search-container input");

inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    // Perform any additional actions here
    window.location.href =
      "https://new.tronixnetwork.com/search?q=" + e.target.value + "&type=all";
  }
});
