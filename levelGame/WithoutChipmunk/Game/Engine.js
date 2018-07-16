class Engine {

    //TODO config.json
    constructor(Widht, height) {
        this.animatedObject = [];
        this.frameRate = 60;
        this.W = Widht;
        this.H = height;
        this.gravity = 9.8;
    }

    createGame(W, H) {
        this.W = W;
        this.H = W;
        frameRate(this.frameRate);
        createCanvas(W, H)
    };

    static changeBackgound(number) {
        background(number)
    };

    live() {
        let gravity = this.getGravity();
        let frameRate = this.getFramerate();
        this.animatedObject.forEach(function (item, index, array) {
            item.live(gravity, frameRate)
        })
    };

    draw() {
        this.animatedObject.forEach(function (item, index, array) {
            item.show();
        })
    };

    addAnimatedObject(object) {
        this.animatedObject.push(object);
    };


    applyGravity(){
        let gravity = this.getGravity();
        let frameRate = this.getFramerate();
      this.animatedObject.forEach(function (item, index, array) {
        if(item.directionY = 1 ){
            //console.log(item.velocityY);
            //console.log(frameRate);
            //console.log(gravity);

            item.velocityY =  item.velocityY *(gravity/frameRate);
        }else if (item.directionY = -1){

        }
      })
    };

    static mousePressed(mouseIsPressed) {
        if (mouseIsPressed) {
            fill(0);
        } else {
            fill(255);
        }
        ellipse(mouseX, mouseY, 80, 80);
    };


    getAnimatedObject() {
        return this.animatedObject;
    };

    getWidth() {
        return this.W;
    };

    getHeight() {
        return this.H;
    };

    getGravity() {
        return this.gravity;
    };

    setGravity(gravity) {
        this.gravity = gravity;
    };

    getFramerate() {
        return this.frameRate;
    };

    setFramerate(framerate) {
        this.frameRate = framerate;
    };
}

// module.exports = new Engine();