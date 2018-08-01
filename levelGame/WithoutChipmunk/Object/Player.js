class Player extends AnimatedObject {
    /**
     *
     * @param posY
     * @param posX
     * @param largeur
     * @param hauteur
     * @param velocityX
     * @param velocityY
     * @param poids
     * @param alphaBounce
     */
    constructor(posY,posX, largeur, hauteur,velocityX, velocityY, poids ,alphaBounce) {
        super(posY,posX, largeur, hauteur,velocityX, velocityY, poids ,alphaBounce)
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