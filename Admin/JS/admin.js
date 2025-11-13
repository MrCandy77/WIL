document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!isLoggedIn || !currentUser) {
    alert("Please log in to access the dashboard.");
    window.location.href = "../Public/login.html";
    return;
  }

  const userDisplay = document.getElementById("userDisplay");
  if (userDisplay) userDisplay.textContent = currentUser.fullName;

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");
      window.location.href = "../Public/login.html";
    });
  }

  const uploadForm = document.getElementById("uploadForm");
  const fileInput = document.getElementById("fileUpload");
  const uploadedList = document.getElementById("uploadedList");
  const uploadBox = document.getElementById("uploadBox");

  if (uploadForm && fileInput && uploadedList && uploadBox) {
    uploadBox.addEventListener("click", () => fileInput.click());
    uploadBox.addEventListener("dragover", (e) => {
      e.preventDefault();
      uploadBox.classList.add("dragover");
    });
    uploadBox.addEventListener("dragleave", () => {
      uploadBox.classList.remove("dragover");
    });
    uploadBox.addEventListener("drop", (e) => {
      e.preventDefault();
      uploadBox.classList.remove("dragover");
      const file = e.dataTransfer.files[0];
      if (file) handleFileUpload(file);
    });
    uploadForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const file = fileInput.files[0];
      if (!file) return alert("Please select a file first!");
      handleFileUpload(file);
    });

    function handleFileUpload(file) {
      const uploads = JSON.parse(localStorage.getItem("userUploads")) || [];
      const fileName = file.name;
      const fakeUrl = URL.createObjectURL(file);

      uploads.push({ fileName, fileUrl: fakeUrl });
      localStorage.setItem("userUploads", JSON.stringify(uploads));
      displayUploads();
      uploadForm.reset();
    }

    function displayUploads() {
      const uploads = JSON.parse(localStorage.getItem("userUploads")) || [];
      uploadedList.innerHTML = "";

      if (uploads.length === 0) {
        uploadedList.innerHTML = `<li class="list-group-item text-center text-muted">No uploads yet...</li>`;
        return;
      }

      uploads.forEach(upload => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        li.innerHTML = `
          <span>${upload.fileName}</span>
          <a href="${upload.fileUrl}" class="btn btn-accent btn-sm" download>
            <i class="bi bi-download"></i> Download
          </a>
        `;
        uploadedList.appendChild(li);
      });
    }

    displayUploads();
  }
});
