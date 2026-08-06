/******************************************************************
 *                 LATEIN VOKABELTRAINER
 *                       COMMON.JS
 *
 * Gemeinsame Funktionen für alle Seiten
 *
 * - Theme
 * - Soundeffekte
 * - Soundmenü
 * - Navigation
 * - Initialisierung
 *
 ******************************************************************/

/******************************************************************
 *                      HILFSFUNKTIONEN
 ******************************************************************/

function $(id){
    return document.getElementById(id);
}


/******************************************************************
 *                           AUDIO
 ******************************************************************/

let audioCtx = null;

let soundEffectsEnabled = true;
let musicEnabled = true;


function getAudioContext(){

    if(!audioCtx){

        audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    }

    return audioCtx;

}


function getBgMusic(){

    return document.getElementById("bg-music");

}


/******************************************************************
 *                     SOUND EFFECTS
 ******************************************************************/

function playSound(type){

    if(!soundEffectsEnabled) return;

    const audioCtx = getAudioContext();

    try{

        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);



        /* ---------------- CORRECT ---------------- */

        if(type==="correct"){

            osc.type="triangle";

            osc.frequency.setValueAtTime(
                523.25,
                audioCtx.currentTime
            );

            osc.frequency.setValueAtTime(
                659.25,
                audioCtx.currentTime+0.12
            );

            osc.frequency.setValueAtTime(
                783.99,
                audioCtx.currentTime+0.24
            );

            gainNode.gain.setValueAtTime(
                0.3,
                audioCtx.currentTime
            );

            gainNode.gain.exponentialRampToValueAtTime(
                0.01,
                audioCtx.currentTime+0.5
            );

            osc.start();

            osc.stop(
                audioCtx.currentTime+0.5
            );

        }



        /* ---------------- PARTIAL ---------------- */

        else if(type==="partial"){

            osc.type="sine";

            osc.frequency.setValueAtTime(
                440,
                audioCtx.currentTime
            );

            osc.frequency.setValueAtTime(
                554.37,
                audioCtx.currentTime+0.15
            );

            gainNode.gain.setValueAtTime(
                0.2,
                audioCtx.currentTime
            );

            gainNode.gain.exponentialRampToValueAtTime(
                0.01,
                audioCtx.currentTime+0.4
            );

            osc.start();

            osc.stop(
                audioCtx.currentTime+0.4
            );

        }



        /* ---------------- WRONG ---------------- */

        else if(type==="wrong"){

            osc.type="sawtooth";

            osc.frequency.setValueAtTime(
                180,
                audioCtx.currentTime
            );

            osc.frequency.exponentialRampToValueAtTime(
                100,
                audioCtx.currentTime+0.3
            );

            gainNode.gain.setValueAtTime(
                0.3,
                audioCtx.currentTime
            );

            gainNode.gain.exponentialRampToValueAtTime(
                0.01,
                audioCtx.currentTime+0.35
            );

            osc.start();

            osc.stop(
                audioCtx.currentTime+0.35
            );

        }



        /* ---------------- CLICK ---------------- */

        else if(type==="click"){

            osc.type="sine";

            osc.frequency.setValueAtTime(
                800,
                audioCtx.currentTime
            );

            gainNode.gain.setValueAtTime(
                0.12,
                audioCtx.currentTime
            );

            gainNode.gain.exponentialRampToValueAtTime(
                0.01,
                audioCtx.currentTime+0.08
            );

            osc.start();

            osc.stop(
                audioCtx.currentTime+0.08
            );

        }



        /* ---------------- SUCCESS ---------------- */

        else if(type==="success"){

            osc.type="triangle";

            osc.frequency.setValueAtTime(
                523,
                audioCtx.currentTime
            );

            osc.frequency.setValueAtTime(
                659,
                audioCtx.currentTime+0.15
            );

            osc.frequency.setValueAtTime(
                784,
                audioCtx.currentTime+0.30
            );

            osc.frequency.setValueAtTime(
                1046,
                audioCtx.currentTime+0.45
            );

            gainNode.gain.setValueAtTime(
                0.35,
                audioCtx.currentTime
            );

            gainNode.gain.exponentialRampToValueAtTime(
                0.01,
                audioCtx.currentTime+0.8
            );

            osc.start();

            osc.stop(
                audioCtx.currentTime+0.8
            );

        }

        /* ---------------- FAIL ---------------- */

        else if(type==="fail"){

            osc.type="sawtooth";

            osc.frequency.setValueAtTime(
                300,
                audioCtx.currentTime
            );

            osc.frequency.setValueAtTime(
                220,
                audioCtx.currentTime+0.2
            );

            osc.frequency.setValueAtTime(
                150,
                audioCtx.currentTime+0.4
            );

            gainNode.gain.setValueAtTime(
                0.3,
                audioCtx.currentTime
            );

            gainNode.gain.exponentialRampToValueAtTime(
                0.01,
                audioCtx.currentTime+0.7
            );

            osc.start();

            osc.stop(
                audioCtx.currentTime+0.7
            );

        }



        /* ---------------- ACHIEVEMENT ---------------- */

        else if(type==="achievement"){

            osc.type="triangle";

            osc.frequency.setValueAtTime(
                523,
                audioCtx.currentTime
            );

            osc.frequency.setValueAtTime(
                659,
                audioCtx.currentTime+0.1
            );

            osc.frequency.setValueAtTime(
                784,
                audioCtx.currentTime+0.2
            );

            osc.frequency.setValueAtTime(
                1046,
                audioCtx.currentTime+0.3
            );

            osc.frequency.setValueAtTime(
                1318,
                audioCtx.currentTime+0.4
            );

            gainNode.gain.setValueAtTime(
                0.35,
                audioCtx.currentTime
            );

            gainNode.gain.exponentialRampToValueAtTime(
                0.01,
                audioCtx.currentTime+1
            );

            osc.start();

            osc.stop(
                audioCtx.currentTime+1
            );

        }

    }

    catch(e){}

}




/******************************************************************
 *                      SOUNDMENÜ
 ******************************************************************/

function createSoundMenu(){

    if($("sound-menu")) return;

    document.body.insertAdjacentHTML(

        "beforeend",

`
<div id="sound-menu" style="display:none;">

    <div class="audio-settings-grid">

        <button class="main-btn" onclick="setAudioMode('all')">
            🔊 Alles an
        </button>

        <button class="main-btn" onclick="setAudioMode('musicOff')">
            🔔 Nur Effekte
        </button>

        <button class="main-btn" onclick="setAudioMode('effectsOff')">
            🎵 Nur Musik
        </button>

        <button class="main-btn" onclick="setAudioMode('mute')">
            🔇 Alles aus
        </button>

    </div>

</div>

`

    );

}




function openSoundMenu(){

    const menu=$("sound-menu");

    if(!menu) return;

    menu.style.display=

    menu.style.display==="block"

    ? "none"

    : "block";

}




function closeSoundMenu(){

    const menu=$("sound-menu");

    if(menu){

        menu.style.display="none";

    }

}




function hideAllPopups(){

    closeSoundMenu();

}




function setAudioMode(mode){

    localStorage.setItem(
        "audioMode",
        mode
    );

    const bgMusic=getBgMusic();

    switch(mode){

        case "all":

            soundEffectsEnabled=true;
            musicEnabled=true;

            if(bgMusic)
                bgMusic.muted=false;

        break;



        case "musicOff":

            soundEffectsEnabled=true;
            musicEnabled=false;

            if(bgMusic)
                bgMusic.muted=true;

        break;



        case "effectsOff":

            soundEffectsEnabled=false;
            musicEnabled=true;

            if(bgMusic)
                bgMusic.muted=false;

        break;



        case "mute":

            soundEffectsEnabled=false;
            musicEnabled=false;

            if(bgMusic)
                bgMusic.muted=true;

        break;

    }

    closeSoundMenu();

}




/******************************************************************
 *                         THEME
 ******************************************************************/

function toggleTheme(){

    if(
        document.documentElement.getAttribute("data-theme")==="dark"
    ){

        document.documentElement.removeAttribute("data-theme");

        localStorage.setItem(
            "theme",
            "light"
        );

    }

    else{

        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );

        localStorage.setItem(
            "theme",
            "dark"
        );

    }

    updateThemeButton();

}




function updateThemeButton(){

    const button=$("themeButton");

    if(!button) return;

    button.textContent=

    document.documentElement.getAttribute("data-theme")==="dark"

    ? "🌓"

    : "🌗";

}

/******************************************************************
 *                      NAVIGATION
 ******************************************************************/

function openAccount(){

    playSound("click");

    setTimeout(()=>{

        window.location.href="account.html";

    },150);

}



function goTrainer(){

    playSound("click");

    setTimeout(()=>{

        window.location.href="trainer.html";

    },150);

}



function goAdmin(){

    playSound("click");

    setTimeout(()=>{

        window.location.href="admin.html";

    },150);

}



function goHome(){

    playSound("click");

    setTimeout(()=>{

        window.location.href="index.html";

    },150);

}




/******************************************************************
 *                BUTTON-SOUNDS REGISTRIEREN
 ******************************************************************/

function registerButtonSounds(){

    document.addEventListener("click",(e)=>{

        const button=e.target.closest("button");

        if(!button) return;

        if(
            button.id==="btn-mute"
            ||
            button.closest("#sound-menu")
        ){
            return;
        }

        playSound("click");

    });

}




/******************************************************************
 *                POPUPS SCHLIESSEN
 ******************************************************************/

document.addEventListener("click",(e)=>{

    const menu=$("sound-menu");

    if(!menu) return;

    if(

        !menu.contains(e.target)
        &&

        e.target.id!=="btn-mute"

    ){

        closeSoundMenu();

    }

});




/******************************************************************
 *                    COMMON UI
 ******************************************************************/

function createCommonUI(){

    const card = document.querySelector(".card");

card.insertAdjacentHTML("beforeend", `
<div id="sound-menu">
...
</div>
`);

    if(!card) return;



    /* Home Button */

    if(document.body.dataset.home==="true"){

        card.insertAdjacentHTML(

            "afterbegin",

`
<button
class="icon-toggle-btn home-button"
onclick="goTrainer()"
title="Trainer">
🏛️
</button>

`

        );

    }



    /* Top Controls */

    if(!$("themeButton")){

        card.insertAdjacentHTML(

            "afterbegin",

`
<div class="top-controls">

<button
class="icon-toggle-btn"
id="btn-mute"
onclick="openSoundMenu()"
title="Audio">
🔊
</button>

<button
class="icon-toggle-btn"
id="themeButton"
onclick="toggleTheme()"
title="Design wechseln">
🌗
</button>

</div>

`

        );

    }



    /* Account */

    if(document.body.dataset.account==="true"){

        card.insertAdjacentHTML(

            "afterbegin",

`
<div class="account-control">

<button
class="icon-toggle-btn"
onclick="openAccount()"
title="Account">

👤

</button>

</div>

`

        );

    }

}




/******************************************************************
 *                  INITIALISIERUNG
 ******************************************************************/

document.addEventListener("DOMContentLoaded",()=>{

    createSoundMenu();

    createCommonUI();



    /* ---------- Theme ---------- */

    if(localStorage.getItem("theme")==="dark"){

        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );

    }

    else{

        document.documentElement.removeAttribute(
            "data-theme"
        );

    }

    updateThemeButton();



    /* ---------- Audio ---------- */

    const audioMode=

    localStorage.getItem("audioMode")

    ||

    "all";

    setAudioMode(audioMode);



    /* ---------- Buttons ---------- */

    registerButtonSounds();



    /* ---------- ESC schließt Popups ---------- */

    document.addEventListener("keydown",(e)=>{

        if(e.key==="Escape"){

            hideAllPopups();

        }

    });

});




/******************************************************************
 *               GLOBALE FUNKTIONEN
 ******************************************************************/

window.playSound=playSound;

window.toggleTheme=toggleTheme;

window.updateThemeButton=updateThemeButton;

window.openSoundMenu=openSoundMenu;

window.closeSoundMenu=closeSoundMenu;

window.setAudioMode=setAudioMode;

window.hideAllPopups=hideAllPopups;

window.openAccount=openAccount;

window.goTrainer=goTrainer;

window.goHome=goHome;

window.goAdmin=goAdmin;