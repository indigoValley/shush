

window.createAudioMeter = function createAudioMeter(audioContext,clipLevel,averaging,clipLag) {
	var processor = audioContext.createScriptProcessor(512);
	processor.onaudioprocess = volumeAudioProcess;
	processor.clipping = false;
	processor.lastClip = 0;
	processor.volume = 0;
	processor.clipLevel = clipLevel || 0.98;
	processor.averaging = averaging || 0.95;
	processor.clipLag = clipLag || 750;

	// this will have no effect, since we don't copy the input to the output,
	// but works around a current Chrome bug.
	processor.connect(audioContext.destination);

	processor.checkClipping =
		function(){
			if (!this.clipping)
				return false;
			if ((this.lastClip + this.clipLag) < window.performance.now())
				this.clipping = false;
			return this.clipping;
		};

	processor.shutdown =
		function(){
			this.disconnect();
			this.onaudioprocess = null;
		};

	return processor;
}

function volumeAudioProcess( event ) {
	var buf = event.inputBuffer.getChannelData(0);
    var bufLength = buf.length;
	var sum = 0;
    var x;

	// Do a root-mean-square on the samples: sum up the squares...
    for (var i=0; i<bufLength; i++) {
    	x = buf[i];
    	if (Math.abs(x)>=this.clipLevel) {
    		this.clipping = true;
    		this.lastClip = window.performance.now();
    	}
    	sum += x * x;
    }

    // ... then take the square root of the sum.
    var rms =  Math.sqrt(sum / bufLength);

    // Now smooth this out with the averaging factor applied
    // to the previous sample - take the max here because we
    // want "fast attack, slow release."
    this.volume = Math.max(rms, this.volume*this.averaging);
}

var audioContext = null;
var meter = null;
var canvasContext = null;
var WIDTH = 300;
var HEIGHT = 50;
var rafID = null;


export const loadVolume = (stateSetterCB) => {
	// monkeypatch Web Audio
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	
	// grab an audio context
	audioContext = new AudioContext();
	
	// Attempt to get audio input
	try {
		// monkeypatch getUserMedia
		navigator.getUserMedia =
			navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia;
	
		// ask for an audio input
		navigator.getUserMedia(
			{
				"audio": {
					"mandatory": {
						"googEchoCancellation": "false",
						"googAutoGainControl": "false",
						"googNoiseSuppression": "false",
						"googHighpassFilter": "false"
					},
					"optional": []
				},
			}, gotStream.bind(this, stateSetterCB), didntGetStream);
	} catch (e) {
		alert('getUserMedia threw exception :' + e);
	}
}





function didntGetStream() {
	alert('Stream generation failed.');
}

var mediaStreamSource = null;

function gotStream(stateSetterCB, stream) {
	// Create an AudioNode from the stream.
	mediaStreamSource = audioContext.createMediaStreamSource(stream);

	// Create a new volume meter and connect it.
	meter = window.createAudioMeter(audioContext);
	mediaStreamSource.connect(meter);

	// kick off the visual updating
	drawLoop(stateSetterCB);
}

function drawLoop(stateSetterCB, time) {
	stateSetterCB(meter.volume);
	// set up the next visual callback
	rafID = window.requestAnimationFrame(drawLoop.bind(this, stateSetterCB));
}