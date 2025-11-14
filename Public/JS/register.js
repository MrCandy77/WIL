import { auth, db } from "./firebase.js";
import { 
    createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import { 
    doc, setDoc 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const username = document.getElementById("username").value;
    const mobile = document.getElementById("mobile").value;
    const email = document.getElementById("email").value;
    const campus = document.getElementById("campus").value;
    const password = document.getElementById("password").value;

    try {
        // Create Firebase User
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCred.user;

        // Save Extra Info to Firestore
        await setDoc(doc(db, "users", user.uid), {
            fullname,
            username,
            mobile,
            email,
            campus
        });

        alert("Account created!");
        window.location.href = "login.html";

    } catch (err) {
        alert(err.message);
    }
});
