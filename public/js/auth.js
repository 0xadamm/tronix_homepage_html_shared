const signOutUrl = "https://new.tronixnetwork.com/api/users/signout";
const checkLoginUrl = "https://new.tronixnetwork.com/api/users/check_login";
const signInUrl = "https://new.tronixnetwork.com/api/users/signin";

const phpidCookie = "tronixnetworkphpid";
const phpidCookieValue = "9fbjvlk011tbjeho70hp2rctc4";
const sesssaltCookie = "tronixnetworksesssalt";
const sesssaltCookieValue = "7bb6b2de";

// ** Helper Functions
const getCookies = () => {
  const cookies = document.cookie.split("; ");
  const cookieObject = {};

  cookies.forEach((cookie) => {
    const [name, value] = cookie.split("=");
    cookieObject[name] = decodeURIComponent(value);
  });
  return cookieObject;
};

const setCookie = (name, value) => {
  document.cookie = `${name}=${value}; path=/;`;
};

const deleteCookie = (name) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

const checkCookieByName = (cookieName) => {
  let cookies = getCookies();
  let cookieValue = cookies[cookieName];

  if (!cookieValue) {
    return false; // cookie not found
  } else {
    return true; // cookie found
  }
};

const checkAndSetCookie = (name, value) => {
  let cookiesObject = getCookies();
  if (!cookiesObject?.[name]) {
    setCookie(name, value);
  }
};

const checkAndDeleteCookie = (name) => {
  let cookiesObject = getCookies();
  if (!cookiesObject?.[name]) {
    deleteCookie(name);
  }
};

const checkPasswordProtection = () => {
  let cookies = getCookies();
  let { tronixnetwork_password_entered } = cookies;

  if (!tronixnetwork_password_entered) {
    window.location.href =
      "https://new.tronixnetwork.com/passwordProtected?redirected=true";
  }
};

// TODO: Get username
const getMyDetails = () => {
  fetch("https://new.tronixnetwork.com/api/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error("Error getting username");
      }
    })
    .then((data) => {
      const menu_username = data.data.username;
      const mobile_menu_username = data.data.username;
      document.getElementById("menu-username").innerText = menu_username;
      document.getElementById("mobile-menu-username").innerText =
        mobile_menu_username;
      return menu_username;
    })
    .catch((error) => {
      document.getElementById("menu-username").innerText =
        "Error getting username";
      return error;
    });
};

// ** Utility Functions
const checkIfUserLogin = () => {
  fetch(`${checkLoginUrl}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => {
      getMyDetails();
      const phpidCookieExists = checkCookieByName(phpidCookie);
      const sesssaltCookieExists = checkCookieByName(sesssaltCookie);

      if (res.status !== 200 && !phpidCookieExists && !sesssaltCookieExists) {
        // redirect to login page
        window.location.href = "https://new.tronixnetwork.com/login";
      }
    })
    .catch((error) => {
      return error;
    });
};

const localSignIn = (username, password) => {
  fetch(`${signInUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => {
    if (res.status === 200) {
      checkAndSetCookie(phpidCookie, phpidCookieValue);
      checkAndSetCookie(sesssaltCookie, sesssaltCookieValue);
    } else {
      throw new Error("Error signing in");
    }
  });
};

const signOut = () => {
  // make api call to run kick our user
  fetch(`${signOutUrl}`, {
    method: "POST",
  }).then((res) => {
    if (res.status === 200) {
      // delete all cookies
      deleteCookie("tronixnetworkphpid");
      deleteCookie("tronixnetworksesssalt");
      window.location.href = "https://new.tronixnetwork.com/login";
    }
    // TODO: handle error
  });
};

// localSignIn("vertxlabsadam@gmail.com", "xkLzyhwL26EyuAb");
// getMyDetails();
// checkIfUserLogin();

// TODO: Turn on password protection
// checkPasswordProtection();

// TODO: Turn on local auth token
// checkIfUserLogin();

// @ts-ignore
window.signOut = signOut; // make available globally
