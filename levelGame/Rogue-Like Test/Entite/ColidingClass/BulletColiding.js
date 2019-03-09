class BulletColiding extends ColidingInterface {

    constructor(item) {
        super(item);
    }

    support() {
        return ['KillableThing', 'Brick'];
    }

    colide(itemToColideWith) {
        if (itemToColideWith instanceof KillableThing) {
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
                this.item.shouldIBeDeleted = true;
            }
        }

    }

}