import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDPLeWw21cmzd8guM1S16FoOQfS8fgVdBo",
    authDomain: "codefury-7486a.firebaseapp.com",
    projectId: "codefury-7486a",
    storageBucket: "codefury-7486a.appspot.com",
    messagingSenderId: "841308494381",
    appId: "1:841308494381:web:3415fffd7b17751fc5b6a4",
    measurementId: "G-12HHD929HR"
};

console.log("Firebase is being initialized");

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
console.log("Firebase initialized successfully");

const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
