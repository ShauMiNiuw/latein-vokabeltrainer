import {

    db,
    doc,
    setDoc,
    getDoc

} from "./firebase.js";


import {

    auth

} from "./firebase.js";


import {

    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";



console.log("Firebase verbunden!");



async function register(){


    const email =
    document.getElementById("email").value;


    const password =
    document.getElementById("password").value;



    try {


        const userCredential =
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );



        await setDoc(

            doc(
                db,
                "users",
                userCredential.user.uid
            ),


            {

                email: email,

                role:"user",

                approved:false,

                createdAt:
                new Date().toISOString()

            }

        );



        document.getElementById("message").textContent =
        "Registrierung erfolgreich. Warte auf Freischaltung.";



    }


    catch(error){


        document.getElementById("message").textContent =
        error.message;


    }


}




async function login(){


    const email =
    document.getElementById("email").value;


    const password =
    document.getElementById("password").value;



    try {


        const userCredential =
        await signInWithEmailAndPassword(

            auth,
            email,
            password

        );



        const uid =
        userCredential.user.uid;



        const userDoc =
        await getDoc(

            doc(
                db,
                "users",
                uid
            )

        );



        if(!userDoc.exists()){


            await signOut(auth);


            throw new Error(
                "Benutzerdaten fehlen."
            );


        }



        const userData =
        userDoc.data();



        if(!userData.approved){


            await signOut(auth);


            throw new Error(
                "Dein Konto wurde noch nicht freigeschaltet."
            );


        }



        document.getElementById("message").textContent =
        "Login erfolgreich!";



        // HIER später Trainer öffnen



    }



    catch(error){


        document.getElementById("message").textContent =
        error.message;


    }


}





document
.getElementById("registerBtn")
.addEventListener(
    "click",
    register
);



document
.getElementById("loginBtn")
.addEventListener(
    "click",
    login
);