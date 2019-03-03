class BulletColiding extends ColidingInterface {

    constructor(item) {
        super(item);
    }

    support() {
        return ['KillableThing', 'Brick'];
    }

    //Pas besoin de if instanceOf car le support return qu'une class
    //TODO plz rework me
    colide(itemToColideWith) {
        if (itemToColideWith instanceof KillableThing) {
            if (this.item.x < itemToColideWith.x + itemToColideWith.width &&
                this.item.x + this.item.width > itemToColideWith.x &&
                this.item.y < itemToColideWith.y + itemToColideWith.height &&
                this.item.y + this.item.height > itemToColideWith.y
            ) {
                itemToColideWith.hp -= this.item.damage;
                this.item.shoundIBeDeleted = true;
                itemToColideWith.force.x = this.item.velocityX;
                itemToColideWith.force.y = this.item.velocityY;
                //calcul maison
                itemToColideWith.force.puissance = abs((this.item.velocityY + this.item.velocityX) * this.item.force);
                itemToColideWith.ai.moveStrat.push('knockBack');
            }
        } else if (itemToColideWith instanceof Brick) {
            if (this.item.x < itemToColideWith.x + itemToColideWith.width &&
                this.item.x + this.item.width > itemToColideWith.x &&
                this.item.y < itemToColideWith.y + itemToColideWith.height &&
                this.item.y + this.item.height > itemToColideWith.y
            ) {
                this.item.shoundIBeDeleted = true;
            }
        }

    }

}