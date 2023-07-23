// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB095lcu9JxeCz4NaH25M-DI_lFEygWDRY",
  authDomain: "proyectologin-v1.firebaseapp.com",
  projectId: "proyectologin-v1",
  storageBucket: "proyectologin-v1.appspot.com",
  messagingSenderId: "451277912567",
  appId: "1:451277912567:web:4cbb64164625c73cfa56f2"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore()

export { auth, db }