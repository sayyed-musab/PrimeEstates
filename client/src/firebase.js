// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "primeestates-21ee4.firebaseapp.com",
  projectId: "primeestates-21ee4",
  storageBucket: "primeestates-21ee4.appspot.com",
  messagingSenderId: "403594334301",
  appId: "1:403594334301:web:390d637cb0ee171c99fdb4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
