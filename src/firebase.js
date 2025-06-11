// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCWriV-A3nqTIGS3Pa_cUH1TUMsvnD9cmg",
    authDomain: "foodie-91f32.firebaseapp.com",
    projectId: "foodie-91f32",
    storageBucket: "foodie-91f32.firebasestorage.app",
    messagingSenderId: "529989801428",
    appId: "1:529989801428:web:0fdddff2868622d31e7241"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
