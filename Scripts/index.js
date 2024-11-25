var ChooseDatebtn = document.querySelector('.chooseDate');
var datePicker = document.querySelector('.datePicker');

// Check if there's an ongoing countdown when the page loads
document.addEventListener("DOMContentLoaded", function () {
  const countdownData = getOngoingCountdown();
  if (countdownData) {
    // Redirect to countdownPage.html if a countdown is ongoing
    window.location.href = "countdownPage.html";
  } else {
    // Replace the current history state to prevent navigating back
    history.replaceState(null, "", window.location.href);
  }
});

// Function to check for ongoing countdown in cookies
function getOngoingCountdown() {
  const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=');
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});

  // Check if countdownData cookie exists
  if (cookies['countdownData']) {
    try {
      const countdownData = JSON.parse(cookies['countdownData']);
      // Validate countdownData (ensure it has required fields)
      if (countdownData && countdownData.purpose && countdownData.date) {
        return countdownData; // Ongoing countdown
      }
    } catch (err) {
      console.error("Error parsing countdownData cookie:", err);
    }
  }
  return null; // No ongoing countdown
}

// Function to toggle the visibility of the date picker
function toggleDatePickerVisibility() {
  if (datePicker.style.visibility === 'hidden' || !datePicker.style.visibility) {
    datePicker.style.visibility = 'visible';
  }
}
// Attach the function to the button's click event
ChooseDatebtn.addEventListener('click', toggleDatePickerVisibility);

// Handle form submission to set countdown session
document.getElementById("countdownForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const purpose = document.getElementById("purpose").value;
  var date = localStorage.getItem("sharedDate");

  if (!date) {
    alert("Please select a date.");
    return;
  }
  const countdownData = { purpose, date };

  // Store countdownData in a cookie
  document.cookie = `countdownData=${encodeURIComponent(JSON.stringify(countdownData))}; path=/`;

  // Navigate to the countdownPage
  window.location.href = "countdownPage.html";
});
