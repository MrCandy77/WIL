document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('#loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value.trim();
      const pwd  = document.getElementById('password').value;

      const demoUser = {
        firstName: 'Gregory',
        lastName : 'Candiotes',
        studentId: '20250656',
        program  : 'eng',
        email    : email
      };

      if (email && pwd) {
        localStorage.setItem('eduTrackUser', JSON.stringify(demoUser));
        window.location.href = '../Admin/dashboard.html';
      }
    });
  }

  const regForm = document.querySelector('#registerForm');
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Registration successful – you can now login.');
      window.location.href = 'login.html';
    });
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('eduTrackUser');
      window.location.href = '../Public/login.html';
    });
  }

  const user = JSON.parse(localStorage.getItem('eduTrackUser') || 'null');
  if (user) {
    const userDisplay = document.getElementById('userDisplay');
    if (userDisplay) userDisplay.textContent = `${user.firstName} ${user.lastName}`;

    const welcomeMsg = document.getElementById('welcomeMessage');
    if (welcomeMsg) {
      welcomeMsg.innerHTML = `
        Welcome back, <strong>${user.firstName} ${user.lastName}!</strong><br>
        <small class="text-muted">Student ID: ${user.studentId} | ${user.program}</small>
      `;
    }
  } else {
    if (!location.href.includes('login.html') && !location.href.includes('register.html')) {
      window.location.href = '../Public/login.html';
    }
  }
});
