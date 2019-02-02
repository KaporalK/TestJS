/**
 * @class KillableThing
 *
 * Class très basique pour faire un mechant
 */
class KillableThing extends AnimatedObject {

    constructor(y, x, width, height, velocityX, velocityY, poids, alphaBounce) {
        super(y, x, width, height, velocityX, velocityY, poids, alphaBounce);
        this.color = [0, 168, 0];

        this.colidingClass = new KillableThingColiding(this);
        this._detectionPlayerRange = 200;

        this._moveUp = false;
        this._moveDown = false;
        this._moveLeft = false;
        this._moveRight = false;
        this._canMoveUp = true;
        this._canMoveDown = true;
        this._canMoveLeft = true;
        this._canMoveRight = true;
    }

    live(Engine) {
        this.findPlayer(Engine.levelList.player);
        if (this.playerInArea) {
            this.moveToPlayer(Engine.levelList.player);
        }

        if (this.moveUp && this.canMoveUp) {
            this.y -= this.velocityY;
        }
        if (this.moveDown && this.canMoveDown) {
            this.y += this.velocityY;
        }
        if (this.moveLeft && this.canMoveLeft) {
            this.x -= this.velocityX;
        }
        if (this.moveRight && this.canMoveRight) {
            this.x += this.velocityX;
        }

        this.canMoveUp = true;
        this.canMoveRight = true;
        this.canMoveDown = true;
        this.canMoveLeft = true;
        this.moveRight = false;
        this.moveDown = false;
        this.moveLeft = false;
        this.moveUp = false;
    }

    draw() {
        super.draw();
    }

    findPlayer(Player) {
        this.playerInArea = !(
            (this.x - this.detectionPlayerRange >= Player.x + Player.width)      // trop à gauche
            || (this.x + this.width + this.detectionPlayerRange <= Player.x) // trop à gaucheighte
            || (this.y - this.detectionPlayerRange >= Player.y + Player.height) // trop en bas
            || (this.y + this.height + this.detectionPlayerRange <= Player.y)
        );
    }

    //TODO trouver comment on va vers le joueur;
    moveToPlayer(Player) {
        if (Player.x + (Player.width / 2) < this.x + (this.width / 2)) {
            this.moveLeft = true;
        } else if (Player.x + (Player.width / 2) > this.x + (this.width / 2)) {
            this.moveRight = true;
        }
        if (Player.y + (Player.height / 2) < this.y + (this.height / 2)) {
            this.moveUp = true;
        } else if (Player.y + (Player.height / 2) > this.y + (this.height / 2)) {
            this.moveDown = true;
        }
    }

    respawn() {
        this.x = Math.floor(Math.random() * 750) + 1;
        this.y = Math.floor(Math.random() * 750) + 1;
    }

    get detectionPlayerRange() {
        return this._detectionPlayerRange;
    }

    set detectionPlayerRange(value) {
        this._detectionPlayerRange = value;
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
}

