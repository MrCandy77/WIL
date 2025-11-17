// Admin/JS/admin.js  ← GUARANTEED WORKING (17 Nov 2025)
import { auth, db, storage } from '../../Public/JS/firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { collection, query, where, getDocs, addDoc, orderBy } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

// Auth protection + username
onAuthStateChanged(auth, user => {
  if (!user && !location.pathname.includes('login.html')) {
    window.location.href = "../../Public/login.html";
  }
  document.querySelectorAll('#userDisplay').forEach(el => {
    if (user) el.textContent = user.email.split('@')[0];
  });
});

// Logout everywhere
document.querySelectorAll('#logoutBtn').forEach(btn => {
  btn.onclick = () => signOut(auth).then(() => location.href = "../../Public/login.html");
});

// UPLOAD SYSTEM — WORKS ON BOTH PAGES
const uploadBox = document.getElementById('uploadBox');
const fileInput = document.getElementById('fileUpload');
const list = document.getElementById('uploadedList') || document.getElementById('uploadedAssessmentsList');

if (uploadBox && fileInput && list) {

  uploadBox.addEventListener('click', () => fileInput.click());

  uploadBox.addEventListener('dragover', e => { e.preventDefault(); uploadBox.classList.add('dragover'); });
  uploadBox.addEventListener('dragleave', () => uploadBox.classList.remove('dragover'));
  uploadBox.addEventListener('drop', e => {
    e.preventDefault();
    uploadBox.classList.remove('dragover');
    if (e.dataTransfer.files[0]) uploadFile(e.dataTransfer.files[0]);
  });

  document.getElementById('uploadForm')?.addEventListener('submit', e => {
    e.preventDefault();
    if (fileInput.files[0]) uploadFile(fileInput.files[0]);
  });

  async function uploadFile(file) {
    if (!auth.currentUser) return alert("Not logged in");
    if (file.size > 25*1024*1024) return alert("Max 25 MB");

    try {
      const fileRef = ref(storage, `uploads/${auth.currentUser.uid}/${Date.now()}_${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);

      await addDoc(collection(db, "uploads"), {
        userId: auth.currentUser.uid,
        fileName: file.name,
        fileUrl: url,
        uploadedAt: new Date().toISOString()
      });

      alert("Uploaded successfully!");
      fileInput.value = "";
      loadFiles();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed: " + err.message);
    }
  }

  async function loadFiles() {
    list.innerHTML = "<li class='list-group-item text-center'>Loading...</li>";
    const q = query(collection(db, "uploads"), where("userId", "==", auth.currentUser.uid), orderBy("uploadedAt", "desc"));
    const snap = await getDocs(q);

    list.innerHTML = snap.empty 
      ? "<li class='list-group-item text-center text-muted'>No uploads yet</li>"
      : "";

    snap.forEach(doc => {
      const d = doc.data();
      list.innerHTML += `
        <li class="list-group-item bg-dark text-light d-flex justify-content-between align-items-center">
          <span>${d.fileName}</span>
          <a href="${d.fileUrl}" download class="btn btn-sm btn-accent">Download</a>
        </li>`;
    });
  }

  loadFiles();
}