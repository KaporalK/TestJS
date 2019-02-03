/**
 *@class AnimatedObject
 *
 * @param x
 * @param y
 * @param width
 * @param height
 * @param velocityX pas vraiment utilisé
 * @param velocityY pas vraiment utilisé
 * @param poids nonUtilisé
 * @param alphaBounce non utilisé
 *
 * Cette class représente la base d'un objet qui bouge
 * elle a des fonction très simple et ne devrais pas être utiliser tel quel
 *
 * TODO rework cette class pour un
 *  @class drawableObject
 *      @class AnimatedObject
 *      @class BrickObject
 *
 */
class AnimatedObject {
    /**
     * @param y
     * @param x
     * @param width
     * @param height
     * @param velocityX
     * @param velocityY
     * @param poids
     * @param alphaBounce
     */
    constructor(y, x, width, height, velocityX, velocityY, poids, alphaBounce) {

        this._shoundIBeDeleted = false;

        this._spawn = {x: x, y: y};

        this._x = x;
        this._y = y;

        this._prevX = 0;
        this._prevY = 0;

        this._nextY = y;
        this._nextX = x;

        this._directionX = '';
        this._directionY = '';

        this._width = width;
        this._height = height;

        //1 = droite
        // this._directionX = 1;
        // 1 un bas;
        // this._directionY = 1;
        this._velocityX = velocityX;
        this._velocityY = velocityY;

        this._alphaBounce = alphaBounce;
        this._poids = poids;
        this._color = 255;

        this._colidingClass = null;
    }


    live(Engine) {
        this.y += this.velocityY; //* this.directionY;
        this.x += this.velocityX; //* this.directionX;
    };

    draw() {
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
    };

    applyNextMove() {
        this.prevX = this.x;
        this.prevY = this.y;

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


    detectColision() {
        //todo faire un truc
        return true;
    }

    get spawn() {
        return this._spawn;
    }

    set spawn(value) {
        this._spawn = value;
    }

    getBorderX(nextMove = false) {
        if (nextMove) {
            return this.nextX + this.width;
        }
        return this.x + this.width;
    }

    getBorderY(nextMove = false) {
        if (nextMove) {
            return this.nextY + this.height;
        }
        return this.y + this.height;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get velocityX() {
        return this._velocityX;
    }

    set velocityX(value) {
        this._velocityX = value;
    }

    get velocityY() {
        return this._velocityY;
    }

    set velocityY(value) {
        this._velocityY = value;
    }

    get poids() {
        return this._poids;
    }

    set poids(value) {
        this._poids = value;
    }

    get alphaBounce() {
        return this._alphaBounce;
    }

    set alphaBounce(value) {
        this._alphaBounce = value;
    }

    get directionX() {
        return this._directionX;
    }

    set directionX(value) {
        this._directionX = value;
    }

    get directionY() {
        return this._directionY;
    }

    set directionY(value) {
        this._directionY = value;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

    get shoundIBeDeleted() {
        return this._shoundIBeDeleted;
    }

    set shoundIBeDeleted(value) {
        this._shoundIBeDeleted = value;
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }

    get colidingClass() {
        return this._colidingClass;
    }

    set colidingClass(value) {
        this._colidingClass = value;
    }

    get nextY() {
        return this._nextY;
    }


    set nextY(value) {
        this._nextY = value;
    }

    get nextX() {
        return this._nextX;
    }


    set nextX(value) {
        this._nextX = value;
    }

    get prevX() {
        return this._prevX;
    }

    set prevX(value) {
        this._prevX = value;
    }

    get prevY() {
        return this._prevY;
    }

    set prevY(value) {
        this._prevY = value;
    }
}
