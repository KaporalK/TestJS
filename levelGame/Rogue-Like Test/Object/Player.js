class Player extends AnimatedObject {


    /**
     *
     * @param posY
     * @param posX
     * @param largeur
     * @param hauteur
     * @param velocityX
     * @param velocityY
     * @param poids
     * @param alphaBounce
     */
    constructor(posY, posX, largeur, hauteur, velocityX, velocityY, poids, alphaBounce) {
        super(posY, posX, largeur, hauteur, velocityX, velocityY, poids, alphaBounce)


        this._moveUp = false;
        this._moveDown = false;
        this._moveLeft = false;
        this._moveRight = false;
        this._canMoveUp = true;
        this._canMoveDown = true;
        this._canMoveLeft = true;
        this._canMoveRight = true;

        this._orientation = {'X': 'right', 'Y': 'up'};

        this._isShooting = false;

        this._bulletCooldown = 30;

        this._bullets = [];

        this._keypressed = {};
        this._lastKeyPressed = '';

        this._moveSpeed = 1;

        this.registerPlayerEvent();
    }

    live(Engine) {
        let Player = this;

        this.detectPlayerBoderColision();

        if (this.moveUp && this.canMoveUp) {
            this.posY -= this.moveSpeed;
        }
        if (this.moveDown && this.canMoveDown){
            this.posY += this.moveSpeed;
        }
        if (this.moveLeft && this.canMoveLeft) {
            this.posX -= this.moveSpeed;
        }
        if (this.moveRight && this.canMoveRight) {
            this.posX += this.moveSpeed;
        }

        if (this.isShooting) {
            this.shootBullet();
        }

        this.bulletCooldown -= (this.bulletCooldown !== 0 ? 1 : 0);

        this._bullets.forEach(function (item, index, array) {
            if (item.shoundIBeDeleted) {
                Player.deleteBullet(item);
                return;
            }
            item.live(Engine);
        });

        // console.log(this.posX, this.posY);
        //Do somthing w/ physic to make the player move
        // console.log(gravity)
        super.live();

        this.canMoveUp = true;
        this.canMoveRight = true;
        this.canMoveDown = true;
        this.canMoveLeft = true;
    };

    draw() {
        this._bullets.forEach(function (item, index, array) {
            item.draw();
        });
        super.draw();
    };

    registerPlayerEvent() {
        document.addEventListener('keydown', (event) => {
                const keyCode = event.keyCode;
                switch (keyCode) {
                    case UP: //z
                        this.moveUp = true;
                        this.orientation['Y'] = 'up';
                        break;
                    case DOWN: //s
                        this.orientation['Y'] = 'down';
                        this.moveDown = true;
                        break;
                    case RIGHT: //d
                        this.orientation['X'] = 'right';
                        this.moveRight = true;
                        break;
                    case LEFT: //q
                        this.orientation['X'] = 'left';
                        this.moveLeft = true;
                        break;
                    case SPACE: //spaceBar
                        this.isShooting = true;
                        break;
                }
                this.keypressed[keyCode] = true;
            }
        );


        document.addEventListener('keyup', (event) => {
                const keyCode = event.keyCode;

                switch (keyCode) {
                    case UP: //z
                        this.lastKeyPressed = keyCode;
                        this.moveUp = false;
                        break;
                    case DOWN: //s
                        this.lastKeyPressed = keyCode;
                        this.moveDown = false;
                        break;
                    case RIGHT: //d
                        this.lastKeyPressed = keyCode;
                        this.moveRight = false;
                        break;
                    case LEFT: //q
                        this.lastKeyPressed = keyCode;
                        this.moveLeft = false;
                        break;
                    case SPACE: //spaceBar
                        this.isShooting = false;
                        this.keypressed[keyCode] = false;
                        break;
                }
                this.keypressed[keyCode] = false;
            }
        )
    }

    detectPlayerBoderColision() {

        if (10 > this.posX) {
            this.moveLeft = false;
        } else if (this.getBorderX() > width - 10) {
            this.moveRight = false;
        }
        if (10 > this.posY) {
            this.moveUp = false;
        } else if (this.getBorderY() > height - 10) {
            this.moveDown = false;
        }
    }

    shootBullet() {
        if (this._bulletCooldown <= 0) {
            let newBullet;
            let coordinate = this.generateBulletCoordinate();

            newBullet = new Bullet(coordinate['position']['Y'], coordinate['position']['X'],
                5, 5, coordinate['velocity']['X'], coordinate['velocity']['Y'], 5, 5);
            this.addBullet(newBullet);
            this.bulletCooldown = 10;
        }
    }

    deleteBullet(bullet) {
        let index = this.bullet.indexOf(bullet);
        if (index > -1) {
            this.bullet.splice(index, 1);
        }
    }

    generateBulletCoordinate() {
        let bulletInfo = {0: 'velocity', 1: 'position'};
        bulletInfo['velocity'] = {0: 'X', 1: 'Y'};
        bulletInfo['position'] = {0: 'X', 1: 'Y'};
        if (this.keypressed[UP] && this.keypressed[LEFT]) {
            bulletInfo['velocity']['Y'] = -2;
            bulletInfo['velocity']['X'] = -2;
            bulletInfo['position']['X'] = this.posX - 8;
            bulletInfo['position']['Y'] = this.posY - 8;
        } else if (this.keypressed[UP] && this.keypressed[RIGHT]) {
            bulletInfo['velocity']['Y'] = -2;
            bulletInfo['velocity']['X'] = 2;
            bulletInfo['position']['X'] = this.posX + 8;
            bulletInfo['position']['Y'] = this.posY - 8;
        } else if (this.keypressed[RIGHT] && this.keypressed[DOWN]) {
            bulletInfo['velocity']['Y'] = 2;
            bulletInfo['velocity']['X'] = 2;
            bulletInfo['position']['X'] = this.posX + 8;
            bulletInfo['position']['Y'] = this.posY + 8;
        } else if (this.keypressed[LEFT] && this.keypressed[DOWN]) {
            bulletInfo['velocity']['Y'] = 2;
            bulletInfo['velocity']['X'] = -2;
            bulletInfo['position']['X'] = this.posX - 8;
            bulletInfo['position']['Y'] = this.posY + 8;
        } else if (this.keypressed[UP]) {
            bulletInfo['velocity']['X'] = 0;
            bulletInfo['velocity']['Y'] = -2;
            bulletInfo['position']['X'] = this.posX;
            bulletInfo['position']['Y'] = this.posY - 10;
        } else if (this.keypressed[LEFT]) {
            bulletInfo['velocity']['X'] = -2;
            bulletInfo['velocity']['Y'] = 0;
            bulletInfo['position']['X'] = this.posX - 10;
            bulletInfo['position']['Y'] = this.posY;
        } else if (this.keypressed[DOWN]) {
            bulletInfo['velocity']['X'] = 0;
            bulletInfo['velocity']['Y'] = 2;
            bulletInfo['position']['X'] = this.posX;
            bulletInfo['position']['Y'] = this.posY + 10;
        } else if (this.keypressed[RIGHT]) {
            bulletInfo['velocity']['X'] = 2;
            bulletInfo['velocity']['Y'] = -0;
            bulletInfo['position']['X'] = this.posX + 10;
            bulletInfo['position']['Y'] = this.posY;
        } else if (this.lastKeyPressed === UP) {
            bulletInfo['velocity']['X'] = 0;
            bulletInfo['velocity']['Y'] = -2;
            bulletInfo['position']['X'] = this.posX;
            bulletInfo['position']['Y'] = this.posY - 10;
        } else if (this.lastKeyPressed === DOWN) {
            bulletInfo['velocity']['X'] = 0;
            bulletInfo['velocity']['Y'] = 2;
            bulletInfo['position']['X'] = this.posX;
            bulletInfo['position']['Y'] = this.posY + 10;
        } else if (this.lastKeyPressed === LEFT) {
            bulletInfo['velocity']['X'] = -2;
            bulletInfo['velocity']['Y'] = 0;
            bulletInfo['position']['X'] = this.posX - 10;
            bulletInfo['position']['Y'] = this.posY;
        } else if (this.lastKeyPressed === RIGHT) {
            bulletInfo['velocity']['X'] = 2;
            bulletInfo['velocity']['Y'] = -0;
            bulletInfo['position']['X'] = this.posX + 10;
            bulletInfo['position']['Y'] = this.posY;
        }
        return bulletInfo
    }


    get bullets() {
        return this._bullets;
    }

    set bullets(value) {
        this._bullets = value;
    }

    get lastKeyPressed() {
        return this._lastKeyPressed;
    }

    set lastKeyPressed(value) {
        this._lastKeyPressed = value;
    }

    get keypressed() {
        return this._keypressed;
    }

    set keypressed(value) {
        this._keypressed = value;
    }

    get isShooting() {
        return this._isShooting;
    }

    set isShooting(value) {
        this._isShooting = value;
    }

    get moveUp() {
        return this._moveUp;
    }

    set moveUp(value) {
        this._moveUp = value;
    }

    get moveDown() {
        return this._moveDown;
    }

    set moveDown(value) {
        this._moveDown = value;
    }

    get moveLeft() {
        return this._moveLeft;
    }

    set moveLeft(value) {
        this._moveLeft = value;
    }

    get moveRight() {
        return this._moveRight;
    }

    set moveRight(value) {
        this._moveRight = value;
    }

    get canMoveUp() {
        return this._canMoveUp;
    }

    set canMoveUp(value) {
        this._canMoveUp = value;
    }

    get canMoveDown() {
        return this._canMoveDown;
    }

    set canMoveDown(value) {
        this._canMoveDown = value;
    }

    get canMoveLeft() {
        return this._canMoveLeft;
    }

    set canMoveLeft(value) {
        this._canMoveLeft = value;
    }

    get canMoveRight() {
        return this._canMoveRight;
    }

    set canMoveRight(value) {
        this._canMoveRight = value;
    }

    get orientation() {
        return this._orientation;
    }

    set orientation(value) {
        this._orientation = value;
    }


    get bulletCooldown() {
        return this._bulletCooldown;
    }

    set bulletCooldown(value) {
        this._bulletCooldown = value;
    }

    get bullet() {
        return this._bullets;
    }

    set bullet(value) {
        this._bullets = value;
    }

    addBullet(object) {
        this._bullets.push(object);
    };

    get moveSpeed() {
        return this._moveSpeed;
    }

    set moveSpeed(value) {
        this._moveSpeed = value;
    }
}