class BaseBullet extends AnimatedObject{

    constructor(param){
        super(param);
    }

    amIToFarFromHome(){
        if (- 50 > this.x) {
            this.shouldIBeDeleted = true;
        } else if (this.getBorderX() > width + 50) {
            this.shouldIBeDeleted = true;
        }
        if (- 50 > this.y) {
            this.shouldIBeDeleted = true;
        } else if (this.getBorderY() > height + 50) {
            this.shouldIBeDeleted = true;
        }
    }

}