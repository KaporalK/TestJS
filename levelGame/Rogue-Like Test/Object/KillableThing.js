class KillableThing extends AnimatedObject {

    constructor(posY, posX, largeur, hauteur, velocityX, velocityY, poids, alphaBounce) {
        super(posY, posX, largeur, hauteur, velocityX, velocityY, poids, alphaBounce)
    }

    live(Engine){
        super.live();
    }

    draw(){
        super.draw();
    }

}

