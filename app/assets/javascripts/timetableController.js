const daysWrapper = document.querySelector(".timetable-grid"),
  prevButton = document.querySelector("#previous-button"),
  nextButton = document.querySelector("#next-button"),
  monthTitle = document.querySelector("#month-title"),
  todayButton = document.querySelector("#today-button");

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const formDayOfMonth = (number, { events = null, inactive = false, isToday = false }) => {
  return `<div class="timetable-day-of-month-wrapper">\
    <p class="timetable-day-of-month-title ${
      inactive ? 'timetable-day-of-month-title-inactive' : ''
    }${
      isToday ? 'timetable-today-pointer' : ''
    }">${number}</p>\
    ${events?.map(event => formEventBlock(event))?.join('') ?? ''}
  </div>`
}

const formEventBlock = event => {
  return `<a href="/events/${event.id}" class="timetable-day-of-month-event ${
    event.attributes.creator ? 'timetable-day-of-month-event-creator' : ''
  }">\
    ${event.attributes.title}\
  </a>`
}

const fetchEvents = async () => {
  const { get } = ApiController();
  let events = {};
  let url = '/api/v1/events';
  let response = await get(url);
  if (response.message) {
    alert(response.message ?? 'Something went wrong');
  } else {
    response.data.forEach(event => {
      const eventDate = new Date(event.attributes.event_date.split('-'))
      if (currMonth === eventDate.getMonth() &&
        currYear === eventDate.getFullYear()) {
          const day = eventDate.getDate();
          if (events[day])
            events[day].push(event);
          else
            events[day] = [event]
      }
    });
  };
  return events;
}

const renderCalendar = async () => {
  const firstDayofMonth = new Date(currYear, currMonth, 0).getDay(), // getting first day of month
  lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
  lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth-1).getDay(), // getting last day of month
  lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
  let elements = [];
  
  const events = await fetchEvents();
    
  daysOfWeek.forEach(name => {
    elements.push(`<div class="timetable-day-of-week-wrapper">${name}</div>`)
  })

  for (let i = firstDayofMonth - 1; i >= 0; i--) {
    elements.push(formDayOfMonth(lastDateofLastMonth - i, { inactive: true }))
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    const isToday = i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear();
    elements.push(formDayOfMonth(i, { events: events[i], isToday }));
  }
  
  let daysNextMonth = 7;
  if (elements.length <= 42) daysNextMonth+=7;
  for (let i = lastDayofMonth + 1; i < daysNextMonth; i++) {
    elements.push(formDayOfMonth(i - lastDayofMonth, { inactive: true }))
  }

  monthTitle.innerHTML = `${months[currMonth]} ${currYear}`
  daysWrapper.innerHTML = elements.join('\n');
}

const onArrowButtonClick = type => {
  currMonth = type === "prev" ? currMonth - 1 : currMonth + 1;
  if(currMonth < 0 || currMonth > 11) {
    date = new Date(currYear, currMonth, new Date().getDate());
    currYear = date.getFullYear();
    currMonth = date.getMonth();
  }

  renderCalendar();
}

const onTodayButtonClick = () => {
  date = new Date();
  currYear = date.getFullYear();
  currMonth = date.getMonth();
  renderCalendar();
}

renderCalendar();

prevButton.addEventListener('click', () => onArrowButtonClick('prev'))
nextButton.addEventListener('click', () => onArrowButtonClick('next'))
todayButton.addEventListener('click', () => onTodayButtonClick())
