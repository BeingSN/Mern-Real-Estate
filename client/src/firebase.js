// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "mern-esate-8e967.firebaseapp.com",
  projectId: "mern-esate-8e967",
  storageBucket: "mern-esate-8e967.appspot.com",
  messagingSenderId: "171372777761",
  appId: "1:171372777761:web:c15710df8942b02fbcae60",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
