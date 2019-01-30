/**
 * @class Bullet
 * @param super
 *
 * Cette classe représente les balle classique que tire le player
 *
 * Pourra être rework ou utiliser pour faire dautres projectiles
 */
class Bullet extends AnimatedObject {

    constructor(y, x, width, height, velocityX, velocityY, poids, alphaBounce) {
        super(y, x, width, height, velocityX, velocityY, poids, alphaBounce);
        this.color = [0, 50, 200];
        // this.velocityX = 0;
        // this.velocityY = 0;
        this._colidingClass = new BulletColiding(this);
    }

    live(Engine){
        this.amIToFarFromHome();

        // this.doIKillSomethingNow(Engine.getKillableThing());
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

    doIKillSomethingNow(KillableThingList){
        let bullet = this;
        KillableThingList.forEach(function (item, index, array) {
            if(bullet.x < item.x + item.width &&
                bullet.x + bullet.width > item.x &&
                bullet.y < item.y + item.height &&
                bullet.y + bullet.height > item.y
            ){
                item.shoundIBeDeleted = true;
            }
        })
    }

    get colidingClass() {
        return this._colidingClass;
    }

    set colidingClass(value) {
        this._colidingClass = value;
    }
}