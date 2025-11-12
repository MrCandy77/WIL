document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector("form");
  const loginForm = document.querySelector("form");

  if (window.location.pathname.includes("register.html") && registerForm) {
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

      localStorage.setItem("user", JSON.stringify(user));
      alert("Registration successful! You can now log in.");
      window.location.href = "login.html";
    });
  }

  if (window.location.pathname.includes("login.html") && loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser) {
        alert("No registered user found. Please register first.");
        return;
      }

      if (storedUser.email === email && storedUser.password === password) {
        alert(`Welcome back, ${storedUser.fullName}!`);
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "login.html";
      } else {
        alert("Invalid email or password.");
      }
    });
  }
});
