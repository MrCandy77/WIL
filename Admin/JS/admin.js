document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    alert("Please log in first.");
    window.location.href = "../public/login.html";
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const nameParts = user.fullName.trim().split(" ");
    const formattedName = nameParts
      .map((n) => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase())
      .join(" ");
    document.getElementById("userDisplay").textContent = formattedName;
  }

  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
  }


  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      window.location.href = "../public/login.html";
    });
  }
});
