/**
 * @class KillableThing
 *
 * Class très basique pour faire un mechant
 */
class KillableThing extends AnimatedObject {

    constructor(posY, posX, largeur, hauteur, velocityX, velocityY, poids, alphaBounce) {
        super(posY, posX, largeur, hauteur, velocityX, velocityY, poids, alphaBounce);
        this.color = [0, 168, 0];
    }

    live(Engine){
        super.live();
    }

    draw(){
        super.draw();
    }

}

