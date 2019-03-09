class Inventory {

    constructor(Item) {

        this._item = Item;

        this._currentGun = null;
        this._gunList = [];
        this._indexOfCurrentGun = null;

        this.registerInventoryEvent();

        this._xGunListStart = 860;
        this._yGunListStart = 140;
        this._heightGunSprite = 40;
    }

    draw() {
        let i = this.indexOfCurrentGun;
        let gunLength = this.gunList.length;

        for (let j = 1; j <= gunLength; j++) {
            this.gunList[i].drawInventory(this.xGunListStart, this.yGunListStart + (j * this.heightGunSprite));
            i++;
            if (i >= gunLength) {
                i = 0;
            }
        }

        // this.gunList.forEach(function (item) {
        //     item.drawInventory(this.xGunListStart, this.yGunListStart + (i * this.heightGunSprite));
        //     i++;
        // }, this);
    }

    live(Engine) {
        this.liveBullets(Engine);
    }

    liveBullets(Engine) {
        // https://github.com/mikechambers/ExamplesByMesh/tree/master/JavaScript/QuadTree
        this.currentGun.bullets.forEach(function (item) {
            if (item.shouldIBeDeleted) {
                this.deleteBullet(item);
                return;
            }
            let node = Engine.tree.retrieve(item);
            node = QuadTreeItemHelper.purgeQuadTreeRetrieve(node);
            node.forEach(function (nodeItem) {
                if (nodeItem !== item && this.colidingClass.support().includes(nodeItem.constructor.name)) {
                    this.colidingClass.colide(nodeItem);
                }
            }, item);
            item.live(Engine);
        }, this.currentGun);
    }

    pickUpPowerUp(powerUp) {
        if (powerUp instanceof Gun) {
            powerUp.item = this.item;
            this.addGunAndSetCurrent(powerUp);
        }else if (powerUp instanceof BouncingBullet){
            this.changeBulletType(BouncingBullet);
        }
    }

    addGunAndSetCurrent(object) {

        if (this.gunList.includes(object)) {
            return;
        }

        this.gunList.push(object);
        this.currentGun = object;
        this.indexOfCurrentGun = this.gunList.indexOf(object);

    }
    //TODO pouvoir stocker les type de bullet qu'on a / avoir un nombre de mun limité ?
    changeBulletType(bulletType){
        this.currentGun.bulletClass = bulletType;
    }

    registerInventoryEvent() {
        document.addEventListener('keydown', (event) => {
                const keyCode = event.keyCode;
                switch (keyCode) {
                    case Z: //z
                        this.changeCurrentGun();
                        break;
                }
            }
        )
    }

    changeCurrentGun() {
        let totalGun = this.gunList.length;
        this.indexOfCurrentGun += 1;
        if (this.indexOfCurrentGun >= totalGun) {
            this.indexOfCurrentGun = 0;
        }
        //transfere de gun + de bullets pour qu'elles continuent de vivre
        let bullets = this.currentGun.bullets;
        this.currentGun.bullets = [];
        this.currentGun = this.gunList[this.indexOfCurrentGun];
        this.currentGun.bullets = bullets;
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

    get xGunListStart() {
        return this._xGunListStart;
    }

    set xGunListStart(value) {
        this._xGunListStart = value;
    }

    get yGunListStart() {
        return this._yGunListStart;
    }

    set yGunListStart(value) {
        this._yGunListStart = value;
    }

    get heightGunSprite() {
        return this._heightGunSprite;
    }

    set heightGunSprite(value) {
        this._heightGunSprite = value;
    }
}