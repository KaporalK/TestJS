class KillableThingColiding extends ColidingInterface {

    constructor(item) {
        super(item);
    }

    support() {
        return ['Brick'];
    }

    colide(itemToColideWith) {
        if (itemToColideWith instanceof Brick) {
            if (this.detectBasicColision(itemToColideWith)) {
                this.calculNextPosition();
                if (this.detectRealColision(this.item.nextX, this.item.nextY, itemToColideWith)) {
                    this.findAndApplyMinimumVectorToNotColide(itemToColideWith);
                }

            }
        }
    }

    calculNextPosition(){
        if (this.item.moveUp && this.item.canMoveUp) {
            this.item.nextY = this.item.nextY - this.item.velocityY;
        }
        if (this.item.moveDown && this.item.canMoveDown) {
            this.item.nextY = this.item.nextY + this.item.velocityY;
        }
        if (this.item.moveLeft && this.item.canMoveLeft) {
            this.item.nextX = this.item.nextX - this.item.velocityX;
        }
        if (this.item.moveRight && this.item.canMoveRight) {
            this.item.nextX = this.item.nextX + this.item.velocityX;
        }
    }
}