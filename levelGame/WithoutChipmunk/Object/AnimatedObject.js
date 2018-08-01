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
    constructor(posY,posX, largeur, hauteur,velocityX, velocityY, poids ,alphaBounce){

        this._posX = posX;
        this._posY = posY;

        //todo utilisé pour le calcul de la gravité quand sa remonte

        this._largeur = largeur;
        this._hauteur = hauteur;

        //1 = droite
        this._directionX = 1;
        // 1 un bas;
        this._directionY = 1;
        this._alphaBounce = alphaBounce;
        this._velocityX = velocityX;
        this._velocityY = velocityY;
        this._poids = poids;

    }


    live() {
        //Do somthing w/ physic to make the player move
        this.detectBoderColision();

        this.posY += this.velocityY * this.directionY;
        this.posX += this.velocityX * this.directionX;
    };

    draw() {
        fill(255);
        rect(this.posX, this.posY, this.largeur , this.hauteur);
    };

    detectBoderColision() {
        if (0 > this.posX) {
            this.directionX = 1;
        } else if (this.getBorderX() > width) {
            this.directionX = -1;
        }

        if (0 > this.posY) {
            this.directionY = 1;
        } else if (this.getBordeurY() > height) {
            this.directionY = -1;
        }
    }

    getBorderX(){
       // console.log( this.posX + this.largeur);
        return this.posX + this.largeur;
    }

    getBordeurY(){
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
}
