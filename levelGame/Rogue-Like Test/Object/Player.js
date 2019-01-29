/**
 * @class Player
 *
 * @param super
 *
 * Cette classe représente le joueur qu'on joue
 */
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
                2, 2, coordinate['velocity']['X'], coordinate['velocity']['Y'], 5, 5);
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

    //TODO check ca quand y'aura des colision mieux
    // https://github.com/mikechambers/ExamplesByMesh/tree/master/JavaScript/QuadTree

    //TODO séparé le terrain en carré pour trié plus vite les element a detecter la colision
    // meilleur offset actuellement je multipli les dessin par deux pour avoir eventuellement moins de pixel a calculer lors des colision
    // mais ca reste bancale

    detectColision(brickList) {
        let Player = this;
        brickList.forEach(function (item, index, array) {
            if (Player.detectBasicColision(item)) {
                //TODO implémenter une interface de colision pour que cette fonction soit jolie et que je puisse traiter
                // tous les object de la même facon pour les colision dans l'engine
                // Actuelement je gere que le player mdr.
                let newY = Player.posY;
                let newX = Player.posX;
                let nextMoveX = null;
                let nextMoveY = null;
                if (Player.moveUp && Player.canMoveUp) {
                    newY = Player.posY - Player.moveSpeed;
                }
                if (Player.moveDown && Player.canMoveDown) {
                    newY = Player.posY + Player.moveSpeed;
                }
                if (Player.moveLeft && Player.canMoveLeft) {
                    newX = Player.posX - Player.moveSpeed;
                }
                if (Player.moveRight && Player.canMoveRight) {
                    newX = Player.posX + Player.moveSpeed;
                }
                //du génie !
                if(Player.detectRealColision(newX, newY, item)){
                    if( !Player.detectLeftColision(newX, newY, item)){
                        Player.canMoveLeft = false;
                    }
                    if( !Player.detectRightColision(newX, newY, item)){
                        Player.canMoveRight = false;
                    }
                    if( !Player.detectDownColision(newX, newY, item)){
                        Player.canMoveDown = false;
                    }
                    if( !Player.detectUpColision(newX, newY, item)){
                        Player.canMoveUp = false;
                    }
                }
            }
        })
    }

    detectBasicColision(item) {
        return !(
            (this.posX - COLISION_DETECTION_OFFSET >= item.posX + item.largeur)      // trop à gauche
            || (this.posX + this.largeur + COLISION_DETECTION_OFFSET <= item.posX) // trop à gauchauteure
            || (this.posY - COLISION_DETECTION_OFFSET >= item.posY + item.hauteur) // trop en bas
            || (this.posY + this.hauteur + COLISION_DETECTION_OFFSET <= item.posY)
        );
    }

    detectRealColision(itemX, itemY, brick) {
        return (itemX < brick.posX + brick.largeur &&
            itemX + this.largeur > brick.posX &&
            itemY  < brick.posY + brick.hauteur &&
            itemY  + this.hauteur > brick.posY
        )
    }

    //Très mauvais nom
    detectLeftColision(itemX, itemY, brick) {
        return (itemX + COLISION_OFFSET * this.moveSpeed < brick.posX + brick.largeur &&
            itemX + this.largeur > brick.posX &&
            itemY  < brick.posY + brick.hauteur &&
            itemY  + this.hauteur > brick.posY
        )
    }

    //Très mauvais nom
    detectRightColision(itemX, itemY, brick) {
        return (itemX < brick.posX + brick.largeur &&
            itemX + this.largeur - COLISION_OFFSET * this.moveSpeed > brick.posX &&
            itemY  < brick.posY + brick.hauteur &&
            itemY  + this.hauteur > brick.posY
        )
    }
    //Très mauvais nom
    detectUpColision(itemX, itemY, brick) {
        return (itemX < brick.posX + brick.largeur &&
            itemX + this.largeur > brick.posX &&
            itemY + COLISION_OFFSET * this.moveSpeed  < brick.posY + brick.hauteur &&
            itemY  + this.hauteur > brick.posY
        )
    }
    //Très mauvais nom
    detectDownColision(itemX, itemY, brick) {
        return (itemX < brick.posX + brick.largeur &&
            itemX + this.largeur - COLISION_OFFSET * this.moveSpeed > brick.posX &&
            itemY  < brick.posY + brick.hauteur &&
            itemY  + this.hauteur - COLISION_OFFSET * this.moveSpeed > brick.posY
        )
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