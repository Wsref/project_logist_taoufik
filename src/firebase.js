import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCQDuOzjkW4xwtePT3k2a2lcCR0JLbSLyA",
    authDomain: "apiapp-74cd5.firebaseapp.com",
    projectId: "apiapp-74cd5",
    storageBucket: "apiapp-74cd5.firebasestorage.app",
    messagingSenderId: "892055524294",
    appId: "1:892055524294:web:1f3b5319b8ba4626d098c7",
    measurementId: "G-KL2301BPPM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage(app);



