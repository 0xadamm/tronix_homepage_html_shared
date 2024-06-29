const signOutUrl = "https://new.tronixnetwork.com/api/users/kick";

const checkAuthUrl = "https://new.tronixnetwork.com/api/users/check_login";

const SignOut = () => {
  let userId = localStorage.getItem("userId");

  if (userId === null) {
    // TODO: get user id from somewhere!!!
    userId = "default user id";
  }

  // TODO: get api key from somewhere!!!
  let apiKey = "ZDdjODM2ODRhODcyMzg4YWFmMWE1ODc0YjBkZTBiY2U=";

  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("sso", "true");

  // make api call to run kick our user
  fetch(`${signOutUrl}`, {
    method: "POST",
    headers: {
      APIKEY: apiKey,
    },
    body: formData,
  }).then((res) => {
    if (res.status === 200) {
      // remove user token from local storage
      localStorage.removeItem("userToken");
      // remove user email from local storage
      localStorage.removeItem("userEmail");
      // redirect to login page
      window.location.href = "/login";
    }
    // TODO: handle error
  });
};

const AuthCheck = () => {
  fetch(`${checkAuthUrl}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => {
    // check if user is not authenticated
    if (res.status !== 200) {
      // redirect to login page
      window.location.href = "/login";
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  // Retrieve data from local storage
  const username = localStorage.getItem("vodlixTronixUsername");

  // Check if data exists in local storage
  if (username) {
    // @ts-ignore
    document.getElementById("vodlixTronixUsername").textContent = username;
  }
});

// Make sure the SignOut function is available globally
// @ts-ignore
window.SignOut = SignOut;
