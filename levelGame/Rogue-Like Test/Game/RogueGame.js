const UP = 38;
const DOWN = 40;
const LEFT = 37;
const RIGHT = 39;
const SPACE = 32;
const Z = 90;

const COLISION_OFFSET = 1;
const COLISION_DETECTION_OFFSET = 10;

/**
 * @class RogueGame
 * @param GameWorldConfig
 *
 * Cette class représente le jeux et son etat actuel
 * Pour l'instant il n'y a que l'etat ou je leux tourne,
 * mais quand on voudra implémenter la pause ou d'autre menu, ca se passera ici
 */
class RogueGame {

    constructor(World) {

        RogueGame.initGame(World);
        this.engine = new Engine(World.Levels.Tests, true);

        this.engine.createHUD(configHUD);

        this._pause = false;
        this.registerEvent();

    };

    registerEvent() {
        document.addEventListener('keydown', (event) => {
                const keyCode = event.keyCode;
                switch (keyCode) {
                    case 69: //spaceBar
                        this._pause = !this._pause;
                }
            }
        );
    }


    static initGame(World) {
        frameRate(World.frameRate);
        createCanvas(World.width, World.height);
        background(51);
    };

    draw() {
        if (!this._pause) {
            //put drawing code here
            this.engine.live();
            this.engine.draw();
        }
    };

    get engine() {
        return this._engine;
    }

    set engine(value) {
        this._engine = value;
    }
}