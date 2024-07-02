const signOutUrl = "https://new.tronixnetwork.com/api/users/signout";
const checkLoginUrl = "https://new.tronixnetwork.com/api/users/check_login";
const signInUrl = "https://new.tronixnetwork.com/api/users/signin";

const phpidCookie = "tronixnetworkphpid";
const phpidCookieValue = "9fbjvlk011tbjeho70hp2rctc4";
const sesssaltCookie = "tronixnetworksesssalt";
const sesssaltCookieValue = "7bb6b2de";

// ** Cookie functions **
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

// ? check if tronixnetworkauthtokenlocal is available ?
const checkLocalAuthToken = () => {
  let cookies = getCookies();
  let { tronixnetworkauthtokenlocal } = cookies;

  if (!tronixnetworkauthtokenlocal) {
    window.location.href =
      "https://new.tronixnetwork.com/passwordProtected?redirected=true";
  }
};

// ** Auth functions **

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
    checkAndSetCookie(phpidCookie, phpidCookieValue);
    checkAndSetCookie(sesssaltCookie, sesssaltCookieValue);
  });
};
// localSignIn("vertxlabsadam@gmail.com", "xkLzyhwL26EyuAb");

const checkIfUserLogin = () => {
  fetch(`${checkLoginUrl}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => {
      const phpidCookieExists = checkCookieByName(phpidCookie);
      const sesssaltCookieExists = checkCookieByName(sesssaltCookie);

      if (res.status !== 200 && !phpidCookieExists && !sesssaltCookieExists) {
        window.location.href = "https://new.tronixnetwork.com/login";
      }
    })
    .catch((error) => {
      return error;
    });
};

const signOut = () => {
  // make api call to run kick our user
  fetch(`${signOutUrl}`, {
    method: "POST",
  }).then((res) => {
    if (res.status === 200) {
      deleteCookie(phpidCookie);
      deleteCookie(sesssaltCookie);
      window.location.href = "/login";
    }
    // TODO: handle error
  });
};

// setCookie("tronixnetwork_password_entered", "Apple530!!");

// TODO: Turn on password protection
// checkPasswordProtection();

// TODO: Turn on local auth token
// checkIfUserLogin();

// @ts-ignore
window.checkIfUserLogin = checkIfUserLogin; // make available globally

// @ts-ignore
window.signOut = signOut; // make available globally
