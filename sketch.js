let cabinScene;
let mediaScene;
let mainMenu;

let currentScene;

let img;

const waves = [];
let numberOfWaves;

let taps = new Set([]);

let startScreen = true;

async function setup() {
    let container = createDiv('');
    container.id('canvas-container');
    container.style('position', 'relative');

    canvas = createCanvas(displayWidth, displayHeight);
    canvas.parent('canvas-container');

    img = await loadImage("assets/Gradient.png");

    doAudioConnection();
    text("Double Click To Enter", 100, 100);

    cabinScene = new CabinScene();
    mediaScene = new MediaScene();
    mainMenu = new MainMenu();

    currentScene = mainMenu;

    numberOfWaves = analyser.fftSize / 2;
    for (let c = 0; c < numberOfWaves; c = c + 1) {
        let f = (c + 1) / 2;
        waves[c] = new Wave(f);
    }
    // let genericScene = new Scene("Arse");
    currentScene = mainMenu;

}

function draw() {
    background(img);
    let selection = currentScene.drawScene();
    for (let tap of taps) {
        tap.update();
        if (!tap.isAlive()) {
            console.log(taps.size);
            taps.delete(tap);
        }
    }
    if (startScreen) {
        text("Double Click To Continue", 200, 200);
    }
    else {
        if (currentScene == mainMenu) {
            switch (selection) {
                case "Cabin":
                    currentScene.hideScene();
                    currentScene = cabinScene;
                    break;
                case "Media":
                    currentScene.hideScene();
                    currentScene = mediaScene;
                    break;
                default:
                    break;
            }
            currentScene.showScene();
        } else {
            if (currentScene.isBackButtonPressed()) {
                currentScene.hideScene();
                currentScene = mainMenu;
                currentScene.showScene();
            }
        }
    }
}

function mousePressed() {
    taps.add(new Ripple(mouseX, mouseY));
}

function doubleClicked() {
    fullscreen(true);
    startScreen = false;
    mainMenu.showScene;
    return false; //disable default behaviour
}