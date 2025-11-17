// Admin/JS/admin.js   ←  FINAL WORKING VERSION (17 Nov 2025)
import { auth, db, storage } from '../../Public/JS/firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { collection, query, where, getDocs, addDoc, orderBy } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

// ——— AUTH & LOGOUT (works on ALL pages) ———
onAuthStateChanged(auth, user => {
  if (!user && !location.pathname.includes('login.html')) window.location.href = "../../Public/login.html";
  document.querySelectorAll('#userDisplay').forEach(el => el.textContent = user?.email.split('@')[0] || '');
});

document.querySelectorAll('#logoutBtn').forEach(btn => {
  btn.addEventListener('click', () => signOut(auth).then(() => location.href = "../../Public/login.html"));
});

// ——— UPLOAD SYSTEM (works on BOTH uploads.html AND download.html) ———
const uploadBox   = document.getElementById('uploadBox');
const fileInput   = document.getElementById('fileUpload');
const list1       = document.getElementById('uploadedList');              // uploads.html
const list2       = document.getElementById('uploadedAssessmentsList');  // download.html
const list        = list1 || list2;

if (uploadBox && fileInput && list) {

  // Click → open file picker
  uploadBox.addEventListener('click', () => fileInput.click());

  // Drag & Drop visual feedback
  uploadBox.addEventListener('dragover',  e => { e.preventDefault(); uploadBox.classList.add('dragover'); });
  uploadBox.addEventListener('dragleave', e => { e.preventDefault(); uploadBox.classList.remove('dragover'); });
  uploadBox.addEventListener('drop', e => {
    e.preventDefault();
    uploadBox.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  });

  // Form submit
  document.getElementById('uploadForm')?.addEventListener('submit', e => {
    e.preventDefault();
    if (fileInput.files[0]) uploadFile(fileInput.files[0]);
  });

  async function uploadFile(file) {
    if (file.size > 25*1024*1024) return alert("File too big! Max 25 MB");

    try {
      const storageRef = ref(storage, `uploads/${auth.currentUser.uid}/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

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

  // Load files (runs on both pages)
  async function loadFiles() {
    list.innerHTML = "<li class='list-group-item text-center'>Loading...</li>";
    const q = query(collection(db, "uploads"), where("userId", "==", auth.currentUser.uid), orderBy("uploadedAt", "desc"));
    const snap = await getDocs(q);

    if (snap.empty) {
      list.innerHTML = "<li class='list-group-item text-center text-muted'>No files uploaded yet</li>";
      return;
    }

    list.innerHTML = "";
    snap.forEach(doc => {
      const d = doc.data();
      const li = document.createElement("li");
      li.className = "list-group-item bg-dark text-light d-flex justify-content-between align-items-center";
      li.innerHTML = `<span>${d.fileName}</span>
                      <a href="${d.fileUrl}" download class="btn btn-sm btn-accent">Download</a>`;
      list.appendChild(li);
    });
  }

  loadFiles();   // ← run immediately when page loads
}