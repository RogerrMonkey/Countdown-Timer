var datePickerDiv = document.querySelector('.datePicker');
var cancelConfirmDate = document.getElementById('cancelConfirmDate');
var applyConfirmDate = document.getElementById('applyConfirmDate');
var selectedDateTimeSpan = document.getElementById('selectedDateTime');
var hourPicker = document.querySelector('#hour-picker');
var minutePicker = document.querySelector('#minute-picker');

let selectedDate = null;
let selectedTime = { hour: '00', minute: '00' };


cancelConfirmDate.addEventListener('click', function (e) {
    if (datePickerDiv.style.visibility === 'visible'){
        datePickerDiv.style.visibility = 'hidden';
    }
});

applyConfirmDate.addEventListener('click', function () {
    if (selectedDate) {
        const day = selectedDate.getDate().toString().padStart(2, '0'); // Pad single-digit days with leading zero
        const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0'); // Pad single-digit months with leading zero
        const year = selectedDate.getFullYear();
        const hour = hourPicker.value || '00';
        const minute = minutePicker.value || '00';
        selectedTime = { hour, minute };

        // Display the selected date and time
        const formattedDate = `${day}/${month}/${year} ${hour}:${minute}`;
        selectedDateTimeSpan.textContent = formattedDate;
        localStorage.setItem("sharedDate", formattedDate);     
    } else {
        alert('Please select a date!');
    }
});

let calendar = document.querySelector('.calendar')

const month_names = ['January', 'February', 'March', 'April', 
                     'May', 'June', 'July', 'August', 'September',
                     'October', 'November', 'December']

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    // get first day of month
    
    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        day.addEventListener('click', () => {
            const dayNumber = i - first_day.getDay() + 1;
            selectedDate = new Date(year, month, dayNumber);
            const previouslySelectedDay = calendar.querySelector('.selected');
                if (previouslySelectedDay) {
                    previouslySelectedDay.classList.remove('selected');
                }
            day.classList.add('selected')

            // Highlight the selected date
            document.querySelectorAll('.calendar-day-hover').forEach(dayEl => dayEl.classList.remove('selected-date'));
            day.classList.add('selected-date');
        });

        if (
            i - first_day.getDay() + 1 === currDate.getDate() &&
            year === currDate.getFullYear() &&
            month === currDate.getMonth()
        ) {
            day.classList.add('curr-date');
        }
        
        calendar_days.appendChild(day)
    }
}
// Add styles to the selected date
const style = document.createElement('style');
style.textContent = `
    .calendar-day-hover.selected-date {
        background-color: #007bff;
        color: white;
        border-radius: 50%;
    }
`;

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

let currDate = new Date()

let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}

generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

const populateTimePicker = () => {
    const hourPicker = document.querySelector('#hour-picker');
    const minutePicker = document.querySelector('#minute-picker');

    // Populate hours (0-23)
    for (let i = 0; i < 24; i++) {
        const hourOption = document.createElement('option');
        hourOption.value = i;
        hourOption.textContent = i.toString().padStart(2, '0'); // Pad with leading zero
        hourPicker.appendChild(hourOption);
    }
    // Populate minutes (0-59)
    for (let i = 0; i < 60; i++) {
        const minuteOption = document.createElement('option');
        minuteOption.value = i;
        minuteOption.textContent = i.toString().padStart(2, '0'); // Pad with leading zero
        minutePicker.appendChild(minuteOption);
    }
};
// Initialize Time Picker
populateTimePicker();