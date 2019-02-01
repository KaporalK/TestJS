class PlayerColiding extends ColidingInterface {

    constructor(item) {
        super(item);
    }

    support() {
        return ['Brick', 'KillableThing'];
    }

    colide(itemToColideWith) {
        if (itemToColideWith instanceof Brick) {
            if (this.detectBasicColision(itemToColideWith)) {
                let newY = this.item.y;
                let newX = this.item.x;
                let nextMoveX = null;
                let nextMoveY = null;
                if (this.item.moveUp && this.item.canMoveUp) {
                    newY = this.item.y - this.item.moveSpeed;
                }
                if (this.item.moveDown && this.item.canMoveDown) {
                    newY = this.item.y + this.item.moveSpeed;
                }
                if (this.item.moveLeft && this.item.canMoveLeft) {
                    newX = this.item.x - this.item.moveSpeed;
                }
                if (this.item.moveRight && this.item.canMoveRight) {
                    newX = this.item.x + this.item.moveSpeed;
                }
                //du génie !
                if (this.detectRealColision(newX, newY, itemToColideWith)) {
                    if (!this.detectLeftColision(newX, newY, itemToColideWith)) {
                        this.item.canMoveLeft = false;
                    }
                    if (!this.detectRightColision(newX, newY, itemToColideWith)) {
                        this.item.canMoveRight = false;
                    }
                    if (!this.detectDownColision(newX, newY, itemToColideWith)) {
                        this.item.canMoveDown = false;
                    }
                    if (!this.detectUpColision(newX, newY, itemToColideWith)) {
                        this.item.canMoveUp = false;
                    }
                }
            }
        } else if (itemToColideWith instanceof KillableThing) {
            if (this.detectBasicColision(itemToColideWith)) {
                if (this.detectRealColision(this.item.x, this.item.y, itemToColideWith)) {
                    this.item.respawn();
                }
            }
        }
    }

    //Très mauvais nom
    detectLeftColision(itemX, itemY, brick) {
        return (itemX + COLISION_OFFSET * this.item.moveSpeed < brick.x + brick.width &&
            itemX + this.item.width > brick.x &&
            itemY < brick.y + brick.height &&
            itemY + this.item.height > brick.y
        )
    }

    //Très mauvais nom
    detectRightColision(itemX, itemY, brick) {
        return (itemX < brick.x + brick.width &&
            itemX + this.item.width - COLISION_OFFSET * this.item.moveSpeed > brick.x &&
            itemY < brick.y + brick.height &&
            itemY + this.item.height > brick.y
        )
    }

    //Très mauvais nom
    detectUpColision(itemX, itemY, brick) {
        return (itemX < brick.x + brick.width &&
            itemX + this.item.width > brick.x &&
            itemY + COLISION_OFFSET * this.item.moveSpeed < brick.y + brick.height &&
            itemY + this.item.height > brick.y
        )
    }

    //Très mauvais nom
    detectDownColision(itemX, itemY, brick) {
        return (itemX < brick.x + brick.width &&
            itemX + this.item.width - COLISION_OFFSET * this.item.moveSpeed > brick.x &&
            itemY < brick.y + brick.height &&
            itemY + this.item.height - COLISION_OFFSET * this.item.moveSpeed > brick.y
        )
    }
}