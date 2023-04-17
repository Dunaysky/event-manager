const { get, post } = ApiController();
const inviteUserSelector = document.querySelector('.invite-user-selector')
const invitedUsersList = document.querySelector('.invited-users-list')
const inputElements = document.querySelectorAll('.authorization-input')
const createButton = document.querySelector('.create-button')
let userEmails = {};

const onCreateButtonClick = async () => {
  const resultData = collectDataFromForm();
  resultData.user_ids = getSelectedUserIds()
  const url = '/api/v1/events'
  response = await post(url, resultData);

  if (response.message) {
    alert(response.message ?? 'Something went wrong');
  } else {
    alert('Event was successfully created');
  }
  window.location.href = '/'
};

initInviteUserComponents();
createButton.addEventListener('click', () => onCreateButtonClick());
inviteUserSelector.addEventListener("change", () => inviteUser(inviteUserSelector.value))
