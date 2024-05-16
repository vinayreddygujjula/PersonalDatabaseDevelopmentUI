// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC90g9Bwaw3VaTsPYB9yk9GZ2l0bxo3X2c",
    authDomain: "personal-database-374fd.firebaseapp.com",
    projectId: "personal-database-374fd",
    storageBucket: "personal-database-374fd.appspot.com",
    messagingSenderId: "976629608708",
    appId: "1:976629608708:web:92ef7ded5e579166652051"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
