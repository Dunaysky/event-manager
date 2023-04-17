const usersFirstName = document.querySelector(".user-first-name");
const usersLastName = document.querySelector(".user-last-name");
const usersEmail = document.querySelector(".user-email");
const { get } = ApiController();

const getDetails = async () => {
  let url = `/api/v1/users/1/current_user_details`
  const response = await get(url);

  if (response.message) {
    alert(response.message ?? 'Something went wrong');
  } else {
    usersFirstName.innerHTML = response.data.attributes.first_name;
    usersLastName.innerHTML = response.data.attributes.last_name;
    usersEmail.innerHTML = response.data.attributes.email;
  }
}

getDetails();
