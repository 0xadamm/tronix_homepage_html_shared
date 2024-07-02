const signOutUrl = "https://new.tronixnetwork.com/api/users/signout";

const checkLoginUrl = "https://new.tronixnetwork.com/api/users/check_login";

const signInUrl = "https://new.tronixnetwork.com/api/users/signin";

const phpidCookie = "tronixnetworkphpid";
const phpidCookieValue = "9fbjvlk011tbjeho70hp2rctc4";
const sesssaltCookie = "tronixnetworksesssalt";
const sesssaltCookieValue = "7bb6b2de";

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


// Todo: create function that {checkCookieByName} checks if cookie exists by name
const checkCookieByName = (cookieName) => {
  let cookies = getCookies();
  let cookieValue = cookies[cookieName];

  if (!cookieValue) {
    console.log("Cookie not found")
    return false; // cookie not found
  } else {
    console.log("Cookie found")
    return true; // cookie found
  }
};

// Todo: create function that {checkAndSetCookie} checks if cookie exists before setting it 
const checkAndSetCookie = (name, value) => {
  let cookiesObject = getCookies();
  if (!cookiesObject?.[name]) {
    console.log("Cookies not found")
    setCookie(name, value);
  }
};

// Todo: create function that {checkAndDeleteCookie} checks if cookie exists before deleting it
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

const checkIfUserLogin = () => {
  fetch(`${checkLoginUrl}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => {
    // Todo: if necessary auth cookies don't exist route to login page
    if (res.status !== 200) {
      // redirect to login page
      window.location.href = "/login";
    }
  });
};

const signIn = (email, password) => {
  fetch(`${signInUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
    // Todo: set necessary auth cookies for login 
  });
};

// signIn("vertxlabsadam@gmail.com", "xkLzyhwL26EyuAb");

const signOut = () => {
  // make api call to run kick our user
  fetch(`${signOutUrl}`, {
    method: "POST",
  }).then((res) => {
    if (res.status === 200) {
      // Todo: delete necessary auth cookies for logout
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
