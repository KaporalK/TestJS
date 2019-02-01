class BulletColiding extends ColidingInterface {

    constructor(item) {
        super(item);
    }

    support() {
        return ['KillableThing', 'Brick'];
    }

    //Pas besoin de if instanceOf car le support return qu'une class
    colide(itemToColideWith) {
        if(itemToColideWith instanceof KillableThing){
            if (this.item.x < itemToColideWith.x + itemToColideWith.width &&
                this.item.x + this.item.width > itemToColideWith.x &&
                this.item.y < itemToColideWith.y + itemToColideWith.height &&
                this.item.y + this.item.height > itemToColideWith.y
            ) {
                itemToColideWith.shoundIBeDeleted = true;
                this.item.shoundIBeDeleted = true;
                itemToColideWith.respawn(); //Ca marche pas
            }
        }else if(itemToColideWith instanceof Brick){
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