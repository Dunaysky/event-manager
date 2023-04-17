const collectDataFromForm = () => {
  return {
    title: inputElements[0]?.value,
    description: inputElements[1]?.value,
    date: inputElements[2]?.value
  };
};

const fetchAvailableUsers = async () => {
  let url = '/api/v1/users/1/users_email_id';
  let response = await get(url);

  if (response.message) {
    alert(response.message ?? 'Something went wrong');
  } else {
    response.data.forEach(element => userEmails[element.attributes.id] = element.attributes.email);
  };
}

const removeInvitedUser = id => {
  Array.from(invitedUsersList.children).find(element => {
    return element.getAttribute('user-id') === id
  }).remove()
}

const formInvitedUserBlock = (id, email) => {
  let newInvitedUser = document.createElement('div')
  const stringHtml = `<p>${email}</p>\
  <img src='/assets/CloseIcon.svg' alt="Remove" />`
  newInvitedUser.innerHTML = stringHtml
  newInvitedUser.classList.add('invited-users-list-element')
  newInvitedUser.setAttribute('user-id', id)
  newInvitedUser.lastChild.onclick = () => removeInvitedUser(id)
  return newInvitedUser;
}

const initInviteUserComponents = async () => {
  await fetchAvailableUsers();
  let inviteUserSelectorOptions = ['<option value="" class="invite-user-selector-option">Invite User</option>'];
  Object.entries(userEmails).forEach(([id, email]) => {
    inviteUserSelectorOptions.push(
      `<option value="${id}" class="invite-user-selector-option">${email}</option>`
    )
  })
  inviteUserSelector.innerHTML = inviteUserSelectorOptions.join('\n')
}

const alreadyInvitedUser = userId => {
  return Array.from(invitedUsersList.children).some(element => {
    return element.getAttribute('user-id') === userId
  })
}

const inviteUser = userId => {
  if (userId === '') return;
  inviteUserSelector.value = ''
  if (alreadyInvitedUser(userId)) return;

  const newInvitedUser = formInvitedUserBlock(userId, userEmails[userId])
  invitedUsersList.appendChild(newInvitedUser)
}

const getSelectedUserIds = () => {
  return Array.from(invitedUsersList.children).slice(1).map(element => {
    return element.getAttribute('user-id')
  })
}
