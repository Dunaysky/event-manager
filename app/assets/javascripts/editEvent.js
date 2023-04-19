const { get, put } = ApiController();
const invitedUsersWrapper = document.querySelector('.entity-details-data-field-with-multiple-values-wrapper')
const inputElements = document.querySelectorAll('.authorization-input')
const inviteUserSelector = document.querySelector('.invite-user-selector')
const invitedUsersList = document.querySelector('.invited-users-list')
const saveButton = document.querySelector('.create-button')
const eventId = window.location.pathname.split('/').slice(-2)[0];
let userNames = {};

const getEventDetails = async () => {
  const url = `/api/v1/events/${eventId}`
  const response = await get(url);

  if (response.Error) {
    addNotification('error', response.Error ?? 'Something went wrong');
  } else {
    await initInviteUserComponents();
    const eventDetails = response.data.attributes
    inputElements[0].value = eventDetails.title
    inputElements[1].value = eventDetails.description
    inputElements[2].value = eventDetails.event_date
    eventDetails.invited_users.data.forEach(event_user => {
      inviteUser(event_user.attributes.user.data.id)
    })
  }
}

const onSaveButtonClick = async () => {
  const resultData = collectDataFromForm();
  resultData.user_ids = getSelectedUserIds()
  const url = `/api/v1/events/${eventId}`
  response = await put(url, resultData);

  if (response.error) {
    addNotification('error', response.error ?? 'Something went wrong');
  } else {
    addNotification('success', 'Event saved successfully');
  }
  setTimeout(
    () => window.location.href = `/events/${eventId}`,
    3000
  );
}

getEventDetails();
saveButton.addEventListener('click', () => onSaveButtonClick());
inviteUserSelector.addEventListener('change', () => inviteUser(inviteUserSelector.value))