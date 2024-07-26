// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4YK8_4TqZdHSOKz7EfXulRQbafOuuuqA",
    authDomain: "aptitudetracker.firebaseapp.com",
    projectId: "aptitudetracker",
    storageBucket: "aptitudetracker.appspot.com",
    messagingSenderId: "344372948744",
    appId: "1:344372948744:web:a6d313a048e3856c5486bd",
    measurementId: "G-2W32Y8F7MS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
