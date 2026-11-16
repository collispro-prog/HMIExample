class MainMenu extends Scene {
    constructor() {
        super("Main Menu");

        this.selection = "none";

        this.backButton.hide();

        this.cabinButton = createDiv("Cabin");
        this.cabinButton.parent('canvas-container');
        this.elements.add(this.cabinButton);
        this.cabinButton.position(200, 200);
        this.cabinButton.style("color", "Cornsilk");
        this.cabinButton.style("font-family", "helvetica");
        this.cabinButton.style("font-size", "large");
        this.cabinButton.mousePressed(() => {
            this.selection = "Cabin"
        });
        this.cabinButton.hide();

        this.mediaButton = createDiv("Media");
        this.mediaButton.parent('canvas-container');
        this.elements.add(this.mediaButton);
        this.mediaButton.position(200, 300);
        this.mediaButton.style("color", "Cornsilk");
        this.mediaButton.style("font-family", "helvetica");
        this.mediaButton.style("font-size", "large");
        this.mediaButton.mousePressed(() => {
            this.selection = "Media"
        });
        this.mediaButton.hide();
        this.heading.hide();
    }

    showScene() {
        this.backButton.hide();
        this.cabinButton.show();
        this.mediaButton.show();
        this.heading.show();
    }

    drawScene() {
        let returnValue = this.selection;
        this.selection = "none";
        return returnValue;
    }
}