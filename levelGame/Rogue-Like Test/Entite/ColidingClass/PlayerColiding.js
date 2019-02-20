class PlayerColiding extends ColidingInterface {

    constructor(item) {
        super(item);
    }

    support() {
        return ['Brick', 'KillableThing'];
    }


    //TODO un fonction colide with block pour que chaque nouveaux objet implemente la logique de facon simple
    colide(itemToColideWith) {
        if (itemToColideWith instanceof Brick) {
            if (this.detectBasicColision(itemToColideWith)) {
                if (this.item.moveUp && this.item.canMoveUp) {
                    this.item.nextY = this.item.y - this.item.moveSpeed;
                }
                if (this.item.moveDown && this.item.canMoveDown) {
                    this.item.nextY = this.item.y + this.item.moveSpeed;
                }
                if (this.item.moveLeft && this.item.canMoveLeft) {
                    this.item.nextX = this.item.x - this.item.moveSpeed;
                }
                if (this.item.moveRight && this.item.canMoveRight) {
                    this.item.nextX = this.item.x + this.item.moveSpeed;
                }
                //du génie !
                if (this.detectRealColision(this.item.nextX, this.item.nextY, itemToColideWith)) {
                    if (!this.detectLeftColision(this.item.nextX, this.item.nextY, itemToColideWith)) {
                        this.item.canMoveLeft = false;
                        this.item.nextX = this.item.x;
                    }
                    if (!this.detectRightColision(this.item.nextX, this.item.nextY, itemToColideWith)) {
                        this.item.canMoveRight = false;
                        this.item.nextX = this.item.x;
                    }
                    if (!this.detectDownColision(this.item.nextX, this.item.nextY, itemToColideWith)) {
                        this.item.canMoveDown = false;
                        this.item.nextY = this.item.y;
                    }
                    if (!this.detectUpColision(this.item.nextX, this.item.nextY, itemToColideWith)) {
                        this.item.canMoveUp = false;
                        this.item.nextY = this.item.y;
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
            itemX + this.item.width > brick.x &&
            itemY < brick.y + brick.height &&
            itemY + this.item.height - COLISION_OFFSET * this.item.moveSpeed > brick.y
        )
    }
}