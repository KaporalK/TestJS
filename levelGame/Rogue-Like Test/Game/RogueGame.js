const UP = 38;
const DOWN = 40;
const LEFT = 37;
const RIGHT = 39;
const SPACE = 32;
//down 40
//up 38
//Right 39
//left 37
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

    get player() {
        return this._player;
    }

    set player(value) {
        this._player = value;
    }

    get badGuy() {
        return this._badGuy;
    }

    set badGuy(value) {
        this._badGuy = value;
    }
}