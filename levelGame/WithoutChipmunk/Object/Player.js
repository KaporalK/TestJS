class Player extends AnnimatedObject {

    constructor(posY, posX, veloX, veloY, alphaBounce) {
        super(posY, posX, veloX, veloY, alphaBounce)
    }

    live() {
        //Do somthing w/ physic to make the player move
        // console.log(gravity)
        super.live();
    };

    show() {
        super.show();
    };

    detectBoderColision() {
        super.detectBoderColision();
    }
}