class ShotGun extends Gun {

    constructor(item) {
        //TODO superclass gun plus utile que ca
        super();

        this._isShooting = false;
        this._bullets = [];
        this._bulletClass = Bullet;

        this._bulletCooldown = 90;
        this._nextBullet = 0;

        this._item = item;


        //Todo refact HUDSprite ?
        this._hudSprite = new Animation(Animations.GunList.ShotGun);

    }

    drawInventory(x, y) {
        animation(this.hudSprite, x, y);
    }

    shootBullet(tree) {
        if (this.nextBullet <= 0) {
            let newBullet = [];
            //Todo bulet count pour les guns
            for (let i = 0; i < 4; i++) {
                newBullet[i] = new this.bulletClass(this.generateBulletCoordinate());
            }
            tree.insert(newBullet);
            this.addBullet(newBullet);
            this.nextBullet = this.bulletCooldown;
        }
    }

    generateBulletCoordinate() {
        let bulletInfo = {
            x: 0,
            y: 0,
            velocityX: 0,
            velocityY: 0,
            width: 2,
            height: 2
        };

        if (this.item.keypressed[UP] && this.item.keypressed[LEFT]) {
            bulletInfo.velocityY = -ShotGun.getRandomVelocity(5, 7);
            bulletInfo.velocityX = -ShotGun.getRandomVelocity(5, 7);
            bulletInfo.x = this.item.x;
            bulletInfo.y = this.item.y;
        } else if (this.item.keypressed[UP] && this.item.keypressed[RIGHT]) {
            bulletInfo.velocityY = -ShotGun.getRandomVelocity(5, 7);
            bulletInfo.velocityX = ShotGun.getRandomVelocity(5, 7);
            bulletInfo.x = this.item.x + this.item.width;
            bulletInfo.y = this.item.y;
        } else if (this.item.keypressed[RIGHT] && this.item.keypressed[DOWN]) {
            bulletInfo.velocityY = ShotGun.getRandomVelocity(5, 7);
            bulletInfo.velocityX = ShotGun.getRandomVelocity(5, 7);
            bulletInfo.x = this.item.x + this.item.width;
            bulletInfo.y = this.item.y + this.item.height;
        } else if (this.item.keypressed[LEFT] && this.item.keypressed[DOWN]) {
            bulletInfo.velocityY = ShotGun.getRandomVelocity(5, 7);
            bulletInfo.velocityX = -ShotGun.getRandomVelocity(5, 7);
            bulletInfo.x = this.item.x;
            bulletInfo.y = this.item.y + this.item.height;
        } else if (this.item.keypressed[UP]) {
            bulletInfo.velocityX = ShotGun.getRandomVelocity();
            bulletInfo.velocityY = -ShotGun.getRandomVelocity(5, 7);
            bulletInfo.x = this.item.x + (this.item.width / 2);
            bulletInfo.y = this.item.y;
        } else if (this.item.keypressed[LEFT]) {
            bulletInfo.velocityX = -ShotGun.getRandomVelocity(5, 7);
            bulletInfo.velocityY = ShotGun.getRandomVelocity();
            bulletInfo.x = this.item.x;
            bulletInfo.y = this.item.y + (this.item.height / 2);
        } else if (this.item.keypressed[DOWN]) {
            bulletInfo.velocityX = ShotGun.getRandomVelocity();
            bulletInfo.velocityY = ShotGun.getRandomVelocity(5, 7);
            bulletInfo.x = this.item.x + (this.item.width / 2);
            bulletInfo.y = this.item.y + this.item.height;
        } else if (this.item.keypressed[RIGHT]) {
            bulletInfo.velocityX = ShotGun.getRandomVelocity(5, 7);
            bulletInfo.velocityY = ShotGun.getRandomVelocity();
            bulletInfo.x = this.item.x + this.item.width;
            bulletInfo.y = this.item.y + (this.item.height / 2);
        } else if (this.item.lastKeyPressed === UP) {
            bulletInfo.velocityX = ShotGun.getRandomVelocity();
            bulletInfo.velocityY = -ShotGun.getRandomVelocity(5, 7);
            bulletInfo.x = this.item.x + (this.item.width / 2);
            bulletInfo.y = this.item.y;
        } else if (this.item.lastKeyPressed === DOWN) {
            bulletInfo.velocityX = ShotGun.getRandomVelocity();
            bulletInfo.velocityY = ShotGun.getRandomVelocity(5, 7);
            bulletInfo.x = this.item.x + (this.item.width / 2);
            bulletInfo.y = this.item.y + this.item.height;
        } else if (this.item.lastKeyPressed === LEFT) {
            bulletInfo.velocityX = -ShotGun.getRandomVelocity(5, 7);
            bulletInfo.velocityY = ShotGun.getRandomVelocity();
            bulletInfo.x = this.item.x;
            bulletInfo.y = this.item.y + (this.item.height / 2);
        } else if (this.item.lastKeyPressed === RIGHT) {
            bulletInfo.velocityX = ShotGun.getRandomVelocity(5, 7);
            bulletInfo.velocityY = ShotGun.getRandomVelocity();
            bulletInfo.x = this.item.x + this.item.width;
            bulletInfo.y = this.item.y + (this.item.height / 2);
        }
        return bulletInfo
    }

    //Todo amélioré ca,
    static getRandomVelocity(xMin = -1, xMax = 1) {
        return random(xMin, xMax);
    }

    get isShooting() {
        return this._isShooting;
    }

    set isShooting(value) {
        this._isShooting = value;
    }

    get bulletClass() {
        return this._bulletClass;
    }

    set bulletClass(value) {
        this._bulletClass = value;
    }

    deleteBullet(object) {
        let index = this.bullets.indexOf(object);
        if (index > -1) {
            this.bullets.splice(index, 1);
        }
    }

    addBullet(item) {
        if (item instanceof Array) {
            let len = item.length;
            let i;
            for (i = 0; i < len; i++) {
                this._bullets.push(item[i]);
            }
        } else {
            this._bullets.push(item);
        }

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