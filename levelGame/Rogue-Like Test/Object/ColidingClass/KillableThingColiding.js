class KillableThingColiding extends ColidingInterface {

    constructor(item) {
        super(item);
    }

    support() {
        return ['Brick'];
    }

    //TODO un fonction colide with block pour que chaque nouveaux objet implemente la logique de facon simple
    colide(itemToColideWith) {
        if (itemToColideWith instanceof Brick) {
            if (this.detectBasicColision(itemToColideWith)) {
                let newY = this.item.y;
                let newX = this.item.x;
                if (this.item.moveUp && this.item.canMoveUp) {
                    newY = this.item.y - this.item.velocityY;
                }
                if (this.item.moveDown && this.item.canMoveDown) {
                    newY = this.item.y + this.item.velocityY;
                }
                if (this.item.moveLeft && this.item.canMoveLeft) {
                    newX = this.item.x - this.item.velocityX;
                }
                if (this.item.moveRight && this.item.canMoveRight) {
                    newX = this.item.x + this.item.velocityX;
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
        }
    }

    //Très mauvais nom
    detectLeftColision(itemX, itemY, brick) {
        return (itemX + COLISION_OFFSET * this.item.velocityX < brick.x + brick.width &&
            itemX + this.item.width > brick.x &&
            itemY < brick.y + brick.height &&
            itemY + this.item.height > brick.y
        )
    }

    //Très mauvais nom
    detectRightColision(itemX, itemY, brick) {
        return (itemX < brick.x + brick.width &&
            itemX + this.item.width - COLISION_OFFSET * this.item.velocityX > brick.x &&
            itemY < brick.y + brick.height &&
            itemY + this.item.height > brick.y
        )
    }

    //Très mauvais nom
    detectUpColision(itemX, itemY, brick) {
        return (itemX < brick.x + brick.width &&
            itemX + this.item.width > brick.x &&
            itemY + COLISION_OFFSET * this.item.velocityY < brick.y + brick.height &&
            itemY + this.item.height > brick.y
        )
    }

    //Très mauvais nom
    detectDownColision(itemX, itemY, brick) {
        return (itemX < brick.x + brick.width &&
            itemX + this.item.width > brick.x &&
            itemY < brick.y + brick.height &&
            itemY + this.item.height - COLISION_OFFSET * this.item.velocityY > brick.y
        )
    }

}