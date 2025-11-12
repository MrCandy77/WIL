document.addEventListener("DOMContentLoaded", () => {
  // === REGISTRATION ===
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const fullName = document.getElementById("fullname").value.trim();
      const username = document.getElementById("username").value.trim();
      const mobile = document.getElementById("mobile").value.trim();
      const email = document.getElementById("email").value.trim();
      const campus = document.getElementById("campus").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const user = { fullName, username, mobile, email, campus, password };
      localStorage.setItem("registeredUser", JSON.stringify(user));
      alert("Registration successful! Please log in.");
      window.location.href = "login.html";
    });
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

      if (!storedUser) {
        alert("No user found. Please register first.");
        return;
      }

      if (storedUser.email === email && storedUser.password === password) {
        const sessionUser = {
          fullName: storedUser.fullName,
          email: storedUser.email,
          username: storedUser.username
        };
        localStorage.setItem("currentUser", JSON.stringify(sessionUser));
        localStorage.setItem("isLoggedIn", "true");

        alert(`Welcome, ${storedUser.fullName}!`);
        window.location.href = "../Admin/dashboard.html";
      } else {
        alert("Invalid email or password.");
      }
    });
  }
});