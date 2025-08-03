const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";

const btn = document.querySelector("#listen-btn");
const avatarVideo = document.querySelector("#avatar-video"); // Updated for <video> tag

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}
function toggleTheme(mode) {
    const body = document.body;

    if (mode === 'light') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }
}

function handleCommand(command) {
  if (command.includes("open youtube")) {
    speak("Opening YouTube...");
    window.open("https://www.youtube.com", "_blank");
  } else if (command.includes("open google")) {
    speak("Opening Google...");
    window.open("https://www.google.com", "_blank");
  } else if (command.includes("open facebook")) {
    speak("Opening Facebook...");
    window.open("https://www.facebook.com", "_blank");
  } else if (command.includes("open instagram")) {
    speak("Opening Instagram...");
    window.open("https://www.instagram.com", "_blank");
  } else if (command.includes("open whatsapp")) {
    speak("Opening WhatsApp...");
    window.open("https://www.whatsapp.com", "_blank");
  } else if (command.includes("what time is it")) {
  const now = new Date();
  const time = now.toLocaleTimeString();
  speak("The time is " + time);
}else if (command.includes("what is the date") || command.includes("current date")) {
  const today = new Date();
  const date = today.toDateString();
  speak("Today's date is " + date);
}else if (command.includes("tell me a joke") || command.includes("make me laugh")) {
  const jokes = [
    "Why did the computer go to the doctor? Because it had a virus!",
    "I would tell you a joke about UDP, but you might not get it.",
    "Why do programmers prefer dark mode? Because the light attracts bugs!",
    "Why was the JavaScript developer sad? Because they didn’t know how to 'null' their feelings.",
    "Why don’t skeletons fight each other? They don’t have the guts."
  ];
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  speak(randomJoke);
}else if (command.startsWith("search on google for")) {
  const query = command.replace("search on google for", "").trim();
  speak("Searching Google for " + query);
  window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
}else if (command.startsWith("play") && command.includes("on youtube")) {
  const song = command.replace("play", "").replace("on youtube", "").trim();
  speak("Playing " + song + " on YouTube");
  window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(song)}`, "_blank");
}else if (command.includes("open") && command.includes("linkedin")) {
  speak("Opening LinkedIn");
  window.open("https://www.linkedin.com", "_blank");
}else if (command.includes("open") && command.includes("linkedin")) {
  speak("Opening LinkedIn");
  window.open("https://www.linkedin.com", "_blank");
}else if (command.includes("open") && command.includes("spotify")) {
  speak("Opening Spotify");
  window.open("https://www.spotify.com", "_blank");
}else if (command.includes("set a timer for")) {
  const regex = /set a timer for (\d+) (second|seconds|minute|minutes)/;
  const match = command.match(regex);

  if (match) {
    let time = parseInt(match[1]);
    let unit = match[2];

    if (unit.includes("minute")) {
      time *= 60; 
    }

    speak(`Setting a timer for ${match[1]} ${unit}.`);

    setTimeout(() => {
      speak("Time's up! Your timer is complete.");
      alert("Time's up!");
    }, time * 1000);
  } else {
    speak("Please say the timer duration like 'Set a timer for 10 seconds'");
  }
}else if (command.includes("calculate")) {
  try {
    const expression = command.split("calculate")[1]?.replace(/plus/gi, "+")
                                                    .replace(/minus/gi, "-")
                                                    .replace(/times|multiplied by/gi, "*")
                                                    .replace(/divided by/gi, "/")
                                                    .trim();
    const result = eval(expression);
    if (!isNaN(result)) {
      speak(`The result is ${result}`);
    } else {
      speak("I couldn't understand the calculation.");
    }
  } catch (e) {
    speak("There was an error in the calculation.");
  }
}else if (command.startsWith("repeat after me")) {
  const phrase = command.replace("repeat after me", "").trim();
  if (phrase) {
    speak(phrase);
  } else {
    speak("Please say something after 'repeat after me'");
  }
}else if (command.includes("introduce yourself") || command.includes("who are you")) {
    speak("Hey! I'm AnshulAI, your virtual voice assistant, designed to make your digital life easier and more fun.");
  }else if (command.includes("who developed you") || command.includes("who made you")) {
    speak("I am developed by Anshul Bhilare");
  }else if (command.includes("switch light mode")) {
    toggleTheme('light');
    speak("Light mode activated");
} else if (command.includes("switch dark mode")) {
    toggleTheme('dark');
    speak("Dark mode activated");
}


  else {
    speak("Searching Google for " + command);
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(command)}`,
      "_blank"
    );
  }
}

btn.addEventListener("click", function () {
  speak("Yes Anshul, how can I help you?");

  setTimeout(() => {
    btn.innerHTML = "Listening...👂";
    btn.classList.add("listening");
    
    avatarVideo.src = "mic.gif.mp4"; 
    avatarVideo.play();

    recognition.start();
  }, 2500);

  recognition.onresult = (event) => {
    console.log(event);
    const command = event.results[0][0].transcript.toLowerCase();
    handleCommand(command);
  };

  recognition.onend = () => {
    btn.innerHTML = "Start Listening";
    btn.classList.remove("listening");

    avatarVideo.src = "avatar.gif.mp4"; 
    avatarVideo.play();
  };
});