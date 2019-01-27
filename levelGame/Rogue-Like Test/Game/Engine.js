const UP = 38;
const DOWN = 40;
const LEFT = 37;
const RIGHT = 39;
const SPACE = 32;
//down 40
//up 38
//Right 39
//left 37
class Engine {

    constructor(framerate, width, height, gravity) {
        this._animatedObject = [];
        this._KillableObject = [];
        this._frameRate = framerate;
        this._widht = width;
        this._height = height;
        this._gravity = gravity;
    }

    createGame() {
        frameRate(this._frameRate);
        createCanvas(this._widht, this._height)
    };

    static drawBackGround(number) {
        background(number)
    };

    live() {
        let Engine = this;
        this._animatedObject.forEach(function (item, index, array) {
            if (item.shoundIBeDeleted) {
                console.log('Add Function To Delete Item In Engine  Plz');
                // Engine.deleteAnimatedObject(item);
                return;
            }
            item.live(Engine);
        })
    };

    draw() {
        background(51);
        this._animatedObject.forEach(function (item, index, array) {
            item.draw();
        })
    };

    getKillableThing() {
        return this.KillableObject;
    }

    addAnimatedObject(object) {
        if (object instanceof KillableThing) {
            this.KillableObject.push(object);
        }
        this.animatedObject.push(object);
    };

    deleteAnimatedObject(object) {
        delete this.animatedObject[object];
    }

    static mousePressed(mouseIsPressed) {
        if (mouseIsPressed) {
            fill(0);
        } else {
            fill(255);
        }
        ellipse(mouseX, mouseY, 80, 80);
    };

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

    get KillableObject() {
        return this._KillableObject;
    }

    set KillableObject(value) {
        this._KillableObject = value;
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