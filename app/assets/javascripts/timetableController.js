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

const formDayOfMonth = (number, { inactive = false, isToday = false}) => {
  return `<div class="timetable-day-of-month-wrapper">\
    <p class="timetable-day-of-month-title ${
      inactive ? 'timetable-day-of-month-title-inactive' : ''
    }${
      isToday ? 'timetable-today-pointer' : ''
    }">${number}</p>\
  </div>`
}

const renderCalendar = () => {
  const firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
  lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
  lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
  lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
  let elements = [];

  daysOfWeek.forEach(name => {
    elements.push(`<div class="timetable-day-of-week-wrapper">${name}</div>`)
  })

  for (let i = firstDayofMonth - 1; i > 0; i--) {
    elements.push(formDayOfMonth(lastDateofLastMonth - i + 1, { inactive: true }))
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    const isToday = i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear();
    elements.push(formDayOfMonth(i, { isToday }));
  }

  for (let i = lastDayofMonth; i < 7; i++) {
    elements.push(formDayOfMonth(i - lastDayofMonth + 1, { inactive: true }))
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
