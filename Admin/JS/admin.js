document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!isLoggedIn || !currentUser) {
    alert("Please log in to access the dashboard.");
    window.location.href = "../Public/login.html";
    return;
  }

  const userDisplay = document.getElementById("userDisplay");
  const welcomeMsg = document.getElementById("welcomeMessage");

  if (userDisplay) userDisplay.textContent = currentUser.fullName;
  if (welcomeMsg) {
    welcomeMsg.innerHTML = `
      Welcome back, <strong>${currentUser.fullName}</strong><br>
      <small class="text-muted">${currentUser.email}</small>
    `;
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");
      window.location.href = "../Public/login.html";
    });
  }

  const uploadedAssessments = JSON.parse(localStorage.getItem("uploadedAssessments")) || [];
  const uploadedList = document.getElementById("uploadedList");

  if (uploadedList && uploadedAssessments.length > 0) {
    uploadedList.innerHTML = "";
    uploadedAssessments.forEach(item => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        ${item.name}
        <a href="${item.link}" class="btn btn-accent btn-sm" download>Download</a>
      `;
      uploadedList.appendChild(li);
    });
  }
});
