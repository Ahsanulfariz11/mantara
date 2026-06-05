import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, push, onValue, child } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAO7psKr8pMj2JFMZw5aIkZrhQuQYC_FyA",
  authDomain: "seatiket-2ddf9.firebaseapp.com",
  databaseURL: "https://seatiket-2ddf9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "seatiket-2ddf9",
  storageBucket: "seatiket-2ddf9.firebasestorage.app",
  messagingSenderId: "157453105265",
  appId: "1:157453105265:web:941342ee4f3b801e5983d0",
  measurementId: "G-NHKYFDEENZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
let analytics = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
const db = getDatabase(app);

export { app, analytics, db, ref, set, get, push, onValue, child };
