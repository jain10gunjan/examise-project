import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
import { getMessaging } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4YK8_4TqZdHSOKz7EfXulRQbafOuuuqA",
  authDomain: "aptitudetracker.firebaseapp.com",
  databaseURL: "https://aptitudetracker-default-rtdb.firebaseio.com",
  projectId: "aptitudetracker",
  storageBucket: "aptitudetracker.appspot.com",
  messagingSenderId: "344372948744",
  appId: "1:344372948744:web:a6d313a048e3856c5486bd",
  measurementId: "G-2W32Y8F7MS"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
export default firebaseConfig;
export const db = getFirestore(app);
