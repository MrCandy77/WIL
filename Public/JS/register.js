// public/JS/register.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const fullname = document.getElementById("fullname").value.trim();
        const username = document.getElementById("username").value.trim();
        const mobile   = document.getElementById("mobile").value.trim();
        const email    = document.getElementById("email").value.trim();
        const campus   = document.getElementById("campus").value.trim();
        const password = document.getElementById("password").value;
        const confirm  = document.getElementById("confirm-password").value;

        if (password !== confirm) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const { createUserWithEmailAndPassword } = await import("https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js");
            const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js");

            const cred = await createUserWithEmailAndPassword(window.auth, email, password);
            const uid = cred.user.uid;

            await setDoc(doc(window.db, "users", uid), {
                fullname, username, mobile, email, campus
            });

            alert("Success! Redirecting to login...");
            window.location.href = "login.html";

        } catch (err) {
            console.error(err);
            alert("Registration failed: " + (err.message || "Unknown error"));
        }
    });
});