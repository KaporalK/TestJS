/**
 * @class Bullet
 * @param super
 *
 * Cette classe représente les balle classique que tire le player
 *
 * Pourra être rework ou utiliser pour faire dautres projectiles
 */

class Bullet extends BaseBullet {

    constructor(params) {
        super(params);
        this._color = [0, 50, 200];
        this._colidingClass = new BulletColiding(this);

        this._damage = 35;
        this._force = 5;
    }

    live(Engine){
        this.amIToFarFromHome();

        super.live();
    }

    draw(){
        super.draw();
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }

    get colidingClass() {
        return this._colidingClass;
    }

    set colidingClass(value) {
        this._colidingClass = value;
    }

    get damage() {
        return this._damage;
    }

    set damage(value) {
        this._damage = value;
    }

    get force() {
        return this._force;
    }

    set force(value) {
        this._force = value;
    }
}