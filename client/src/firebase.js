// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "realestate-d21ce.firebaseapp.com",
  projectId: "realestate-d21ce",
  storageBucket: "realestate-d21ce.appspot.com",
  messagingSenderId: "9792961722",
  appId: "1:9792961722:web:58ff9c4288b750da289683"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);