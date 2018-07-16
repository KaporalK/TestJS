class AnnimatedObject {

    constructor(posY,posX, veloX, veloY, alphaBounce){

        this.x = posX;
        this.y = posY;
        this.velocityX = veloX;
        this.velocityY = veloY;

        //1 = droite
        this.directionX = 1;
        // 1 un bas;
        this.directionY = 1;
        this.alphaBounce = alphaBounce;

    }



    live(gravity, framerate) {
        //Do somthing w/ physic to make the player move
        this.detectBoderColision();

        this.y += this.velocityY * this.directionY;
        this.x += this.velocityX * this.directionX;
    };

    show() {
        fill(255);
        rect(this.x, this.y, 10, 10);
    };

    detectBoderColision() {

        if (0 > this.x) {
            this.directionX = 1;
        } else if (this.x > width) {
            this.directionX = -1;
        }

        if (0 > this.y) {
            this.directionY = 1;
        } else if (this.y > height) {
            this.directionY = -1;
        }
    }
}
