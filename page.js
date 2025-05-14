// update the current slider value
var slider = document.getElementById("bpm-slider");
var output = document.getElementById("bpm-show");
output.innerHTML = slider.value; // display the default slider value
// refresh and show bpm
slider.oninput = function () {
  output.value = this.value + " BPM";
};

// handle pause/resume btn
const playPauseBtn = document.getElementById("play-pause-btn");
let isPaused = true;
playPauseBtn.addEventListener("click", () => {
  isPaused = !isPaused; // toggle state
  
  const icon = playPauseBtn.querySelector("i");
  if (isPaused) {
    icon.classList.replace("fa-pause", "fa-play");
    playPauseBtn.title = "Resume"; // tooltip
  } else {
    icon.classList.replace("fa-play", "fa-pause");
    playPauseBtn.title = "Pause"; // tooltip
  }
  toggleMetronome(getBpm(), getVol(), !isPaused);
});

function getVol() {
  return document.getElementById("volume-slider").value;
}

function getBpm() {
  return document.getElementById("bpm-slider").value;
}
