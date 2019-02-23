class Sprite {

    //TODO animation extractor
    /**
     *
     *
     */



    constructor(animation, speed) {
        //todo
        this._x = 0;
        this._y = 0;
        this._animation = animation;
        this._speed = speed;
        this._len = animation.length;
        this._index = 0;
    }

    live() {
        this.animate();
    }

    draw() {
        let index = floor(this.index) % this.len;
        image(this.animation[index], this.x, this.y)
    }

    animate() {
        this.index += this.speed;
    }


    static createAnimation(spritesheet, spritedata) {

        let frames = spritedata.frames;
        for (let i = 0; frames.length; i++) {
            let pos = frames[i].position;
            let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
            animation.push(img)
        }
    }

    static createSpitesSheet(xStart, yStart,width, heigth, imgNumber ,totalwidth, totalHeigth, ){
        let spriteSheet = {frames: []};
        let currentX = xStart;
        let currentY = yStart;
        for(let i = 0; i < imgNumber; i++){
            spriteSheet.frames[i].position = {x: currentX, y:currentY, w: width, h:heigth};
            currentX += width;
            if(currentX > totalwidth){
                currentX = 0;
                currentY += heigth;
                if(currentY > totalHeigth){
                    console.log('spriteSheet Wtf en train d\'etre crée')
                }
            }
        }
    }

    get animation() {
        return this._animation;
    }

    set animation(value) {
        this._animation = value;
    }

    get speed() {
        return this._speed;
    }

    set speed(value) {
        this._speed = value;
    }

    get index() {
        return this._index;
    }

    set index(value) {
        this._index = value;
    }

    get len() {
        return this._len;
    }

    set len(value) {
        this._len = value;
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
}