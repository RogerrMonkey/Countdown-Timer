// Cache DOM Elements
const datePickerDiv = document.querySelector('.datePicker');
const cancelConfirmDate = document.getElementById('cancelConfirmDate');
const applyConfirmDate = document.getElementById('applyConfirmDate');
const selectedDateTimeSpan = document.getElementById('selectedDateTime');
const hourPicker = document.querySelector('#hour-picker');
const minutePicker = document.querySelector('#minute-picker');
const calendar = document.querySelector('.calendar');
const monthPicker = calendar.querySelector('#month-picker');
const monthList = calendar.querySelector('.month-list');
const calendarDays = calendar.querySelector('.calendar-days');
const calendarHeaderYear = calendar.querySelector('#year');

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

let selectedDate = null;
let selectedTime = { hour: '00', minute: '00' };
let currDate = new Date();
let currMonth = { value: currDate.getMonth() };
let currYear = { value: currDate.getFullYear() };

// Utility Functions
const isLeapYear = (year) => 
  (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

const getFebDays = (year) => (isLeapYear(year) ? 29 : 28);

// Event Handlers
cancelConfirmDate.addEventListener('click', () => {
  if (datePickerDiv.style.visibility === 'visible') {
    datePickerDiv.style.visibility = 'hidden';
    datePicker.style.display = 'none';
    modalOverlay.style.display = 'none';
  }
});

applyConfirmDate.addEventListener('click', () => {
  if (!selectedDate) {
    alert('Please select a date!');
    return;
  }

  const day = selectedDate.getDate().toString().padStart(2, '0');
  const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
  const year = selectedDate.getFullYear();
  const hour = hourPicker.value || '00';
  const minute = minutePicker.value || '00';
  selectedTime = { hour, minute };

  const selectedDateTime = new Date(year, selectedDate.getMonth(), day, parseInt(hour), parseInt(minute));
  const currentDateTime = new Date();

  if (selectedDateTime < currentDateTime) {
    alert('Please select a date in the future!');
    return;
  }

  const formattedDate = `${day}/${month}/${year} ${hour}:${minute}`;
  selectedDateTimeSpan.textContent = formattedDate;
  localStorage.setItem("sharedDate", formattedDate);
});

// Calendar Generation
const generateCalendar = (month = currMonth.value, year = currYear.value) => {
  calendarDays.innerHTML = '';

  const daysOfMonth = [
    31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
  ];
  const firstDay = new Date(year, month, 1).getDay();

  monthPicker.textContent = monthNames[month];
  calendarHeaderYear.textContent = year;

  for (let i = 0; i < daysOfMonth[month] + firstDay; i++) {
    const day = document.createElement('div');

    if (i >= firstDay) {
      const dayNumber = i - firstDay + 1;
      day.textContent = dayNumber;
      day.classList.add('calendar-day-hover');
      day.innerHTML += `<span></span>
                        <span></span>
                        <span></span>
                        <span></span>`
      if (
        dayNumber === currDate.getDate() &&
        year === currDate.getFullYear() &&
        month === currDate.getMonth()
      ) {
        day.classList.add('curr-date');
      }

      day.addEventListener('click', () => {
        selectedDate = new Date(year, month, dayNumber);

        // Highlight the selected date
        calendar.querySelectorAll('.calendar-day-hover').forEach(el => el.classList.remove('selected-date'));
        day.classList.add('selected-date');
      });
    }

    calendarDays.appendChild(day);
  }
};

// Populate Month List
monthNames.forEach((name, index) => {
  const month = document.createElement('div');
  month.innerHTML = `<div data-month="${index}">${name}</div>`;
  month.querySelector('div').addEventListener('click', () => {
    monthList.classList.remove('show');
    generateCalendar(index, currYear.value);
  });
  monthList.appendChild(month);
});

// Populate Time Pickers
const populateTimePicker = () => {
  for (let i = 0; i < 24; i++) {
    const hourOption = document.createElement('option');
    hourOption.value = i.toString().padStart(2, '0');
    hourOption.textContent = hourOption.value;
    hourPicker.appendChild(hourOption);
  }

  for (let i = 0; i < 60; i++) {
    const minuteOption = document.createElement('option');
    minuteOption.value = i.toString().padStart(2, '0');
    minuteOption.textContent = minuteOption.value;
    minutePicker.appendChild(minuteOption);
  }
};

// Navigation Handlers
document.querySelector('#prev-year').addEventListener('click', () => {
  currYear.value--;
  generateCalendar(currMonth.value, currYear.value);
});

document.querySelector('#next-year').addEventListener('click', () => {
  currYear.value++;
  generateCalendar(currMonth.value, currYear.value);
});

monthPicker.addEventListener('click', () => {
  monthList.classList.toggle('show');
});

// Add Selected Date Styling
const style = document.createElement('style');
style.textContent = `
  .calendar-day-hover.selected-date {
    background-color: #007bff;
    color: white;
    border-radius: 50%;
  }
`;
document.head.appendChild(style); 

// Initialization
populateTimePicker();
generateCalendar();