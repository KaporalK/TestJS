
class Engine {

    constructor( framerate, width, height, gravity) {
        this._animatedObject = [];
        this._frameRate = framerate;
        this._widht = width;
        this._height = height;
        this._gravity = gravity;
    }

    createGame() {
        frameRate(this._frameRate);
        createCanvas(this._widht, this._height)
    };

    static changeBackgound(number) {
        background(number)
    };

    live() {
        this._animatedObject.forEach(function (item, index, array) {
            item.live();
            engine.applyGravity(item)
        })
    };

    draw() {
        this._animatedObject.forEach(function (item, index, array) {
            item.draw();
        })
    };

    addAnimatedObject(object) {
        this._animatedObject.push(object);
    };

    // TODO apply grativy wiki toussa toussa
    applyGravity(animatedObject) {
        // console.log(this.getGravityForce());
        //console.log(animatedObject.velocityY);
        if (animatedObject._directionY === 1) {
            //Calcul de la nouvelle vitesse (il accelere)
            animatedObject.velocityY = animatedObject.velocityY + this.getGravityForce();
        } else if (animatedObject._directionY = -1) {
            if (animatedObject.velocityY < 0) {
                //Le mec va vers le haut et a plus de vitesse, on le change de sens pour qu'il retombe
                animatedObject._directionY = 1;
            } else {
                //sinon il ralenti
                animatedObject.velocityY = animatedObject.velocityY - this.getGravityForce();
            }
        }

    };

    static mousePressed(mouseIsPressed) {
        if (mouseIsPressed) {
            fill(0);
        } else {
            fill(255);
        }
        ellipse(mouseX, mouseY, 80, 80);
    };

    /**
     * todo ajouter un parametre pour que cette fonction calcul une force a appliquer en fonction d'un objet
     *  genre avec son poids + un direction ou un truc comme ça je sait pas encore
     *  voir un calcul sur Wiki?
     * @returns {number}
     */
    getGravityForce(){
        return this.gravity / this.frameRate;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

    get animatedObject() {
        return this._animatedObject;
    }

    set animatedObject(value) {
        this._animatedObject = value;
    }

    get frameRate() {
        return this._frameRate;
    }

    set frameRate(value) {
        this._frameRate = value;
    }

    get gravity() {
        return this._gravity;
    }

    set gravity(value) {
        this._gravity = value;
    }
}

// module.exports = new Engine();