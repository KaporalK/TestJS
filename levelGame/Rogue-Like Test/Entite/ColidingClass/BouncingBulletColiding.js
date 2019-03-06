class BouncingBulletColiding extends ColidingInterface {

    constructor(item) {
        super(item);
    }

    support() {
        return ['KillableThing', 'Brick'];
    }

    //Pas besoin de if instanceOf car le support return qu'une class
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
                //Todo rework dans une fonction ?
                let player_bottom = this.item.y + this.item.height;
                let tiles_bottom = itemToColideWith.y + itemToColideWith.height;
                let player_right = this.item.x + this.item.width;
                let tiles_right = itemToColideWith.x + itemToColideWith.width;

                let b_collision = tiles_bottom - this.item.y;
                let t_collision = player_bottom - itemToColideWith.y;
                let l_collision = player_right - itemToColideWith.x;
                let r_collision = tiles_right - this.item.x;


                //Top collision
                if (t_collision < b_collision && t_collision < l_collision && t_collision < r_collision) {
                    this.item.velocityY *= -1;
                }
                //bottom collision
                if (b_collision < t_collision && b_collision < l_collision && b_collision < r_collision) {
                    this.item.velocityY *= -1;
                }
                //Left collision
                if (l_collision < r_collision && l_collision < t_collision && l_collision < b_collision) {
                    this.item.velocityX *= -1;
                }
                //Right collision
                if (r_collision < l_collision && r_collision < t_collision && r_collision < b_collision) {
                    this.item.velocityX *= -1;

                }
            }
        }

    }

}