// Import necessary modules and configurations from Firebase
import { auth, googleProvider } from './firebase-config.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";

// Event listener that triggers when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get references to the login and registration forms, and message elements
  const loginForm = document.querySelector('#loginForm');
  const registerForm = document.querySelector('#registerForm');
  const loginMessage = document.querySelector('#loginMessage');
  const registerMessage = document.querySelector('#registerMessage');
  const googleSignInBtn = document.querySelector('#googleSignInBtn');

  // Event listener for login form submission
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent default form submission behavior
      const email = loginForm.email.value; // Get email input value
      const password = loginForm.password.value; // Get password input value
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password); // Sign in user with email and password
        console.log('User logged in:', userCredential.user); // Log the logged-in user
        loginMessage.textContent = 'Login successful!'; // Display success message
        loginMessage.style.color = 'green';
        setTimeout(() => {
          window.location.href = 'index.html'; // Redirect to home page after login
        }, 2000);
      } catch (error) {
        console.error('Login error:', error); // Log login error
        loginMessage.textContent = `Login error: ${error.message}`; // Display error message
        loginMessage.style.color = 'red';
      }
    });
  }

  // Event listener for registration form submission
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent default form submission behavior
      const email = registerForm.email.value; // Get email input value
      const password = registerForm.password.value; // Get password input value
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Register user with email and password
        console.log('User registered:', userCredential.user); // Log the registered user
        registerMessage.textContent = 'Registration successful!'; // Display success message
        registerMessage.style.color = 'green';
        setTimeout(() => {
          window.location.href = 'login.html'; // Redirect to login page after registration
        }, 2000);
      } catch (error) {
        console.error('Registration error:', error); // Log registration error
        registerMessage.textContent = `Registration error: ${error.message}`; // Display error message
        registerMessage.style.color = 'red';
      }
    });
  }

  // Event listener for Google Sign-In button click
  if (googleSignInBtn) {
    googleSignInBtn.addEventListener('click', async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider); // Sign in with Google
        console.log('Google Sign-In successful:', result.user); // Log the signed-in user
        const message = registerForm ? registerMessage : loginMessage; // Determine which message element to update
        message.textContent = 'Google Sign-In successful!'; // Display success message
        message.style.color = 'green';
        setTimeout(() => {
          window.location.href = 'index.html'; // Redirect to home page after login/registration
        }, 2000);
      } catch (error) {
        console.error('Google Sign-In error:', error); // Log Google Sign-In error
        const message = registerForm ? registerMessage : loginMessage; // Determine which message element to update
        message.textContent = `Google Sign-In error: ${error.message}`; // Display error message
        message.style.color = 'red';
      }
    });
  }
});
