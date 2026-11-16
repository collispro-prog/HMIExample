class Wave{
    constructor(f){
        this.frequency = f;
        this.phase = 0;
    }

    display(amp){
        push();
        let g = map(amp, 0, height/4, 128, 255);
        let r = map(amp, 0, height/4, 0, 192);
        stroke(r, g, 128, 8);
        strokeWeight(2);
        for(let x = 0; x < (width - 100); x = x + 1){
            let y = -amp * sin(TWO_PI * this.frequency * x/(width-100) + this.phase);
            line(x + 25, height * 0.5, x + 75, height * 0.5 + y);
        }
        pop();
        this.phase = this.phase + 0.06;
    }

}