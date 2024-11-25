// Helper function to get cookie value by name
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

var ChooseDatebtn = document.querySelector('.chooseDate');
var datePicker = document.querySelector('.datePicker');

// Function to toggle the visibility of the date picker
function toggleDatePickerVisibility() {
  if (datePicker.style.visibility === 'hidden' || !datePicker.style.visibility) {
    datePicker.style.visibility = 'visible';
  }
}

// Attach the function to the button's click event
ChooseDatebtn.addEventListener('click', toggleDatePickerVisibility);

// Helper function to parse a date in DD/MM/YYYY format
function parseFormattedDate(formattedDate) {
  const [day, month, year] = formattedDate.split('/');
  return new Date(`${year}-${month}-${day}T00:00:00`);
}

// Check if there is an active countdown session
const countdownData = getCookie("countdownData");

if (countdownData) {
  // Parse the cookie value and check if it contains a valid date
  const parsedCountdownData = JSON.parse(countdownData);
  const countdownDate = parseFormattedDate(parsedCountdownData.date);
  
  // If the countdownDate is valid, redirect to the countdown page
  if (countdownDate instanceof Date && !isNaN(countdownDate)) {
    // Redirect to the countdown page if the date is valid
    window.location.href = "countdownPage.html";
  }
}

const date = localStorage.getItem("formattedDate")
console.log(date)

// Handle form submission to set countdown session
document.getElementById("countdownForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const purpose = document.getElementById("purpose").value;
  const date = localStorage.getItem("formattedDate")
  console.log(date)
  const actualDate = parseFormattedDate(date);

  if (!actualDate) {
    alert("Please select a date.");
    return;
  }

  // Save the purpose and the formatted date in the cookie
  const countdownData = { purpose, actualDate };
  document.cookie = `countdownData=${JSON.stringify(countdownData)}; path=/`;

  // Redirect to the countdown page after setting the cookie
  window.location.href = "countdownPage.html";
});
