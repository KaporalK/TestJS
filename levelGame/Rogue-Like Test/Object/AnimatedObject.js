/**
 *
 */
class AnimatedObject {
    /**
     * @param posY
     * @param posX
     * @param largeur
     * @param hauteur
     * @param velocityX
     * @param velocityY
     * @param poids
     * @param alphaBounce
     */
    constructor(posY, posX, largeur, hauteur, velocityX, velocityY, poids, alphaBounce) {

        this._shoundIBeDeleted = false;

        this._posX = posX;
        this._posY = posY;

        //todo utilisé pour le calcul de la gravité quand sa remonte

        this._largeur = largeur;
        this._hauteur = hauteur;

        //1 = droite
        // this._directionX = 1;
        // 1 un bas;
        // this._directionY = 1;
        this._velocityX = velocityX;
        this._velocityY = velocityY;

        this._alphaBounce = alphaBounce;
        this._poids = poids;

    }


    live(Engine) {
        this.posY += this.velocityY; //* this.directionY;
        this.posX += this.velocityX; //* this.directionX;
    };

    draw() {
        fill(255);
        rect(this.posX, this.posY, this.largeur, this.hauteur);
    };

//Detect colision /w the border of the frame

    getBorderX() {
        // console.log( this.posX + this.largeur);
        return this.posX + this.largeur;
    }

    getBorderY() {
        //console.log( this.posY + this._hauteur);
        return this.posY + this.hauteur;
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
