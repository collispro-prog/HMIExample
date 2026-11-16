const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();

let filter;
let gain;
let analyser;
let bufferLength;

function doAudioConnection(){
    context.resume();
    console.log(context.state);

    analyser = context.createAnalyser();
    analyser.fftSize = 32;
    analyser.minDecibels = -96;
    analyser.smoothingTimeConstant = 0.4;
    bufferLength = analyser.frequencyBinCount;


    filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 400;

    gain = context.createGain();
    gain.gain.value = 0.02;
    filter.connect(context.destination);
}