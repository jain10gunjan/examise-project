import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getMessaging } from "firebase/messaging";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPQCPhdk52NVKR-ej0b6MPq4-WeFjeO_A",
  authDomain: "examise-ed39a.firebaseapp.com",
  projectId: "examise-ed39a",
  storageBucket: "examise-ed39a.appspot.com",
  messagingSenderId: "107240103980",
  appId: "1:107240103980:web:fa9f25519be99329a97189",
  measurementId: "G-98YECWYFV8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const messaging = getMessaging(app);
export default firebaseConfig;
export const db = getFirestore(app);
export { auth, googleProvider, signInWithPopup, signOut };
