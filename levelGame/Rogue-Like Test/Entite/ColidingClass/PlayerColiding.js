﻿class PlayerColiding extends ColidingInterface {

    constructor(item) {
        super(item);
    }

    support() {
        return ['Brick', 'KillableThing'];
    }


    colide(itemToColideWith) {
        if (itemToColideWith instanceof Brick) {
            if (this.detectBasicColision(itemToColideWith)) {
                this.calculNextPosition();
                //du génie !
                if (this.detectRealColision(this.item.nextX, this.item.nextY, itemToColideWith)) {
                    this.findAndApplyMinimumVectorToNotColide(itemToColideWith);
                }
            }
        } else if (itemToColideWith instanceof KillableThing) {
            if (this.detectBasicColision(itemToColideWith)) {
                if (this.detectRealColision(this.item.nextX, this.item.nextY, itemToColideWith)) {
                    this.item.respawn();
                }
            }
        }
    }

    calculNextPosition(){
        if (this.item.moveUp && this.item.canMoveUp) {
            this.item.nextY = this.item.nextY - this.item.moveSpeed;
        }
        if (this.item.moveDown && this.item.canMoveDown) {
            this.item.nextY = this.item.nextY + this.item.moveSpeed;
        }
        if (this.item.moveLeft && this.item.canMoveLeft) {
            this.item.nextX = this.item.nextX - this.item.moveSpeed;
        }
        if (this.item.moveRight && this.item.canMoveRight) {
            this.item.nextX = this.item.nextX + this.item.moveSpeed;
        }
    }

}

// export { PlayerColiding }