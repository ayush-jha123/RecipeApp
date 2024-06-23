// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "recipeapp-7d5c1.firebaseapp.com",
  projectId: "recipeapp-7d5c1",
  storageBucket: "recipeapp-7d5c1.appspot.com",
  messagingSenderId: "1017600730069",
  appId: "1:1017600730069:web:e0e22aec4b68f57105535c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);