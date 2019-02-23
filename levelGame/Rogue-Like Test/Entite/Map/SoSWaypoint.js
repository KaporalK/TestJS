/**
 * @class SoSWaypoint
 *
 * Cette class sert de moyen au killable thing pour pas rester bloquer
 * il va en spawn un quand il se concidère bloquer
 *
 * si il spawn a un endroit chelou essaye de d'augmenter un peu le BRICK/X/Y
 * peut etre que le killable ne suis pas la bonne cible
 */
class SoSWaypoint
{
    constructor(x, y, width, height) {

        //Faut pas hesiter a placer le waypoint a un endroi un peu wtf
        // L'ennemie va check a chaque frame si y'a toujours le block entre eux a chaque frame anyway
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;

        this._colidingClass = new SosWaypoinColiding(this);

    }

    draw() {
        fill('#8bff17');
        rect(this.x, this.y, this.width, this.height);
    };


    get colidingClass() {
        return this._colidingClass;
    }

    set colidingClass(value) {
        this._colidingClass = value;
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
}