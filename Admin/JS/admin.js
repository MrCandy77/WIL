document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!isLoggedIn || !currentUser) {
    alert("Please log in to access the dashboard.");
    window.location.href = "../Public/login.html";
    return;
  }

  // Display user info
  const userDisplay = document.getElementById("userDisplay");
  const welcomeMsg = document.getElementById("welcomeMessage");

  if (userDisplay) userDisplay.textContent = currentUser.fullName;
  if (welcomeMsg) {
    welcomeMsg.innerHTML = `
      Welcome back, <strong>${currentUser.fullName}</strong><br>
      <small class="text-muted">${currentUser.email}</small>
    `;
  }

  // Logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");
      window.location.href = "../Public/login.html";
    });
  }
});