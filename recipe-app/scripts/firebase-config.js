// Import necessary modules from Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-analytics.js";

// Firebase configuration object containing keys and identifiers for your app
const firebaseConfig = {
  apiKey: "AIzaSyBSPcgDQ7TzAb53cYO5QQwvfU0oFITlmXk",        // API key for your Firebase project
  authDomain: "meal-and-recipe-planner.firebaseapp.com",   // Domain for Firebase Authentication
  projectId: "meal-and-recipe-planner",                    // Project ID
  storageBucket: "meal-and-recipe-planner.appspot.com",    // Storage bucket URL
  messagingSenderId: "256004459123",                       // Sender ID for Firebase Cloud Messaging
  appId: "1:256004459123:web:253239c6153ebd6c437806",      // App ID
  measurementId: "G-V8QCTD25ZS"                            // Measurement ID for Google Analytics
};

// Initialize Firebase app with the provided configuration
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

// Export Firebase Authentication instance for use in other parts of the application
export const auth = getAuth(app);

// Export Google Auth provider instance for use in authentication with Google
export const googleProvider = new GoogleAuthProvider();
