// Helper function to get cookie value by name
function getCookie(name) {
  return document.cookie
    .split("; ")
    .reduce((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {})[name];
}

// Parse a date string into a Date object
function parseDateString(dateString) {
  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("/").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);
  return new Date(year, month - 1, day, hours, minutes);
}

// Initialize countdown logic
document.addEventListener("DOMContentLoaded", () => {
  const countdownData = getOngoingCountdown();

  if (countdownData) {
    startCountdown(countdownData);
  } else {
    alert("No countdown in progress. Redirecting to the form page.");
    window.location.href = "index.html"; // Replace with your actual form page URL
  }
});

// Retrieve ongoing countdown data from cookies
function getOngoingCountdown() {
  const countdownData = getCookie("countdownData");
  try {
    return countdownData ? JSON.parse(countdownData) : null;
  } catch {
    console.error("Invalid countdown data format.");
    return null;
  }
}

// Start the countdown
function startCountdown({ purpose, date }) {
  const actualDate = parseDateString(date);
  const countdownDate = actualDate.getTime();

  // Cache DOM elements for efficiency
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const popup = document.getElementById("confirmationPopup");

  // Update countdown purpose
  document.getElementById("countdownPurpose").textContent = purpose;

  let interval = setInterval(() => {
    const now = Date.now();
    const timeLeft = countdownDate - now;

    if (timeLeft < 0) {
      clearInterval(interval);
      handleCountdownEnd();
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Update countdown elements
    daysEl.textContent = days.toString().padStart(2, "0");
    hoursEl.textContent = hours.toString().padStart(2, "0");
    minutesEl.textContent = minutes.toString().padStart(2, "0");
    secondsEl.textContent = seconds.toString().padStart(2, "0");
  }, 1000);

  // Handle Stop Button
  document.getElementById("stop-btn").addEventListener("click", () => {
    popup.classList.remove("hidden");
  });

  // Confirmation Popup Handlers
  document.getElementById("confirmYes").addEventListener("click", () => {
    clearInterval(interval);
    clearCountdownData();
    popup.classList.add("hidden");
    window.location.href = "index.html";
  });

  document.getElementById("confirmNo").addEventListener("click", () => {
    popup.classList.add("hidden");
  });
}

// Handle countdown end
function handleCountdownEnd() {
  alert("Countdown ended!");
  clearCountdownData();
  window.location.href = "index.html";
}

// Clear countdown data from cookies
function clearCountdownData() {
  document.cookie = "countdownData=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
}