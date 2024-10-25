// Import the functions you need from the SDKs you need
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSErzwYGPAMFt_Fth4Ey8eAjji_BAdEJQ",
  authDomain: "safaisathi-febc9.firebaseapp.com",
  projectId: "safaisathi-febc9",
  storageBucket: "safaisathi-febc9.appspot.com",
  messagingSenderId: "322778753757",
  appId: "1:322778753757:web:a11b39517d1c5a43524934",
  measurementId: "G-FHM0H59L0E"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };