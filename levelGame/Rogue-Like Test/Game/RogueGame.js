const UP = 38;
const DOWN = 40;
const LEFT = 37;
const RIGHT = 39;
const SPACE = 32;

const COLISION_OFFSET = 2;
const COLISION_DETECTION_OFFSET = 10;

/**
 * @class RogueGame
 * @param GameWorldConfig
 *
 * Cette class représente le jeux et son etat actuel
 * Pour l'instant il n'y a que l'etat ou je leux tourne,
 * mais quand on voudra implémenter la pause ou d'autre menu, ca se passera ici
 */
class RogueGame{

    constructor(World){

        RogueGame.initGame(World);
        this.engine = new Engine(World.Levels.Tests);

    };

    static initGame(World) {
        frameRate(World.frameRate);
        createCanvas( World.width, World.height);
        background(51);
    };

    draw() {
        //put drawing code here
        this.engine.live();
        //engine.applyGravity();
        this.engine.draw();
    };

    get engine() {
        return this._engine;
    }

    set engine(value) {
        this._engine = value;
    }
}