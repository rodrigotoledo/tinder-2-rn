// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCv2vPlvxcjCH7U2_Dl5BFaGuf3jITkExY",
  authDomain: "tinder-rt.firebaseapp.com",
  projectId: "tinder-rt",
  storageBucket: "tinder-rt.appspot.com",
  messagingSenderId: "867429018231",
  appId: "1:867429018231:web:4da31fefc0c15345ea3472",
  measurementId: "G-P144MJWXVR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore()

export { auth, db }