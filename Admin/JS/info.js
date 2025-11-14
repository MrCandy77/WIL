// Dashboard/JS/info.js
import { auth, db } from "../public/JS/firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

onAuthStateChanged(auth, async user => {
    if (!user) {
        window.location.href = "../public/login.html";
        return;
    }

    // Show name in top bar
    document.getElementById("userDisplay").textContent = user.email.split("@")[0];

    // Fetch profile from Firestore
    const snap = await getDoc(doc(db, "users", user.uid));
    if (snap.exists()) {
        const d = snap.data();
        document.getElementById("p_fullname").value = d.fullname || "";
        document.getElementById("p_username").value = d.username || "";
        document.getElementById("p_email").value    = d.email    || "";
        document.getElementById("p_mobile").value   = d.mobile   || "";
        document.getElementById("p_campus").value   = d.campus   || "";
    }
});

// Logout button (shared with admin.js)
document.getElementById("logoutBtn")?.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "../public/login.html";
});