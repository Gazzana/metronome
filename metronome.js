//
////
//// -> função toggle metronomo
////    calcular os timings
////    -> playbeep(); (enquanto nao receber o isPaused = true)
////
//// -> fun beep()
////    aqui cria o audiocontext e faz tudo
//

let audioContext;
let metronomeInterval;

// called by pause/resume btn
function toggleMetronome(bpm, vol, wtype = "sawtooth", isPaused) {
  if (isPaused=true) {
    isPaused = !isPaused
    console.log("a")
  
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    // get interval in ms
    const intervalMs = (60 / bpm) * 1000;

    playBeep(vol, wtype, true)

    let beatCount = 1;
    metronomeInterval = setInterval(() => {
        beatCount++;
        // TODO: user needs to be able to change time signature
        // one strong for each four weaks (4/4 time)
        playBeep(vol, wtype, beatCount % 4 === 1);
    }, intervalMs);

  } else {
      isPaused = true;
      clearInterval(metronomeInterval);
  }
}

// generate beep with attributes
function playBeep(vol, wtype, isAccented) {
  if (!audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  const freq = 800;
  oscillator.type = wtype;
  oscillator.frequency.value = isAccented ? freq * 2 : freq;
  
  // sound envelope
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(
    isAccented ? 0.5 : 0.3,
    audioContext.currentTime + 0.01
  );
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 0.1
  );
  
  gainNode.gain.value += vol;
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.1);
}