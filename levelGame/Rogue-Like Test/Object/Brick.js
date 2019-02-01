/**
 * @class Brick
 *
 * @param y
 * @param x
 * @param width
 * @param height
 *
 * Cette classe représente la base pour un mur
 * Un mur qui ne bouge pas.
 * On calculera pas les colision depuis une Brick
 *
 *TODO rework cette class pour un
 *  @class drawableObject
 *      @class AnimatedObject
 *      @class BrickObject
 */
class Brick {

    constructor(y, x, width, height,) {

        this._shoundIBeDeleted = false;
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }

    draw() {
        fill(255, 0, 0);
        rect(this.x , this.y , this.width , this.height );
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
}