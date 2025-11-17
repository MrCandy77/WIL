// Admin/JS/admin.js  ← FINAL VERSION FOR GITHUB PAGES (17 Nov 2025)
import { auth, db, storage } from '../../Public/JS/firebase.js';
import { onAuthStateChanged, signOut, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { collection, query, where, getDocs, addDoc, orderBy } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

// CRITICAL FOR GITHUB PAGES
setPersistence(auth, browserSessionPersistence);  // This line fixes the login issue

onAuthStateChanged(auth, user => {
  // If not logged in AND not already on login page → redirect
  if (!user && !location.pathname.includes('login.html') && !location.pathname.includes('register.html')) {
    // Clean redirect instead of ugly alert
    window.location.href = "../../Public/login.html";
    return;
  }

  // Show username
  document.querySelectorAll('#userDisplay').forEach(el => {
    if (user) el.textContent = user.email.split('@')[0];
  });
});

// Logout everywhere
document.querySelectorAll('#logoutBtn').forEach(btn => {
  btn.onclick = () => signOut(auth).then(() => location.href = "../../Public/login.html");
});

// === UPLOAD SYSTEM (unchanged – already working) ===
const uploadBox = document.getElementById('uploadBox');
const fileInput = document.getElementById('fileUpload');
const list = document.getElementById('uploadedList') || document.getElementById('uploadedAssessmentsList');

if (uploadBox && fileInput && list) {
  uploadBox.onclick = () => fileInput.click();

  uploadBox.ondragover = e => { e.preventDefault(); uploadBox.classList.add('dragover'); };
  uploadBox.ondragleave = () => uploadBox.classList.remove('dragover');
  uploadBox.ondrop = e => {
    e.preventDefault();
    uploadBox.classList.remove('dragover');
    if (e.dataTransfer.files[0]) uploadFile(e.dataTransfer.files[0]);
  };

  document.getElementById('uploadForm')?.addEventListener('submit', e => {
    e.preventDefault();
    if (fileInput.files[0]) uploadFile(fileInput.files[0]);
  });

  async function uploadFile(file) {
    if (file.size > 25*1024*1024) return alert("File too big! Max 25MB");
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
      console.error(err);
      alert("Upload failed: " + err.message);
    }
  }

  async function loadFiles() {
    list.innerHTML = "<li class='list-group-item text-center'>Loading...</li>";
    const q = query(collection(db, "uploads"), where("userId", "==", auth.currentUser.uid), orderBy("uploadedAt", "desc"));
    const snap = await getDocs(q);
    list.innerHTML = snap.empty ? "<li class='list-group-item text-center text-muted'>No uploads yet</li>" : "";
    snap.forEach(doc => {
      const d = doc.data();
      list.innerHTML += `<li class="list-group-item bg-dark text-light d-flex justify-content-between align-items-center">
        <span>${d.fileName}</span>
        <a href="${d.fileUrl}" download class="btn btn-sm btn-accent">Download</a>
      </li>`;
    });
  }
  loadFiles();
}