const { get, destroy } = ApiController();
const eventId = window.location.pathname.split('/').slice(-1)[0];
const elements = document.querySelectorAll('.entity-details-data-field-wrapper');
const userNamesElement = document.querySelector('.entity-details-data-field-with-multiple-values-wrapper');
const deleteButtonPlace = document.querySelector('.delete-button');

const removeEvent = async (id) => {
  if (window.confirm("Do you really want to delete event?")) {
    const response = await destroy(`/api/v1/events/${id}`);

    if (response.error) {
      addNotification('error', response.error ?? 'Something went wrong');
    } else {
      addNotification('success', 'Event deleted successfully');
    }
    setTimeout(
      () => window.location.href = `/`,
      3000
    );
  }
}

const putDataInForm = (response) => {
  elements[0].children[1].innerText = response.title;
  elements[1].children[1].innerText = response.description;
  elements[2].children[1].innerText = new Date(response.event_date).toDateString();
  response.invited_users.data.forEach((invitedUser) => {
    const emailText = document.createElement('p');
    emailText.innerText = invitedUser.attributes.user.data.attributes.full_name;
    userNamesElement.appendChild(emailText);
  });
  if (response.creator) {
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = "Delete event";
    deleteButton.classList.add("header-actions-secondary-button");
    deleteButton.onclick = () => removeEvent(response.id)
    deleteButtonPlace.appendChild(deleteButton);
  }
};

const getEventDetails = async () => {
  const response = await get(`/api/v1/events/${eventId}`);

  if (response.error) {
    addNotification('error', response.error ?? 'Something went wrong');
  } else {
    putDataInForm(response.data.attributes);
  }
};

getEventDetails();