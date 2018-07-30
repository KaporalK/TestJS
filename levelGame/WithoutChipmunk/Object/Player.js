class Player extends AnimatedObject {
    /**
     * @param posY
     * @param posX
     * @param veloX
     * @param veloY
     * @param poids
     * @param alphaBounce
     */
    constructor(posY, posX, veloX, veloY, poids,  alphaBounce) {
        super(posY, posX, veloX, veloY, poids, alphaBounce)
    }

    live() {
        //Do somthing w/ physic to make the player move
        // console.log(gravity)
        super.live();
    };

    draw() {
        super.draw();
    };

    detectBoderColision() {
        super.detectBoderColision();
    }
}