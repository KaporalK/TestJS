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
        this._detectionPlayerRange = 200;
    }

    findPlayer(Player) {
        this.playerInArea = !(
            (this.x - this.detectionPlayerRange >= Player.x + Player.width)      // trop à gauche
            || (this.x + this.width + this.detectionPlayerRange <= Player.x) // trop à gaucheighte
            || (this.y - this.detectionPlayerRange >= Player.y + Player.height) // trop en bas
            || (this.y + this.height + this.detectionPlayerRange <= Player.y)
        );
    }
    //TODO trouver comment on va vers le joueur;
    moveToPlayer(Player){
        //??
    }

    respawn() {
        this.x = Math.floor(Math.random() * 750) + 1;
        this.y = Math.floor(Math.random() * 750) + 1;
    }

    live(Engine) {
        this.findPlayer(Engine.levelList.player);
        if(this.playerInArea){
            console.log('toto');
        }
        super.live();
    }

    draw() {
        super.draw();
    }


    get detectionPlayerRange() {
        return this._detectionPlayerRange;
    }

    set detectionPlayerRange(value) {
        this._detectionPlayerRange = value;
    }
}

