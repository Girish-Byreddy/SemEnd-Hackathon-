import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDas3jY8AdB56Y0iqs4EklqS9sUNaWnxuU",
  authDomain: "endsem-9f701.firebaseapp.com",
  projectId: "endsem-9f701",
  storageBucket: "endsem-9f701.firebasestorage.app",
  messagingSenderId: "520295163000",
  appId: "1:520295163000:web:db452006b85ddf18c7798d",
  measurementId: "G-PHPH466XRJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);