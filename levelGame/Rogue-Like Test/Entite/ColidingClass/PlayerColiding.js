﻿class PlayerColiding extends ColidingInterface {

    constructor(item) {
        super(item);
    }

    support() {
        return ['Brick', 'KillableThing', 'PowerUps'];
    }


    colide(itemToColideWith) {
        if (itemToColideWith instanceof Brick) {
            if (this.detectBasicColision(itemToColideWith)) {
                //Todo faudrait pas faire cette methode 2 fois dans la même boucle
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