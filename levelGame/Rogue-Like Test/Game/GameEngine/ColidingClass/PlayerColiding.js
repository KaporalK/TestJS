﻿class PlayerColiding extends ColidingInterface {

    constructor(item) {
        super(item);
    }

    support(item) {
        if (item instanceof BaseEnemie) {
            return true
        } else if (item instanceof Brick) {
            return true
        } else if (item instanceof PowerUps) {
            return true
        }
        return false;
    }

    //Si ca devient trop compliquer on utilise le partern de l ai
    colide(itemToColideWith) {
        if (itemToColideWith instanceof Brick) {
            if (this.detectRealColision(this.item.nextX, this.item.nextY, itemToColideWith)) {
                this.findAndApplyMinimumVectorToNotColide(itemToColideWith);
            }
        } else if (itemToColideWith instanceof BaseEnemie) {
            if (this.detectBasicColision(itemToColideWith)) {
                if (this.detectRealColision(this.item.nextX, this.item.nextY, itemToColideWith)) {


                    if (this.item.invincibleForXFrame <= 0) {
                        this.item.hp -= itemToColideWith.damage;
                        this.item.invincibleForXFrame = this.item.invincibleFrame;
                    }

                    this.findAndApplyMinimumVectorToNotColide(itemToColideWith);
                    // todo rework le *3 en une variable du player
                    this.findCollidingSide(itemToColideWith,
                        {
                            item: this.item,
                            top: function (itemToColideWith) {
                                this.item.knockback = new Knockback(
                                    0,
                                    3,
                                    0.2
                                );

                            },
                            bottom: function (itemToColideWith) {
                                this.item.knockback = new Knockback(
                                    0,
                                    -3,
                                    0.2
                                );
                            },
                            left: function (itemToColideWith) {
                                this.item.knockback = new Knockback(
                                    3,
                                    0,
                                    0.2
                                );

                            },
                            right: function (itemToColideWith) {
                                // this.item.force.x = -itemToColideWith.velocityX * 3;
                                // this.item.force.puissance = 2 * abs((itemToColideWith.velocityY + itemToColideWith.velocityX) * itemToColideWith.weight);
                                // this.item.appliableBehaviour.push(new Knockback());
                                this.item.knockback = new Knockback(
                                    -3,
                                    0,
                                    0.2
                                );
                            }
                        }
                    );


                }
            }
        } else if (itemToColideWith instanceof PowerUps) {
            if (this.detectRealColision(this.item.nextX, this.item.nextY, itemToColideWith)) {
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