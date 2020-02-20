class BouncingBulletColiding extends ColidingInterface {

    constructor(item) {
        super(item);
    }

    support(item) {
        if (item instanceof BaseEnemie) {
            return true
        } else if (item instanceof Brick) {
            return true
        }
        return false;
    }

    //Pas besoin de if instanceOf car le support return qu'une class
    colide(itemToColideWith) {
        if (itemToColideWith instanceof BaseEnemie) {
            if (this.detectRealColision(this.item.x, this.item.y, itemToColideWith)) {
                itemToColideWith.hp -= this.item.damage;
                itemToColideWith.force.x = this.item.velocityX;
                itemToColideWith.force.y = this.item.velocityY;
                //calcul maison
                itemToColideWith.force.puissance = abs((this.item.velocityY + this.item.velocityX) * this.item.force);
                itemToColideWith.ai.moveStrat.push('knockBack');
                this.item.shouldIBeDeleted = true;

            }
        } else if (itemToColideWith instanceof Brick) {
            if (this.detectRealColision(this.item.x, this.item.y, itemToColideWith)) {

                this.findCollidingSide(itemToColideWith,
                    {
                        item: this.item ,
                        top: function () {
                            this.item.velocityY *= -1;
                        },
                        bottom: function () {
                            this.item.velocityY *= -1;
                        },
                        left: function () {
                            this.item.velocityX *= -1;
                        },
                        right: function () {
                            this.item.velocityX *= -1;
                        }
                    }
                );

            }
        }

    }

}