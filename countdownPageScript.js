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
  
  // Retrieve countdown data from cookies
  const countdownData = JSON.parse(getCookie("countdownData"));
  if (!countdownData) {
    // Redirect back to the input page if no active countdown exists
    window.location.href = "index.html";
  }
  
  const { purpose, date } = countdownData;
  document.getElementById("countdownPurpose").textContent = purpose;
  
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const popup = document.getElementById("confirmationPopup");
  
  let interval;
  
  function startCountdown() {
    const countdownDate = new Date(date).getTime();
  
    interval = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = countdownDate - now;
  
      if (timeLeft < 0) {
        clearInterval(interval);
        alert("Countdown ended!");
        document.cookie = "countdownData=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        window.location.href = "index.html";
        return;
      }
  
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
      daysEl.textContent = days.toString().padStart(2, "0");
      hoursEl.textContent = hours.toString().padStart(2, "0");
      minutesEl.textContent = minutes.toString().padStart(2, "0");
      secondsEl.textContent = seconds.toString().padStart(2, "0");
    }, 1000);
  }
  
  document.getElementById("stop-btn").addEventListener("click", () => {
    popup.classList.remove("hidden");
  });
  
  document.getElementById("confirmYes").addEventListener("click", () => {
    clearInterval(interval);
    document.cookie = "countdownData=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    popup.classList.add("hidden");
    window.location.href = "index.html";
  });
  
  document.getElementById("confirmNo").addEventListener("click", () => {
    popup.classList.add("hidden");
  });
  
  startCountdown();

