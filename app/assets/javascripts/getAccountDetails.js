const baseUrl = 'http://127.0.0.1:3000';
const usersFirstName = document.querySelector(".user-first-name");
const usersLastName = document.querySelector(".user-last-name");
const usersEmail = document.querySelector(".user-email");

let url = `${baseUrl}/api/v1/users/1/current_user_details`
fetch(url)
  .then(response => response.json())
  .then(commits => {
    usersFirstName.innerHTML = commits.data.attributes.first_name;
    usersLastName.innerHTML = commits.data.attributes.last_name;
    usersEmail.innerHTML = commits.data.attributes.email;
  })

