class AnnimatedObject {

    constructor(posY,posX, veloX, veloY, alphaBounce){

        this.x = posX;
        this.y = posY;
        this.velocityX = veloX;
        this.velocityY = veloY;

        this._largeur = 10;
        this._hauteur = 10;

        //1 = droite
        this._directionX = 1;
        // 1 un bas;
        this._directionY = 1;
        this._posY = posY;
        this._posX = posX;
        this._veloX = veloX;
        this._veloY = veloY;
        this._alphaBounce = alphaBounce;



    }



    live(gravity, framerate) {
        //Do somthing w/ physic to make the player move
        this.detectBoderColision();

        this.y += this.velocityY * this._directionY;
        this.x += this.velocityX * this._directionX;
    };

    show() {
        fill(255);
        rect(this.x, this.y, this._largeur , this._hauteur);
    };

    detectBoderColision() {
        if (0 > this.x) {
            this._directionX = 1;
        } else if (this.getBorderX() > width) {
            this._directionX = -1;
        }

        if (0 > this.y) {
            this._directionY = 1;
        } else if (this.getBordeurY() > height) {
            this._directionY = -1;
        }
    }

    getBorderX(){
       // console.log( this.posX + this._largeur);
        return this.x + this._largeur;
    }

    getBordeurY(){
        //console.log( this.posY + this._hauteur);
        return this.y + this._hauteur;
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

    get veloX() {
        return this._veloX;
    }

    set veloX(value) {
        this._veloX = value;
    }

    get veloY() {
        return this._veloY;
    }

    set veloY(value) {
        this._veloY = value;
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
