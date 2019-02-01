/**
 * @class KillableThing
 *
 * Class très basique pour faire un mechant
 */
class KillableThing extends AnimatedObject {

    constructor(y, x, width, height, velocityX, velocityY, poids, alphaBounce) {
        super(y, x, width, height, velocityX, velocityY, poids, alphaBounce);
        this.color = [0, 168, 0];

        this.colidingClass = new KillableThingColiding(this);
    }

    respawn(){
        this.x = Math.floor(Math.random() * 750) + 1;
        this.y = Math.floor(Math.random() * 750) + 1;
    }

    live(Engine){
        super.live();
    }

    draw(){
        super.draw();
    }

}

