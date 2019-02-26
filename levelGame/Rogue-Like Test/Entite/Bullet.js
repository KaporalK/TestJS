/**
 * @class Bullet
 * @param super
 *
 * Cette classe représente les balle classique que tire le player
 *
 * Pourra être rework ou utiliser pour faire dautres projectiles
 */

//Todo différents type de munition
class Bullet extends AnimatedObject {

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
        // console.log(this.shoundIBeDeleted);
    }

    draw(){
        super.draw();
    }

    amIToFarFromHome(){
        if (- 50 > this.x) {
            this.shoundIBeDeleted = true;
        } else if (this.getBorderX() > width + 50) {
            this.shoundIBeDeleted = true;
        }
        if (- 50 > this.y) {
            this.shoundIBeDeleted = true;
        } else if (this.getBorderY() > height + 50) {
            this.shoundIBeDeleted = true;
        }
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