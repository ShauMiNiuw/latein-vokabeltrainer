// Firebase SDK importieren
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyAWIbmOQoheSs2Hq8Qyknf_SFrqmp2fjgo",
  authDomain: "latein-vokabeltrainer-69fa9.firebaseapp.com",
  projectId: "latein-vokabeltrainer-69fa9",
  storageBucket: "latein-vokabeltrainer-69fa9.firebasestorage.app",
  messagingSenderId: "226078015582",
  appId: "1:226078015582:web:79d57b628292a7ea00f4cf",
  measurementId: "G-31X1VWHKJB"
};

// Firebase starten
const app = initializeApp(firebaseConfig);

// Dienste exportieren
export const auth = getAuth(app);
export const db = getFirestore(app);

export {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    collection,
    getDocs
};