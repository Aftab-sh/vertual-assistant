let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB"; 
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 18) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

window.addEventListener("load", () => {
    wishMe();
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!speechRecognition) {
    alert("Speech recognition is not supported in this browser.");
} else {
    let recognition = new speechRecognition();
    recognition.onresult = (event) => {
        let currentIndex = event.resultIndex;
        let transcript = event.results[currentIndex][0].transcript;
        content.innerText = transcript;
        takeCommand(transcript.toLowerCase());
    };
          
    btn.addEventListener("click", () => {
        recognition.start();
        btn.style.display = "none";
        voice.style.display = "block";
    });
}

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello") || message.includes("hi")) {
        speak("Hello sir, what can I help you with?");
    } else if (message.includes("who are you")) {
        speak("I am a nova,created by Tech Titans");
    } else if (message.includes("what is the time") || message.includes("time")) {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let timeString = `The time is ${hours} ${minutes < 10 ? "oh" : ""} ${minutes}`;
        speak(timeString);
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com/","_black");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook");
        window.open("https://www.facebook.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google");
        window.open("https://www.google.com/", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram");
        window.open("https://www.instagram.com/", "_blank");
    } else if (message.includes("open calculator")) {
        speak("Opening calculator...");
        window.open("https://www.calculator.net/", "_blank");
    }
    else if (message.includes("open calendar")) {
        speak("Opening calendar...");
        window.open("https://calendar.google.com/calendar/u/0/r", "_blank");
    }
    else if (message.includes("open spotify")) {
        speak("Opening spotify...");
        window.open("https://open.spotify.com/", "_blank");
    } else if (message.includes("open anime")) {
        speak("Opening anime...");
        window.open("https://hianime.to//", "_blank");
    }else if (message.includes("open chatgpt")) {
        speak("Opening chatgpt...");
        window.open("https://chatgpt.com/", "_blank");
    }else if (message.includes("open google")) {
        speak("Opening google...");
        window.open("https://google.com/", "_blank");
    }else{
        let finalText = `This is what I found on the internet regarding ${message.replace("nova", "")}`;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("nova", "")}`, "_blank");
    }
}
