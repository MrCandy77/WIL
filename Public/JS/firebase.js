// public/JS/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA-z0wjbC9xRWR5Ih_qyPHNSA2RaSMgPjk",
    authDomain: "edutrack-53c83.firebaseapp.com",
    projectId: "edutrack-53c83",
    storageBucket: "edutrack-53c83.firebasestorage.app",
    messagingSenderId: "1063309648434",
    appId: "1:1063309648434:web:419d8bcdaad070f9a6122b",
    measurementId: "G-1N03KS3Z4L"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);