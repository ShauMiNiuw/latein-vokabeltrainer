import {
    auth,
    db,
    doc,
    getDoc
} from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


onAuthStateChanged(auth, async (user) => {


    // Nicht angemeldet
    if (!user) {

        window.location.href = "index.html";
        return;

    }



    // Firestore Benutzerdaten laden
    const userDoc = await getDoc(
        doc(db, "users", user.uid)
    );


    if (!userDoc.exists()) {

        window.location.href = "index.html";
        return;

    }



    const userData = userDoc.data();



    // Nicht freigeschaltet
    if (!userData.approved) {

        window.location.href = "index.html";
        return;

    }



    const currentPage = window.location.pathname;



    // Admin-Seite absichern
    if (currentPage.includes("admin.html")) {


        if (userData.role !== "admin") {


            alert("Kein Zugriff auf diese Seite");


            window.location.href = "trainer.html";


            return;

        }

    }



    // Alles erlaubt
    console.log("Zugriff erlaubt:", currentPage);


});