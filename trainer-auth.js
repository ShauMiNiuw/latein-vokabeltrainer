import {

    db,
    doc,
    getDoc

} from "./firebase.js";


import {

    auth

} from "./firebase.js";


import {

    onAuthStateChanged,
    signOut

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";



onAuthStateChanged(auth, async (user) => {


    if(!user){

        window.location.href = "index.html";
        return;

    }



    const userDoc =
    await getDoc(
        doc(
            db,
            "users",
            user.uid
        )
    );



    if(!userDoc.exists()){


        await signOut(auth);

        window.location.href="index.html";

        return;

    }



    const data =
    userDoc.data();



    if(!data.approved){


        await signOut(auth);

        window.location.href="index.html";

        return;

    }


});