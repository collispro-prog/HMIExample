class Scene{
    constructor(heading){
        this.elements = new Set([]);

        this.heading = createP(heading);
        this.heading.parent("canvas-container");
        this.elements.add(this.heading);
        this.heading.style('font-family', 'helvetica');
        this.heading.style('font-size', 'xx-large');
        this.heading.position(100, 50);
        this.heading.style('color', 'Cornsilk');

        this.backButton = createDiv("🔙");
        this.backButton.parent('canvas-container');
        this.backButton.position(width - 100, height - 100);
        this.backButton.style("text-align", "center");
        this.backButton.style("align-content", "center");
        this.backButton.style("border-radius", "10px");
        this.backButton.size(64, 64);
        this.backButton.style("background-color", "yellow");   
        this.backButton.mouseClicked( ()=> {
            this.toReturn = true;
        });
        this.elements.add(this.backButton);
    }

    hideScene(){
        for(let e of this.elements){
            e.hide();
        }
    }

    showScene(){
        for(let e of this.elements){
            e.show();
        }
    }

    isBackButtonPressed(){
        if(this.toReturn){
            this.toReturn = false;
            return true;
        }
        else return false;
    }

    drawScene(){

    }
}