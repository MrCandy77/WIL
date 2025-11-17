// Public/JS/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyA-z0wjbC9xRWR5Ih_qyPHNSA2RaSMgPjk",
  authDomain: "edutrack-53c83.firebaseapp.com",
  projectId: "edutrack-53c83",
  storageBucket: "edutrack-53c83.firebasestorage.app",
  messagingSenderId: "1063309648434",
  appId: "1:1063309648434:web:ec41f5a8d3b65988a6122b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);