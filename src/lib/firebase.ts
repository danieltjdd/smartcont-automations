import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDSwYilakUYWxidk0a3khs5Ce_avuthQoM",
  authDomain: "smartcont-automations.firebaseapp.com",
  projectId: "smartcont-automations",
  storageBucket: "smartcont-automations.firebasestorage.app",
  messagingSenderId: "940514881679",
  appId: "1:940514881679:web:6acbeb721f5dfdf533c0fa",
  measurementId: "G-DVZF8BZRTE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default app; 