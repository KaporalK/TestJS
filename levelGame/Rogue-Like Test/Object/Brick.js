class Brick {

    constructor(posY, posX, largeur, hauteur,) {

        this._shoundIBeDeleted = false;
        this._posX = posX;
        this._posY = posY;
        this._largeur = largeur;
        this._hauteur = hauteur;
    }

    draw() {
        fill(255, 0, 0);
        rect(this.posX * COLISION_OFFSET, this.posY * COLISION_OFFSET, this.largeur * COLISION_OFFSET, this.hauteur * COLISION_OFFSET);
    }

    get posY() {
        return this._posY;
    }

    set posY(value) {
        this._posY = value;
    }

    get posX() {
        return this._posX;
    }

    set posX(value) {
        this._posX = value;
    }

    get largeur() {
        return this._largeur;
    }

    set largeur(value) {
        this._largeur = value;
    }

    get hauteur() {
        return this._hauteur;
    }

    set hauteur(value) {
        this._hauteur = value;
    }

    get shoundIBeDeleted() {
        return this._shoundIBeDeleted;
    }

    set shoundIBeDeleted(value) {
        this._shoundIBeDeleted = value;
    }
}