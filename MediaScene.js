class MediaScene extends Scene{
    constructor(){
        super("Radio");

        this.stations = [
            {name: "BBC Radio 1", url: "https://lsn.lv/bbcradio.m3u8?station=bbc_radio_one%22&bitrate=320000%22"},
            {name: "BBC Radio 2", url: "https://lsn.lv/bbcradio.m3u8?station=bbc_radio_two%22&bitrate=320000%22"},
            {name: "BBC Radio 3", url: "https://lsn.lv/bbcradio.m3u8?station=bbc_radio_three%22&bitrate=320000%22"},
            {name: "BBC Radio 4", url: "https://lsn.lv/bbcradio.m3u8?station=bbc_radio_fourfm%22&bitrate=320000%22"},
            {name: "BBC Radio 5 Live", url: "https://lsn.lv/bbcradio.m3u8?station=bbc_radio_five_live%22&bitrate=320000%22"},
            {name: "BBC Radio 6 Music", url: "https://lsn.lv/bbcradio.m3u8?station=bbc_6music%22&bitrate=320000%22"},
            {name: "BBC World Service", url: "https://lsn.lv/bbcradio.m3u8?station=bbc_world_service%22&bitrate=320000%22"},
            {name: "CRI News Plus", url:"http://sk.cri.cn/am1008.m3u8"}
        ];
        this.stationSelection = 0;
        this.isPlaying = false;

        this.visualiserType = ["Curves", "Bars", "Scope", "Waveform"];
        this.visualiserSelection = 0;

        this.radio = createAudio(this.stations[this.stationSelection].url);
        this.radio.parent('canvas-container');
        this.radio.position(200, 250);
        this.elements.add(this.radio);
        this.audioElement = this.radio.elt;
        this.source = context.createMediaElementSource(this.audioElement);
        this.source.connect(analyser);
        this.source.connect(context.destination);
        console.log(1, this.radio.elt);           // HTMLAudioElement
        console.log(2, this.radio.elt.src);
        console.log(this.source.mediaElement === this.radio.elt);
        

        this.stationButton = createDiv("🔈 " + this.stations[this.stationSelection].name);
        this.stationButton.parent('canvas-container');
        this.elements.add(this.stationButton);
        this.stationButton.style('color', 'Cornsilk');
        this.stationButton.style('font-family', 'helvetica');
        this.stationButton.style('font-size', 'x-large');
        this.stationButton.position(300, 100);
        this.stationButton.mousePressed( ()=> {
            this.stationSelection = (this.stationSelection + 1) % this.stations.length;
            this.stationButton.html("🔈 " + this.stations[this.stationSelection].name);
            this.radio.src = this.stations[this.stationSelection].url;
            if(this.isPlaying) this.radio.play();
        });

        this.playButton = createDiv("PLAY");
        this.playButton.parent('canvas-container');
        this.elements.add(this.playButton);
        this.playButton.style('background-color', 'Cornsilk');
        this.playButton.style('font-family', 'helvetica');
        this.playButton.position(300, height - 100);
        this.playButton.style('width', '200px');
        this.playButton.style('text-align', 'center');
        this.playButton.style('padding', '10px');
        this.playButton.style('border-radius', '10px');
        this.playButton.mousePressed( ()=> {
            if(this.isPlaying){
                this.radio.stop();
                this.playButton.html("PLAY");
                this.isPlaying = false;
            } else {
                // this.restartContext();
                this.radio.play();
                this.playButton.html("STOP");
                this.isPlaying = true;
            }
        });

        this.visualiserButton = createDiv(this.visualiserType[this.visualiserSelection]);
        this.visualiserButton.parent('canvas-container');
        this.elements.add(this.visualiserButton);
        this.visualiserButton.style('background-color', 'Cornsilk');
        this.visualiserButton.style('font-family', 'helvetica');
        this.visualiserButton.position(100, height - 100);
        this.visualiserButton.style('width', '100px');
        this.visualiserButton.style('text-align', 'center');
        this.visualiserButton.style('padding', '10px');
        this.visualiserButton.style('border-radius', '10px');
        this.visualiserButton.mousePressed( () => {
            this.visualiserSelection = (this.visualiserSelection + 1) % this.visualiserType.length;
            this.visualiserButton.html(this.visualiserType[this.visualiserSelection]);
        });

        this.waveformArray = [];
        this.waveformArray.length = width - 100;
        this.waveformArray.fill(0);
        this.hideScene();
    }

    async restartContext(){
        if (context.state !== "running") {
            await context.resume();
        }
    }

    drawScene(){
        // background(128, 125, 103, 16);
        switch(this.visualiserType[this.visualiserSelection]){
            case "Curves":
                this.drawCurves();
                break;
            case "Bars":
                this.drawRect();
                break;
            case "Scope":
                this.drawOscilloscope();
                break;
            case "Waveform":
                this.drawWaveform();
                break;
            default:
                break;
        }
    }

    drawCurves(){
        analyser.fftSize = 32;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);
        for(let i = 0; i < numberOfWaves; i = i + 1){
            let amp = (dataArray[i] / 255) * height / 3;
            waves[i].display(amp);
        }
    }

    drawRect(){
        analyser.fftSize = 32;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);
        push();
        noStroke();
        let increment = (width - 50) / bufferLength;
        for(let i = 0; i < bufferLength; i = i + 1){
            let amp = (dataArray[i] / 255) * height / 3;
            let x = 25 + (increment * i);
            
            let r = map(amp, 0, height /3, 0, 255);
            let g = map(amp, 0, height /3, 255, 0);
            fill(r, g, 64);
            rect(x, height*3/4, increment, -amp);
        }
        pop();
    }

    drawOscilloscope(){
        analyser.fftSize = 1024;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);
        push();
        stroke(128, 128, 255);
        let increment = (width - 100)/bufferLength;
        for(let x = 0; x < bufferLength; x = x + 1){
            let val = ((128 - dataArray[x])/128) * height / 3;
            line((x * increment) + 50, height/2, (x * increment) + 50, height/2 + val);
        }
        pop();
    }

    drawWaveform(){
        analyser.fftSize = 32;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);
        let val = ((128 - dataArray[0])/128) * height / 3;
        this.waveformArray.shift();
        this.waveformArray.push(val);
        push();
        stroke(128, 255, 128);
        for(let x = 0; x < this.waveformArray.length; x = x + 1){
            line(x + 50, height/2, x + 50, height/2 + this.waveformArray[x]);
        }
        pop();
    }

}