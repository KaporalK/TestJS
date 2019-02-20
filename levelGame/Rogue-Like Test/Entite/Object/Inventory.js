class Inventory{

    constructor(Item){

        this._item = Item;

        this._currentGun = null;
        this._gunList = [];
        this._indexOfCurrentGun = null;

    }

    draw(){
        this.currentGun.drawInventory();
    }

    live(Engine){
        this.liveBullets(Engine);
    }

    liveBullets(Engine){
        // https://github.com/mikechambers/ExamplesByMesh/tree/master/JavaScript/QuadTree
        this.currentGun.bullets.forEach(function (item) {
            let node = Engine.tree.retrieve(item);
            node.forEach(function (nodeItem) {
                if( nodeItem !== item && this.colidingClass.support().includes(nodeItem.constructor.name)){
                    this.colidingClass.colide(nodeItem);
                }
            }, item);
            if (item.shoundIBeDeleted) {
                this.deleteBullet(item);
                return;
            }
            item.live(Engine);
        },this.currentGun);
    }

    addGunAndSetCurrent(object){
        this.gunList.push(object);
        this.currentGun = object;
        this.indexOfCurrentGun =  this.gunList.indexOf(object);

    }

    deleteGun(object) {
        let index = this.gunList.indexOf(object);
        if (index > -1) {
            this.gunList.splice(index, 1);
        }
    }

    addGun(object) {
        this.gunList.push(object);
    };

    get currentGun() {
        return this._currentGun;
    }

    set currentGun(value) {
        this._currentGun = value;
    }

    get indexOfCurrentGun() {
        return this._indexOfCurrentGun;
    }

    set indexOfCurrentGun(value) {
        this._indexOfCurrentGun = value;
    }

    get gunList() {
        return this._gunList;
    }

    set gunList(value) {
        this._gunList = value;
    }

    get item() {
        return this._item;
    }

    set item(value) {
        this._item = value;
    }
}