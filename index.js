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
  
  // Check if there is an active countdown session
  const countdownData = getCookie("countdownData");
  
  if (countdownData) {
    // Redirect to the countdown page if a countdown session exists
    window.location.href = "countdownPage.html";
  }
  
  // Handle form submission to set countdown session
  document.getElementById("countdownForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const purpose = document.getElementById("purpose").value;
    const date = document.getElementById("date").value;
  
    if (!date) {
      alert("Please select a date.");
      return;
    }
  
    const countdownData = { purpose, date };
    document.cookie = `countdownData=${JSON.stringify(countdownData)}; path=/`;
    window.location.href = "countdownPage.html";
  });
  