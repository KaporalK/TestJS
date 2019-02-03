/**
 * @class KillableThing
 *
 * Class très basique pour faire un mechant
 */
class KillableThing extends AnimatedObject {

    constructor(y, x, width, height, velocityX, velocityY, poids, alphaBounce) {
        super(y, x, width, height, velocityX, velocityY, poids, alphaBounce);
        //TODO config ?
        this.color = [0, 168, 0];

        this.colidingClass = new KillableThingColiding(this);
        this._detectionPlayerRange = 150;
        this._maxPlayerRange = 350;
        this._movingToTarget = false;
        this._target = null;
        this._playerDetected = false;


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
        //Utilisation des Waypoints pour choisir sont target
        //Si le target n'est pas le joueur
        ///TODO tester mieu L'IA !!
        //TODO faire des class pour l'IA
        if (this.target !== Engine.levelList.player) {
            //Je vérifie que c'est un waypoint
            if (this.target instanceof Waypoint) {
                //Je regarde si le le block est toujours entre nous
                //si il est pas entre nous, le joueur redevien le target
                if (!this.isBrickBetweenUs(Engine.levelList.player, this.target)) {
                    this.target = Engine.levelList.player;
                } else if (this.targetDistance(Engine.levelList.player) > this.detectionPlayerRange) {
                    this.target = Engine.levelList.player;
                    this.movingToTarget = false
                }
            } else if (this.target === null) { //On pourrait set le player direct quand ont construit le killable ?
                this.target = Engine.levelList.player;
            }
            if (this.target instanceof SoSWaypoint && this.targetDistance(this.target) < this.width / 2) {
                Engine.levelList.deleteWaypoint(this.target);
                this.target = Engine.levelList.player;
            }
            this.moveToTarget(this.target);
            //Si le target est le joueur, ou je n'est pas de target
        } else if (this.target === Engine.levelList.player) {
            //Je check si il est en range
            this.movingToTarget = this.movingToTarget ? this.targetDistance(Engine.levelList.player) < this.maxPlayerRange
                : this.targetDistance(Engine.levelList.player) < this.detectionPlayerRange;
            if (this.movingToTarget) {
                //je regarde la liste des brick qui peuvent être entre lui et moi c-a-d ceux qui ont des waypoints
                Engine.levelList.brick.forEach(function (item) {
                    if (item.hasOwnProperty('_waypoints') && item.waypoints.length > 0) {
                        let x = item.waypoints.length;
                        for (let i = 0; i < x; i++) {
                            //Si la brick est entre lui est moi son waypoint devient le target
                            let brickbetUs = this.isBrickBetweenUs(Engine.levelList.player, item.waypoints[i]);
                            if (brickbetUs && this.playerDetected) {
                                console.log(this.checkWitchSide(item.waypoints[i]));
                                //Todo faire une liste des target possible pour choisir le plus proche si jamais y'en a plusieurs
                                this.target = item.waypoints[i];
                            } else if (!brickbetUs && !this.playerDetected) {
                                this.playerDetected = true;
                            }
                        }
                    }
                }, this);
                this.moveToTarget(this.target);
            }
        }

        if (this.moveUp && this.canMoveUp) {
            this.nextY = this.nextY - this.velocityY;
        }
        if (this.moveDown && this.canMoveDown) {
            this.nextY = this.nextY + this.velocityY;
        }
        if (this.moveLeft && this.canMoveLeft) {
            this.nextX = this.nextX - this.velocityX;
        }
        if (this.moveRight && this.canMoveRight) {
            this.nextX = this.nextX + this.velocityX;
        }

        //je suis bloqué
        if (this.movingToTarget && this.prevX === this.nextX && this.prevY === this.nextY) {
            if (!this.canMoveDown || !this.canMoveRight
                || !this.canMoveLeft || !this.canMoveUp) {
                let sosX;
                let sosY;
                if (this.directionY === 'down' && this.canMoveDown) {
                    sosY = this.y + this.width;
                } else if (this.directionY === 'up' && this.canMoveUp) {
                    sosY = this.y - this.width;
                } else {
                    sosY = this.y;
                }
                if (this.directionX === 'left' && this.canMoveLeft) {
                    sosX = this.x - this.width;
                } else if (this.directionX === 'right' && this.canMoveRight) {
                    sosX = this.x + this.width;
                } else {
                    sosX = this.x;
                }
                this.target = new SoSWaypoint(sosX, sosY, 15, 15);
                Engine.levelList.addWaypoint(this.target);
            }
        }

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

    // targetDistance(Player) {
    //     this.movingToTarget = !(
    //         (this.x - this.detectionPlayerRange >= Player.x + Player.width)      // trop à gauche
    //         || (this.x + this.width + this.detectionPlayerRange <= Player.x) // trop à gaucheighte
    //         || (this.y - this.detectionPlayerRange >= Player.y + Player.height) // trop en bas
    //         || (this.y + this.height + this.detectionPlayerRange <= Player.y)
    //     );
    // }

    targetDistance(Player) {
        let a = Player.x - this.x;
        let b = Player.y - this.y;
        return Math.sqrt(a * a + b * b);
    }

    isBrickBetweenUs(Player, waypoint) {
        let det, gamma, lambda;
        if (waypoint.side === 'yx') {
            det = (this.x - Player.x) * (waypoint.BrickY2 - waypoint.BrickY1) - (waypoint.BrickX2 - waypoint.BrickX1) * (this.y - Player.y);
            gamma = ((Player.y - this.y) * (waypoint.BrickX2 - Player.x) + (this.x - Player.x) * (waypoint.BrickY2 - Player.y)) / det;
        } else if (waypoint.side === 'xywh') {
            det = ((this.x + this.width) - Player.x) * (waypoint.BrickY2 - waypoint.BrickY1) - (waypoint.BrickX2 - waypoint.BrickX1) * ((this.y + this.height) - Player.y);
            gamma = ((Player.y - (this.y + this.height)) * (waypoint.BrickX2 - Player.x) + ((this.x + this.width) - Player.x) * (waypoint.BrickY2 - Player.y)) / det;
        }
        if (det === 0) {
            return false;
        } else {
            lambda = ((waypoint.BrickY2 - waypoint.BrickY1) * (waypoint.BrickX2 - Player.x) + (waypoint.BrickX1 - waypoint.BrickX2) * (waypoint.BrickY2 - Player.y)) / det;
            return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
        }
    };

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

    //TODO trouver un moyen plus intelligent de se déplacer
    moveToTarget(target) {
        if (target.x + (target.width / 2) < this.x + (this.width / 2)) {
            this.moveLeft = true;
        } else if (target.x + (target.width / 2) > this.x + (this.width / 2)) {
            this.moveRight = true;
        }
        if (target.y + (target.height / 2) < this.y + (this.height / 2)) {
            this.moveUp = true;
        } else if (target.y + (target.height / 2) > this.y + (this.height / 2)) {
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

    get maxPlayerRange() {
        return this._maxPlayerRange;
    }

    set maxPlayerRange(value) {
        this._maxPlayerRange = value;
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

    get playerDetected() {
        return this._playerDetected;
    }

    set playerDetected(value) {
        this._playerDetected = value;
    }

    get target() {
        return this._target;
    }

    set target(value) {
        this._target = value;
    }
}

