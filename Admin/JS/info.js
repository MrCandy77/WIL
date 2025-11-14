import { auth, db } from "./firebase.js";
import { 
    onAuthStateChanged, signOut 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import { 
    getDoc, doc 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "../login.html";
        return;
    }

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
        const data = snap.data();

        document.getElementById("info-fullname").textContent = data.fullname;
        document.getElementById("info-username").textContent = data.username;
        document.getElementById("info-email").textContent = data.email;
        document.getElementById("info-mobile").textContent = data.mobile;
        document.getElementById("info-campus").textContent = data.campus;
    }
});

window.logout = async function () {
    await signOut(auth);
    window.location.href = "../login.html";
};
