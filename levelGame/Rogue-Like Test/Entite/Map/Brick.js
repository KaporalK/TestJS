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

    constructor(params) {

        this._shouldIBeDeleted = false;
        this._x = params.x;
        this._y = params.y;
        this._width = params.width;
        this._height = params.height;

        this._waypoints = [];
        this._color = [255, 0 ,0];

    }

    draw() {
        fill(this.color);
        rect(this.x , this.y , this.width , this.height );
        // this.color = [255, 0 ,0];
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

    get shouldIBeDeleted() {
        return this._shouldIBeDeleted;
    }

    set shouldIBeDeleted(value) {
        this._shouldIBeDeleted = value;
    }

    get waypoints() {
        return this._waypoints;
    }

    set waypoints(value) {
        this._waypoints = value;
    }

    addWaypoint(waypoint) {
        this.waypoints.push(waypoint);
    }

    deleteWaypoint(object) {
        let index = this.waypoints.indexOf(object);
        if (index > -1) {
            this.waypoints.splice(index, 1);
        }
    }
    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }
}