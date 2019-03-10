﻿class PlayerColiding extends ColidingInterface {

    constructor(item) {
        super(item);
    }

    support(item) {
        if(item instanceof KillableThing){
            return true
        }else if(item instanceof  Brick){
            return true
        }else if(item instanceof PowerUps){
            return true
        }
        return false;
    }


    colide(itemToColideWith) {
        if (itemToColideWith instanceof Brick) {
            if (this.detectBasicColision(itemToColideWith)) {
                if (this.detectRealColision(this.item.nextX, this.item.nextY, itemToColideWith)) {
                    this.findAndApplyMinimumVectorToNotColide(itemToColideWith);
                }
            }
        } else if (itemToColideWith instanceof KillableThing) { //TODO hp
            if (this.detectBasicColision(itemToColideWith)) {
                if (this.detectRealColision(this.item.nextX, this.item.nextY, itemToColideWith)) {
                    this.item.respawn();
                }
            }
        } else if (itemToColideWith instanceof PowerUps) {
            if (this.detectRealColision(this.item.nextX, this.item.nextY, itemToColideWith)) {
                //Y'a un bug, je pickUp les power 2 fois
                itemToColideWith.pickUp(this.item);
            }

        }
    }

    calculNextPosition() {
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