class Player extends AnnimatedObject {

    constructor(posY, posX, veloX, veloY, alphaBounce) {
        super(posY, posX, veloX, veloY, alphaBounce)
    }

    live(gravity, framerate) {
        //Do somthing w/ physic to make the player move
        // console.log(gravity)
        super.live(gravity, framerate);;
    };

    draw() {
        super.show();
    };

    detectBoderColision() {
        super.detectBoderColision();
    }
}