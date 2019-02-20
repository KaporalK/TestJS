class Waypoint {

    constructor(x, y, width, height, BrickX1, BrickY1, BrickX2, BrickY2, orientation, side) {

        //Faut pas hesiter a placer le waypoint a un endroi un peu wtf
        // L'ennemie va check a chaque frame si y'a toujours le block entre eux a chaque frame anyway
        //Pareille pour les brick X/Y
        //Si il faut tricher pour que les ennemie ne reste pas bloquer faut le faire
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;

        //Les point x/y a utiliser si on veut savoir si
        // le block est entre un ennemie et le player
        // Si c'est le cas on donne ce waypoint a l'ennemie
        this._orientation = orientation;
        this._side = side;
        this._BrickX1 = BrickX1;
        this._BrickY1 = BrickY1;
        this._BrickX2 = BrickX2;
        this._BrickY2 = BrickY2;
    }

    draw() {
        fill('#13c2ff');
        rect(this.x, this.y, this.width, this.height);
        fill('#000000');
        if (this.orientation === 'vertical') {
            rect(this.BrickX1, this.BrickY1, 1, this.distancePointBrick());
        } else if (this.orientation === 'horizontal') {
            rect(this.BrickX1, this.BrickY1,  this.distancePointBrick(),2);
        }
    };

    distancePointBrick() {
        let a = this.BrickX2 - this.BrickX1;
        let b = this.BrickY2 - this.BrickY1;
        return Math.sqrt(a * a + b * b);
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
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

    get BrickX1() {
        return this._BrickX1;
    }

    set BrickX1(value) {
        this._BrickX1 = value;
    }

    get BrickY1() {
        return this._BrickY1;
    }

    set BrickY1(value) {
        this._BrickY1 = value;
    }

    get BrickX2() {
        return this._BrickX2;
    }

    set BrickX2(value) {
        this._BrickX2 = value;
    }

    get BrickY2() {
        return this._BrickY2;
    }

    set BrickY2(value) {
        this._BrickY2 = value;
    }

    get orientation() {
        return this._orientation;
    }

    set orientation(value) {
        this._orientation = value;
    }

    get side() {
        return this._side;
    }

    set side(value) {
        this._side = value;
    }
}