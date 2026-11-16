class CabinScene extends Scene{
    constructor(){
        super("Fan Speed");

        this.angle = 0;
        this.fanSpeed = 2;

        this.fanButtonUp = createDiv("↑");
        this.fanButtonUp.parent('canvas-container');
        this.elements.add(this.fanButtonUp);
        this.fanButtonUp.position(250, 130);
        this.fanButtonUp.style('color', 'Cornsilk');
        this.fanButtonUp.style('font-size', '50px');
        this.fanButtonUp.mousePressed( ()=> {
            this.fanSpeed = this.fanSpeed + 1;
            this.fanSpeed = min(this.fanSpeed, 4);
            this.fanButtonLabel.html(this.fanSpeed);
        });

        this.fanButtonDown = createDiv("↓");
        this.fanButtonDown.parent('canvas-container');
        this.elements.add(this.fanButtonDown);
        this.fanButtonDown.position(250, 250);
        this.fanButtonDown.style('color', 'Cornsilk');
        this.fanButtonDown.style('font-size', '50px');
        this.fanButtonDown.mousePressed( ()=> {
            this.fanSpeed = this.fanSpeed - 1;
            this.fanSpeed = max(this.fanSpeed, 0);
            this.fanButtonLabel.html(this.fanSpeed);
        });

        this.fanButtonLabel = createDiv(this.fanSpeed.toString());
        this.fanButtonLabel.parent('canvas-container');
        this.elements.add(this.fanButtonLabel);
        this.fanButtonLabel.position(245, 185);
        this.fanButtonLabel.style('color', 'Cornsilk');
        this.fanButtonLabel.style('font-size', '65px');
        this.fanButtonLabel.style('font-family', 'helvetica');
        


        this.hideScene();
    }

    drawScene(){
        push();
        fill(192, 192);
        translate(400, 225);
        rotate(this.angle);
        triangle(0, 0, 50, 0, 50, -50);
        triangle(0, 0, -25, -50, -50, -50);
        triangle(0, 0, -50, 0, -50, 50);
        triangle(0, 0, 25, 50, 50, 50);
        this.angle = this.angle + (0.03 * this.fanSpeed);
        pop();
    }

}