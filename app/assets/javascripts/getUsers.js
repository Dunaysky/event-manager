const baseUrl = 'http://127.0.0.1:3000';
const usersFirstName = document.querySelector("#user-first-name");

// const get = (url) => {
//   return fetch(`${baseUrl}${url}`, {
//     method: 'GET',
//   })
//     .then((response) => response.json())
//     .catch((error) => error);
// };

// const response = get("/api/v1/users/1/current_user_details");
// usersFirstName.innerHTML = response;
let url = `${baseUrl}/api/v1/users/1/current_user_details`
let response = fetch(url);
if (response.ok) { // if HTTP-status is 200-299
  // get the response body (the method explained below)
  let json = response.json();
  usersFirstName.innerHTML = json;
} else {
  alert("HTTP-Error: " + response.status);
}
