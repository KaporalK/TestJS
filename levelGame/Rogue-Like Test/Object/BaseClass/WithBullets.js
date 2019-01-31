/**
 * @class WithBullets
 *
 * Class a utiliser si on veut faire un objet qui bouge et qui tire des trucs  :)
 */
class WithBullets extends AnimatedObject{


    constructor(y, x, width, height, velocityX, velocityY, poids, alphaBounce) {
        super(y, x, width, height, velocityX, velocityY, poids, alphaBounce);
        this._bullets = [];
    }

    liveBullet(Engine){
        // https://github.com/mikechambers/ExamplesByMesh/tree/master/JavaScript/QuadTree
        this._bullets.forEach(function (item, index, array) {
            let node = Engine.tree.retrieve(item);
            node.forEach(function (nodeItem, index, array) {
                if( nodeItem !== this && this.colidingClass.support().includes(nodeItem.constructor.name)){
                    this.colidingClass.colide(nodeItem);
                }
            }, item);
            if (item.shoundIBeDeleted) {
                this.deleteBullet(item);
                return;
            }
            item.live(Engine);
        },this);
    }

    deleteBullet(bullet) {
        let index = this.bullet.indexOf(bullet);
        if (index > -1) {
            this.bullet.splice(index, 1);
        }
    }

    get bullets() {
        return this._bullets;
    }

    set bullets(value) {
        this._bullets = value;
    }
}