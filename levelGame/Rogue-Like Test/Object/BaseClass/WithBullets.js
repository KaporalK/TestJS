/**
 * @class WithBullets
 *
 * Class a utiliser si on veut faire un objet qui bouge et qui tire des trucs  :)
 */
class WithBullets extends AnimatedObject{


    constructor(y, x, width, height, velocityX, velocityY, poids, alphaBounce) {
        super(y, x, width, height, velocityX, velocityY, poids, alphaBounce);
        this._bullets = [];
    }


    get bullets() {
        return this._bullets;
    }

    set bullets(value) {
        this._bullets = value;
    }
}