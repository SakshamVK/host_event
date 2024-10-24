// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // For authentication
import { getFirestore } from "firebase/firestore"; // For Firestore
import { getStorage } from "firebase/storage"; // For Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQOpVv_R76Y31Zyl0_uiDz2dkUwDLre4I",
  authDomain: "vibecheck-74652.firebaseapp.com",
  projectId: "vibecheck-74652",
  storageBucket: "vibecheck-74652.appspot.com",
  messagingSenderId: "464366207317",
  appId: "1:464366207317:web:253564d8a2a2e90f63efdc",
  measurementId: "G-19BM0QPNJC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
