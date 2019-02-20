class DefaultGun{

    constructor(item) {
        this._isShooting = false;
        this._bullets = [];

        this._bulletCooldown = 30;
        this._nextBullet = 0;

        this._item = item;


        //Todo refact HUDSprite ?
        this._hudSprite = new Animation(Animations.GunList.Default);

    }

    drawInventory(){
        animation(this.hudSprite, 860, 180);
    }

    shootBullet(tree) {
        if (this.nextBullet <= 0) {
            let newBullet;
            let coordinate = this.generateBulletCoordinate();
            newBullet = new Bullet(coordinate['position']['Y'], coordinate['position']['X'],
                2, 2, coordinate['velocity']['X'], coordinate['velocity']['Y'], 5, 5);
            tree.insert(newBullet);
            this.addBullet(newBullet);
            this.nextBullet = this.bulletCooldown;
        }
    }
    
    generateBulletCoordinate() {
        let bulletInfo = {0: 'velocity', 1: 'position'};
        bulletInfo['velocity'] = {0: 'X', 1: 'Y'};
        bulletInfo['position'] = {0: 'X', 1: 'Y'};
        if (this.item.keypressed[UP] && this.item.keypressed[LEFT]) {
            bulletInfo['velocity']['Y'] = -4 + DefaultGun.getRandomVelocity();
            bulletInfo['velocity']['X'] = -4 + DefaultGun.getRandomVelocity();
            bulletInfo['position']['X'] = this.item.x;
            bulletInfo['position']['Y'] = this.item.y;
        } else if (this.item.keypressed[UP] && this.item.keypressed[RIGHT]) {
            bulletInfo['velocity']['Y'] = -4 + DefaultGun.getRandomVelocity();
            bulletInfo['velocity']['X'] = 4 + DefaultGun.getRandomVelocity();
            bulletInfo['position']['X'] = this.item.x + this.item.width;
            bulletInfo['position']['Y'] = this.item.y;
        } else if (this.item.keypressed[RIGHT] && this.item.keypressed[DOWN]) {
            bulletInfo['velocity']['Y'] = 4 + DefaultGun.getRandomVelocity();
            bulletInfo['velocity']['X'] = 4 + DefaultGun.getRandomVelocity();
            bulletInfo['position']['X'] = this.item.x + this.item.width;
            bulletInfo['position']['Y'] = this.item.y + this.item.height;
        } else if (this.item.keypressed[LEFT] && this.item.keypressed[DOWN]) {
            bulletInfo['velocity']['Y'] = 4 + DefaultGun.getRandomVelocity();
            bulletInfo['velocity']['X'] = -4 + DefaultGun.getRandomVelocity();
            bulletInfo['position']['X'] = this.item.x;
            bulletInfo['position']['Y'] = this.item.y + this.item.height;
        } else if (this.item.keypressed[UP]) {
            bulletInfo['velocity']['X'] = 0 + DefaultGun.getRandomVelocity();
            bulletInfo['velocity']['Y'] = -4;
            bulletInfo['position']['X'] = this.item.x + (this.item.width/2);
            bulletInfo['position']['Y'] = this.item.y;
        } else if (this.item.keypressed[LEFT]) {
            bulletInfo['velocity']['X'] = -4;
            bulletInfo['velocity']['Y'] = 0 + DefaultGun.getRandomVelocity();
            bulletInfo['position']['X'] = this.item.x;
            bulletInfo['position']['Y'] = this.item.y+ (this.item.height/2);
        } else if (this.item.keypressed[DOWN]) {
            bulletInfo['velocity']['X'] = 0 + DefaultGun.getRandomVelocity();
            bulletInfo['velocity']['Y'] = 4;
            bulletInfo['position']['X'] = this.item.x  + (this.item.width/2);
            bulletInfo['position']['Y'] = this.item.y + this.item.height;
        } else if (this.item.keypressed[RIGHT]) {
            bulletInfo['velocity']['X'] = 4;
            bulletInfo['velocity']['Y'] = 0 + DefaultGun.getRandomVelocity();
            bulletInfo['position']['X'] = this.item.x + this.item.width;
            bulletInfo['position']['Y'] = this.item.y+ (this.item.height/2);
        } else if (this.item.lastKeyPressed === UP) {
            bulletInfo['velocity']['X'] = 0 + DefaultGun.getRandomVelocity();
            bulletInfo['velocity']['Y'] = -4;
            bulletInfo['position']['X'] = this.item.x + (this.item.width/2);
            bulletInfo['position']['Y'] = this.item.y;
        } else if (this.item.lastKeyPressed === DOWN) {
            bulletInfo['velocity']['X'] = 0 + DefaultGun.getRandomVelocity();
            bulletInfo['velocity']['Y'] = 4;
            bulletInfo['position']['X'] = this.item.x  + (this.item.width/2);
            bulletInfo['position']['Y'] = this.item.y + this.item.height;
        } else if (this.item.lastKeyPressed === LEFT) {
            bulletInfo['velocity']['X'] = -4;
            bulletInfo['velocity']['Y'] = 0 + DefaultGun.getRandomVelocity();
            bulletInfo['position']['X'] = this.item.x;
            bulletInfo['position']['Y'] = this.item.y+ (this.item.height/2);
        } else if (this.item.lastKeyPressed === RIGHT) {
            bulletInfo['velocity']['X'] = 4;
            bulletInfo['velocity']['Y'] = 0 + DefaultGun.getRandomVelocity();
            bulletInfo['position']['X'] = this.item.x + this.item.width;
            bulletInfo['position']['Y'] = this.item.y+ (this.item.height/2);
        }
        return bulletInfo
    }

    //Todo amélioré ca,
    // Je pense pas que le min/max change quoi que se soit MDR
    static getRandomVelocity() {
        let min = -0.0002;
        let max = 0.0002;
        return Math.random() * (max - min + 2) - 1;

    }

    get isShooting() {
        return this._isShooting;
    }

    set isShooting(value) {
        this._isShooting = value;
    }

    deleteBullet(object) {
        let index = this.bullets.indexOf(object);
        if (index > -1) {
            this.bullets.splice(index, 1);
        }
    }
    addBullet(object) {
        this._bullets.push(object);
    };

    get bullets() {
        return this._bullets;
    }

    set bullets(value) {
        this._bullets = value;
    }

    get bulletCooldown() {
        return this._bulletCooldown;
    }

    set bulletCooldown(value) {
        this._bulletCooldown = value;
    }

    get nextBullet() {
        return this._nextBullet;
    }

    set nextBullet(value) {
        this._nextBullet = value;
    }

    get item() {
        return this._item;
    }

    set item(value) {
        this._item = value;
    }

    get hudSprite() {
        return this._hudSprite;
    }

    set hudSprite(value) {
        this._hudSprite = value;
    }
}