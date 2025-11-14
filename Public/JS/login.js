// public/JS/login.js
import { auth } from "./firebase.js";
import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

document.getElementById("loginForm")?.addEventListener("submit", async e => {
    e.preventDefault();

    const email    = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "../Admin/dashboard.html";  
    } catch (err) {
        alert(err.message);
    }
});