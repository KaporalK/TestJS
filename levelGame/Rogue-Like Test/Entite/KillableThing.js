/**
 * @class KillableThing
 *
 * Class très basique pour faire un mechant
 */
class KillableThing extends AnimatedObject {


    constructor(params) {
        super(params);
        //TODO config ?
        this.color = [0, 168, 0];

        this.colidingClass = new KillableThingColiding(this);
        this.ai = new KillableAI(this);

        this._detectionPlayerRange = 350;
        this._maxPlayerRange = 550;
        this._movingToTarget = false;
        this._target = null;

        this._hp = 100;
        this._maxHp = this._hp;
        //KnockNackVelocity ||force velocity a ajouter au mouvement ?
        this._baseVelocityX = this.velocityX;
        this._baseVelocityY = this.velocityY;
        this._resistance = 5;

        this._friction = 0.5;
        this._force = {x: 0, y: 0, puissance: 0};

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

        if (this.hp <= 0) {
            this.shoundIBeDeleted = true;
            return;
        }

        //-------------------UNIQUEMENT POUR LA SELECTION DU TARGET POUR LA PROCHAINE FRAME--------------//
        this.ai.live(Engine);
        //-------------------FIN------------------------

        this.applyNextMove();
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

    targetDistance(Player) {
        let a = Player.x - this.x;
        let b = Player.y - this.y;
        return Math.sqrt(a * a + b * b);
    }

    isBrickBetweenUs(Player, waypoint) {
        let playerPos = [
            {
                x: Player.x,
                y: Player.y,
            },
            {
                x: Player.x + Player.width,
                y: Player.y,
            },
            {
                x: Player.x,
                y: Player.y + Player.height,
            },
            {
                x: Player.x + Player.width,
                y: Player.y + Player.height,
            },
        ];
        let thisPos = [
            {
                x: this.x,
                y: this.y,
            }, {
                x: this.x + this.width,
                y: this.y,
            }, {
                x: this.x,
                y: this.y + this.height,
            }, {
                x: this.x,
                y: this.y + this.height,
            },
        ];
        let colide = false;
        for (let i = 0; i < 4; i++) {
            let det, gamma, lambda;
            det = (thisPos[i].x - playerPos[i].x) * (waypoint.BrickY2 - waypoint.BrickY1) - (waypoint.BrickX2 - waypoint.BrickX1) * (thisPos[i].y - playerPos[i].y);
            gamma = ((playerPos[i].y - thisPos[i].y) * (waypoint.BrickX2 - playerPos[i].x) + (thisPos[i].x - playerPos[i].x) * (waypoint.BrickY2 - playerPos[i].y)) / det;
            if (det === 0) {
                return false;
            } else {
                lambda = ((waypoint.BrickY2 - waypoint.BrickY1) * (waypoint.BrickX2 - playerPos[i].x) + (waypoint.BrickX1 - waypoint.BrickX2) * (waypoint.BrickY2 - playerPos[i].y)) / det;
                if (!colide) {
                    colide = (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
                }
            }
        }
        return colide;
    };

    //Debug
    checkWitchSide(waypoint) {
        let where = '';
        if (waypoint.orientation === 'vertical') {
            if (this.x < waypoint.x) {
                where = 'left';
            } else if (this.x > waypoint.x) {
                where = 'right';
            }
        } else if (waypoint.orientation === 'horizontal') {
            if (this.y < waypoint.y) {
                where = 'up';
            } else if (this.y > waypoint.y) {
                where = 'down';
            }
        }
        return where;
    }


    applyNextMove() {
        this.prevX = this.x;
        this.prevY = this.y;

        this.prevDirectionX = this.directionX !== this.prevDirectionX ? this.directionX : this.prevDirectionX;
        this.prevDirectionY = this.directionY !== this.prevDirectionY ? this.directionY : this.prevDirectionY;

        if (this.nextX < this.x) {
            this.directionX = 'right'
        } else if (this.nextX > this.x) {
            this.directionX = 'left'
        }
        if (this.nextY > this.y) {
            this.directionY = 'down'
        } else if (this.nextY < this.y) {
            this.directionY = 'up'
        }

        this.x = this.nextX;
        this.y = this.nextY;

    }


    respawn() {
        this.x = Math.floor(Math.random() * 750) + 1;
        this.y = Math.floor(Math.random() * 750) + 1;
    }

    amIBlocked() {
        return (this.movingToTarget && this.prevX === this.nextX && this.prevY === this.nextY);
    }

    get friction() {
        return this._friction;
    }

    set friction(value) {
        this._friction = value;
    }

    get baseVelocityX() {
        return this._baseVelocityX;
    }

    set baseVelocityX(value) {
        this._baseVelocityX = value;
    }

    get baseVelocityY() {
        return this._baseVelocityY;
    }

    set baseVelocityY(value) {
        this._baseVelocityY = value;
    }

    get resistance() {
        return this._resistance;
    }

    set resistance(value) {
        this._resistance = value;
    }

    get hp() {
        return this._hp;
    }

    set hp(value) {
        this._hp = value;
    }

    get detectionPlayerRange() {
        return this._detectionPlayerRange;
    }

    set detectionPlayerRange(value) {
        this._detectionPlayerRange = value;
    }

    get maxPlayerRange() {
        return this._maxPlayerRange;
    }

    set maxPlayerRange(value) {
        this._maxPlayerRange = value;
    }

    get force() {
        return this._force;
    }

    set force(value) {
        this._force = value;
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

    get movingToTarget() {
        return this._movingToTarget;
    }

    set movingToTarget(value) {
        this._movingToTarget = value;
    }

    get target() {
        return this._target;
    }

    set target(value) {
        this._target = value;
    }

    get maxHp() {
        return this._maxHp;
    }

    set maxHp(value) {
        this._maxHp = value;
    }
}

