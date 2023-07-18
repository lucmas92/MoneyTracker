// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDgd0Z4bP5sVZFE2zo0w-gHaZk6k7Da_gc",
    authDomain: "moneytracker-b8da0.firebaseapp.com",
    projectId: "moneytracker-b8da0",
    storageBucket: "moneytracker-b8da0.appspot.com",
    messagingSenderId: "24467312087",
    appId: "1:24467312087:web:6ea07418d5bc172d4c8f92",
    measurementId: "G-XDKYVB8ZW2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db}