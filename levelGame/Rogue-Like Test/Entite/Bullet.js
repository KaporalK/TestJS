/**
 * @class Bullet
 * @param super
 *
 * Cette classe représente les balle classique que tire le player
 *
 * Pourra être rework ou utiliser pour faire dautres projectiles
 */
class Bullet extends AnimatedObject {

    constructor(params) {
        super(params);
        this.color = [0, 50, 200];
        this.colidingClass = new BulletColiding(this);
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
}