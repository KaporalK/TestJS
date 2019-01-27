class Bullet extends AnimatedObject {

    constructor(posY, posX, largeur, hauteur, velocityX, velocityY, poids, alphaBounce) {
        super(posY, posX, largeur, hauteur, velocityX, velocityY, poids, alphaBounce)
    }

    live(Engine){
        this.amIToFarFromHome();

        this.doIKillSomethingNow(Engine.getKillableThing());
        // console.log('titi');
        super.live();
        // console.log(this.shoundIBeDeleted);
    }

    draw(){
        super.draw();
    }

    amIToFarFromHome(){
        if (- 50 > this.posX) {
            this.shoundIBeDeleted = true;
        } else if (this.getBorderX() > width + 50) {
            this.shoundIBeDeleted = true;
        }
        if (50 > this.posY) {
            this.shoundIBeDeleted = true;
        } else if (this.getBorderY() > height + 50) {
            this.shoundIBeDeleted = true;
        }
    }

    doIKillSomethingNow(KillableThingList){
        let bullet = this;
        KillableThingList.forEach(function (item, index, array) {
            if(bullet.posX < item.posX + item.largeur &&
                bullet.posX + bullet.largeur > item.posX &&
                bullet.posY < item.posY + item.hauteur &&
                bullet.posY + bullet.hauteur > item.posY
            ){
                item.shoundIBeDeleted = true;
            }
        })
    }
}