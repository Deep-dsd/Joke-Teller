const buttonEl = document.querySelector("#btn");
const audioElement = document.querySelector("#audio");

//Text to Speech API from 'VoiceRSS'

const toggleButton = () => {
  buttonEl.disabled = !buttonEl.disabled;
};

const speech = (joke) => {
  VoiceRSS.speech({
    key: "f468e0820b564036a327917fc2fae63f",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

const tellMe = (joke) => {
  speech(joke);
};

const jokeGetter = async () => {
  let joke = "";
  try {
    const resp = await fetch(
      "https://v2.jokeapi.dev/joke/Dark,Pun?blacklistFlags=sexist"
    );
    const data = await resp.json();
    if (data.type === "twopart") {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    toggleButton();
    tellMe(joke);
  } catch (error) {
    console.log(error);
  }
};

buttonEl.addEventListener("click", () => {
  jokeGetter();
});

audioElement.addEventListener("ended", toggleButton);
