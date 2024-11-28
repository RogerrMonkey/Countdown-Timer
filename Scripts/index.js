// Cache DOM Elements
const chooseDateBtn = document.querySelector(".chooseDate");
const datePicker = document.querySelector(".datePicker");
const countdownForm = document.getElementById("countdownForm");
const modalOverlay = document.getElementById('modalOverlay');


// Check for ongoing countdown on page load
document.addEventListener("DOMContentLoaded", () => {
  const countdownData = getOngoingCountdown();
  if (countdownData) {
    // Redirect to the countdown page if a countdown is ongoing
    window.location.href = "countdownPage.html";
  } else {
    // Replace the current history state to prevent navigating back
    history.replaceState(null, "", window.location.href);
  }
});

// Retrieve ongoing countdown data from cookies
function getOngoingCountdown() {
  try {
    const cookies = Object.fromEntries(
      document.cookie.split("; ").map((cookie) => {
        const [key, value] = cookie.split("=");
        return [key, decodeURIComponent(value)];
      })
    );

    if (cookies.countdownData) {
      const countdownData = JSON.parse(cookies.countdownData);

      // Validate countdown data structure
      if (countdownData?.purpose && countdownData?.date) {
        return countdownData;
      }
    }
  } catch (error) {
    console.error("Error parsing countdownData cookie:", error);
  }
  return null;
}

// Toggle date picker visibility
function toggleDatePickerVisibility() {
  const isHidden = datePicker.style.visibility === "hidden" || !datePicker.style.visibility;
  datePicker.style.visibility = isHidden ? "visible" : "hidden";
  datePicker.style.display = 'block';
  modalOverlay.style.display = 'block';
}

modalOverlay.addEventListener('click', () => {
  datePicker.style.display = 'none';
  modalOverlay.style.display = 'none';
});

// Handle date picker toggle
chooseDateBtn.addEventListener("click", toggleDatePickerVisibility);

// Handle countdown form submission
countdownForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const purpose = document.getElementById("purpose").value;
  const date = localStorage.getItem("sharedDate");

  if (!date) {
    alert("Please select a date.");
    return;
  }

  const countdownData = { purpose, date };

  // Store countdown data in cookies
  document.cookie = `countdownData=${encodeURIComponent(
    JSON.stringify(countdownData)
  )}; path=/`;

  // Redirect to the countdown page
  window.location.href = "countdownPage.html";
});