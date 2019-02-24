class DefaultGun {

    constructor(item) {
        this._isShooting = false;
        this._bullets = [];

        this._bulletCooldown = 30;
        this._nextBullet = 0;

        this._item = item;


        //Todo refact HUDSprite ?
        this._hudSprite = new Animation(Animations.GunList.Default);

    }

    drawInventory(x, y) {
        animation(this.hudSprite, x, y);
    }

    shootBullet(tree) {
        if (this.nextBullet <= 0) {
            let newBullet;
            let bulletInfo = this.generateBulletCoordinate();
            newBullet = new Bullet(bulletInfo);
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
            bulletInfo.velocityY = -6 + DefaultGun.getRandomVelocity();
            bulletInfo.velocityX = -6 + DefaultGun.getRandomVelocity();
            bulletInfo.x = this.item.x;
            bulletInfo.y = this.item.y;
        } else if (this.item.keypressed[UP] && this.item.keypressed[RIGHT]) {
            bulletInfo.velocityY = -6 + DefaultGun.getRandomVelocity();
            bulletInfo.velocityX = 6 + DefaultGun.getRandomVelocity();
            bulletInfo.x = this.item.x + this.item.width;
            bulletInfo.y = this.item.y;
        } else if (this.item.keypressed[RIGHT] && this.item.keypressed[DOWN]) {
            bulletInfo.velocityY = 6 + DefaultGun.getRandomVelocity();
            bulletInfo.velocityX = 6 + DefaultGun.getRandomVelocity();
            bulletInfo.x = this.item.x + this.item.width;
            bulletInfo.y = this.item.y + this.item.height;
        } else if (this.item.keypressed[LEFT] && this.item.keypressed[DOWN]) {
            bulletInfo.velocityY = 6 + DefaultGun.getRandomVelocity();
            bulletInfo.velocityX = -6 + DefaultGun.getRandomVelocity();
            bulletInfo.x = this.item.x;
            bulletInfo.y = this.item.y + this.item.height;
        } else if (this.item.keypressed[UP]) {
            bulletInfo.velocityX = 0 + DefaultGun.getRandomVelocity();
            bulletInfo.velocityY = -6;
            bulletInfo.x = this.item.x + (this.item.width / 2);
            bulletInfo.y = this.item.y;
        } else if (this.item.keypressed[LEFT]) {
            bulletInfo.velocityX = -6;
            bulletInfo.velocityY = 0 + DefaultGun.getRandomVelocity();
            bulletInfo.x = this.item.x;
            bulletInfo.y = this.item.y + (this.item.height / 2);
        } else if (this.item.keypressed[DOWN]) {
            bulletInfo.velocityX = 0 + DefaultGun.getRandomVelocity();
            bulletInfo.velocityY = 6;
            bulletInfo.x = this.item.x + (this.item.width / 2);
            bulletInfo.y = this.item.y + this.item.height;
        } else if (this.item.keypressed[RIGHT]) {
            bulletInfo.velocityX = 6;
            bulletInfo.velocityY = 0 + DefaultGun.getRandomVelocity();
            bulletInfo.x = this.item.x + this.item.width;
            bulletInfo.y = this.item.y + (this.item.height / 2);
        } else if (this.item.lastKeyPressed === UP) {
            bulletInfo.velocityX = 0 + DefaultGun.getRandomVelocity();
            bulletInfo.velocityY = -6;
            bulletInfo.x = this.item.x + (this.item.width / 2);
            bulletInfo.y = this.item.y;
        } else if (this.item.lastKeyPressed === DOWN) {
            bulletInfo.velocityX = 0 + DefaultGun.getRandomVelocity();
            bulletInfo.velocityY = 6;
            bulletInfo.x = this.item.x + (this.item.width / 2);
            bulletInfo.y = this.item.y + this.item.height;
        } else if (this.item.lastKeyPressed === LEFT) {
            bulletInfo.velocityX = -6;
            bulletInfo.velocityY = 0 + DefaultGun.getRandomVelocity();
            bulletInfo.x = this.item.x;
            bulletInfo.y = this.item.y + (this.item.height / 2);
        } else if (this.item.lastKeyPressed === RIGHT) {
            bulletInfo.velocityX = 6;
            bulletInfo.velocityY = 0 + DefaultGun.getRandomVelocity();
            bulletInfo.x = this.item.x + this.item.width;
            bulletInfo.y = this.item.y + (this.item.height / 2);
        }
        return bulletInfo
    }

    //Todo amélioré ca,
    // Je pense pas que le min/max change quoi que se soit MDR
    static getRandomVelocity(xMin = -1, xMax = 1) {
        return random(xMin, xMax );
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