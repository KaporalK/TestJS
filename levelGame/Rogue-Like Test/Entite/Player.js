/**
 * @class Player
 *
 * @param super
 * @param y
 * @param x
 * @param width
 * @param height
 * @param velocityX
 * @param velocityY
 *
 * Cette classe représente le joueur qu'on joue
 */

// import {PlayerColiding} from "./ColidingClass/PlayerColiding";

class Player extends WithInventory {

    constructor(params) {
        super(params);

        this._moveUp = false;
        this._moveDown = false;
        this._moveLeft = false;
        this._moveRight = false;
        this._canMoveUp = true;
        this._canMoveDown = true;
        this._canMoveLeft = true;
        this._canMoveRight = true;

        this._hp = 1000;
        this._invincibleForXFrame = 0;
        this._invincibleFrame = 120;
        //todo estce vraiment necessaire ?
        this._orientation = {'X': 'right', 'Y': 'up'};

        this._force = {x: 0, y: 0, puissance: 0};
        this._friction = 0.9;


        this._appliableBehaviour = [];

        this._keypressed = {};
        this._lastKeyPressed = '';

        this._moveSpeed = 2;

        //C'est un état particulier qui va intérompre les autres états et empécher plus de dégat + knockback
        this._knockback = null;

        this.registerPlayerEvent();

        this._inventory.addGunAndSetCurrent(new DefaultGun(this));

        this.colidingClass = new PlayerColiding(this);
    }

    live(Engine) {

        if (this.hp <= 0) {
            this.shouldIBeDeleted = true;
        }
        //todo réfléchir sur les frame d'invincibilité par rapport au knockback
        if (this.invincibleForXFrame > 0) {
            this.invincibleForXFrame--;
        }

        if (this.knockback !== null) {
            const end = this.knockback.updateEntity(this);
            console.log('toto');
            this.detectPlayerBoderColision(Engine);
            if (end) {
                this.knockback = null;
            }
        } else {
            this.detectPlayerBoderColision(Engine);

            if (this.moveUp && this.canMoveUp && this.y === this.nextY) {
                this.nextY -= this.moveSpeed;
            }
            if (this.moveDown && this.canMoveDown && this.y === this.nextY) {
                this.nextY += this.moveSpeed;
            }
            if (this.moveLeft && this.canMoveLeft && this.x === this.nextX) {
                this.nextX -= this.moveSpeed;
            }
            if (this.moveRight && this.canMoveRight && this.x === this.nextX) {
                this.nextX += this.moveSpeed;
            }

            this.appliableBehaviour.forEach(function (item) {
                console.log('BITE');
                if (!item.active) {
                    let i = this.appliableBehaviour.indexOf(item);
                    this.appliableBehaviour.splice(i);
                    return;
                }
                item.updateEntity(this);
            }, this);
        }

        this.applyNextMove();

        if (this.inventory.currentGun.isShooting) {
            this.inventory.currentGun.shootBullet(Engine.tree);
        }
        this.inventory.currentGun.nextBullet -= (this.inventory.currentGun.nextBullet !== 0 ? 1 : 0);

        this.canMoveUp = true;
        this.canMoveRight = true;
        this.canMoveDown = true;
        this.canMoveLeft = true;
    };

    draw() {
        this.inventory.currentGun.bullets.forEach(function (item) {
            item.draw();
        });
        super.draw();
    };

    //Enregistre les evenement pour le Player
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
                        // this.isShooting = true;
                        this.inventory.currentGun.isShooting = true;
                        break;
                    case 69: //spaceBar
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
                        // this.isShooting = false;
                        this.inventory.currentGun.isShooting = false;
                        this.keypressed[keyCode] = false; //Wtf ?
                        break;
                }
                this.keypressed[keyCode] = false;
            }
        )
    }

    //Todo better border detection
    detectPlayerBoderColision(Engine) {
        if (Engine.levelList.offset.x > this.x) {
            this.moveLeft = false;
        } else if (this.getBorderX() > Engine.levelList.offset.width) {
            this.moveRight = false;
        }
        if (Engine.levelList.offset.y > this.y) {
            this.moveUp = false;
        } else if (this.getBorderY() > Engine.levelList.offset.height) {
            this.moveDown = false;
        }
    }

    respawn() {
        this.nextX = this.spawn.x;
        this.nextY = this.spawn.y;
        this.bullet = [];
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

    get nextBullet() {
        return this._nextBullet;
    }

    set nextBullet(value) {
        this._nextBullet = value;
    }

    get hp() {
        return this._hp;
    }

    set hp(value) {
        this._hp = value;
    }

    get invincibleForXFrame() {
        return this._invincibleForXFrame;
    }

    set invincibleForXFrame(value) {
        this._invincibleForXFrame = value;
    }

    get invincibleFrame() {
        return this._invincibleFrame;
    }

    set invincibleFrame(value) {
        this._invincibleFrame = value;
    }

    get force() {
        return this._force;
    }

    set force(value) {
        this._force = value;
    }

    get appliableBehaviour() {
        return this._appliableBehaviour;
    }

    set appliableBehaviour(value) {
        this._appliableBehaviour = value;
    }

    get friction() {
        return this._friction;
    }

    set friction(value) {
        this._friction = value;
    }

    get knockback() {
        return this._knockback;
    }

    set knockback(value) {
        this._knockback = value;
    }
}