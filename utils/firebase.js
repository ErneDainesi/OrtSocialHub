// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FB_API_KEY,
  authDomain: "ortsocialhub.firebaseapp.com",
  projectId: "ortsocialhub",
  storageBucket: "ortsocialhub.appspot.com",
  messagingSenderId: "719174565863",
  appId: "1:719174565863:web:673cdf0a7bd01b667e0742"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
