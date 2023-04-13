// import { ApiController } from './api_controller.js';

const collectDataFromForm = () => {
  const data = document.querySelectorAll('.authorization-input');

  return {
    title: data[0]?.value,
    description: data[1]?.value,
    date: data[2]?.value,
    userEmails: data[3]?.value
  };
};

const onCreateButtonClick = async () => {
  const { post } = ApiController();
  const { get } = ApiController();

  const body = collectDataFromForm();
  if (!body) return;
  
  let url = '/api/v1/users/1/users_email_id';
  let allEmails = new Map();
  let response = await get(url);

  if (response.message) {
    alert(response.message ?? 'Something went wrong');
  } else {
      response.data.forEach(element => allEmails.set(element.attributes.email, element.attributes.id));
    };

  let userEmails = body.userEmails.split(' ');
  let userIds = [];
  userEmails.forEach( element => {
    if(!allEmails.has(element)) { 
      alert(`e-mail ${element} is not a valid user e-mail`);
      return;
    };
    userIds.push(allEmails.get(element))
  });

  postData = {
    title: body.title,
    description: body.description,
    date: body.date,
    user_ids: userIds
  };

  url = '/api/v1/events';  
  response = await post(url,postData);

  if (response.message) {
    alert(response.message ?? 'Something went wrong');
  } else {
    alert('Event was successfully created');
  }
};

const createButton = document.querySelector('.create-button')
createButton.addEventListener('click', () => onCreateButtonClick());




// title: 'Morning meeting',
// description: 'Meeting on current project',
// date: Date.tomorrow,
// user_ids: [user.id]