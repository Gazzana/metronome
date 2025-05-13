// update the current slider value
var slider = document.getElementById("bpm-slider");
var output = document.getElementById("bpm-show");
output.innerHTML = slider.value; // display the default slider value
// refresh and show bpm
slider.oninput = function() {
  output.value = this.value + " BPM";
}

// handle pause/resume btn
const playPauseBtn = document.getElementById('play-pause-btn');
let isPaused = false;
playPauseBtn.addEventListener('click', () => {
  isPaused = !isPaused; // toggle state
  
  // Altera o ícone e o título (tooltip) do botão
  const icon = playPauseBtn.querySelector('i');
  if (isPaused) {
    icon.classList.replace('fa-pause', 'fa-play');
    playPauseBtn.title = "Resume"; // Tooltip
  } else {
    icon.classList.replace('fa-play', 'fa-pause');
    playPauseBtn.title = "Pause"; // Tooltip
  }
  
  toggleMetronome(getBpm(), getVol());
});

function getVol() {
  return document.getElementById("volume-slider").value
}

function getBpm() {
  return document.getElementById("bpm-slider").value
}