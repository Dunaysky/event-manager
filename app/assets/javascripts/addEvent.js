const { get, post } = ApiController();
const inviteUserSelector = document.querySelector('.invite-user-selector')
const invitedUsersList = document.querySelector('.invited-users-list')
const inputElements = document.querySelectorAll('.authorization-input')
const createButton = document.querySelector('.create-button')
let userNames = {};

const onCreateButtonClick = async () => {
  const resultData = collectDataFromForm();
  resultData.user_ids = getSelectedUserIds()
  const url = '/api/v1/events'
  response = await post(url, resultData);

  if (response.error) {
    addNotification('error', response.error ?? 'Something went wrong');
  } else {
    addNotification('success', 'Event created successfully');
  }
  setTimeout(
    () => window.location.href = '/',
    3000
  );
};

initInviteUserComponents();
createButton.addEventListener('click', () => onCreateButtonClick());
inviteUserSelector.addEventListener("change", () => inviteUser(inviteUserSelector.value))
