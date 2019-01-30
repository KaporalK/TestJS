class BulletColiding extends ColidingInterface {

    constructor(item) {
        super(item);
    }

    support() {
        return ['KillableThing'];
    }

    colide(itemToColideWith) {
        if(itemToColideWith instanceof KillableThing){
            if (this.item.x < itemToColideWith.x + itemToColideWith.width &&
                this.item.x + this.item.width > itemToColideWith.x &&
                this.item.y < itemToColideWith.y + itemToColideWith.height &&
                this.item.y + this.item.height > itemToColideWith.y
            ) {
                itemToColideWith.shoundIBeDeleted = true;
            }
        }
    }

}