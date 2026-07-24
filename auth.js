import {
    db,
    doc,
    setDoc
} from "./firebase.js";
import { auth } from "./firebase.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

console.log("Firebase erfolgreich verbunden!");
console.log(auth);

async function register() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const userCredential =
            await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", userCredential.user.uid), {

            email: email,

            role: "user",

            approved: false,

            createdAt: new Date().toISOString()

        });

        alert("Registrierung erfolgreich!");

    } catch (error) {

        alert(error.message);

    }

}

async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        await signInWithEmailAndPassword(auth, email, password);

        alert("Login erfolgreich!");

    } catch (error) {

        alert(error.message);

    }

}

async function logout() {

    await signOut(auth);

}

document.getElementById("registerBtn").addEventListener("click", register);
document.getElementById("loginBtn").addEventListener("click", login);