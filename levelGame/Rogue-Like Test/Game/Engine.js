/**
 * @class Engine
 * @param LevelConfig
 *
 * Cette class représente le niveaux qui tourne actuellement,
 * le but final de cette classe est d'appeler principalement
 * des interface qui initierons le niveaux en train de tourné en fonction des fichier de config.
 *
 * Normalement aucun métier ne devrais atterir ici.
 *
 */
class Engine {

    constructor(Level) {

        let engine = this;
        this._gravity = Level.gravity;
        this._background = Level.background;

        this._brickList = [];
        this._KillableObject = [];
        this._animatedObject = [];
        // 0 = a de droite a gauche (la largeur)
        //100 = de haut en bas (la hauteur)

        this.player = new Player(Level.Player.xStart, Level.Player.yStart,
            Level.Player.width, Level.Player.height,
            Level.Player.veloX, Level.Player.veloY,
            Level.Player.poidsPlayer, Level.Player.alphaBounce);

        //TODO foreach sur les badGuy
        this.badGuy = new KillableThing(Level.Ennemie.xStart, Level.Ennemie.yStart,
            Level.Ennemie.width, Level.Ennemie.height,
            Level.Ennemie.veloX, Level.Ennemie.veloY,
            Level.Ennemie.poidsPlayer, Level.Ennemie.alphaBounce);

        this.addAnimatedObject(this.player);
        this.addAnimatedObject(this.badGuy);

        Level.Layout.Bloc.forEach(function (item, index, array) {
            let bloc = new Brick(item.yStart, item.xStart, item.width, item.height);
            engine.addBrick(bloc);
        })

    }

    live() {
        let Engine = this;
        this._animatedObject.forEach(function (item, index, array) {
            if (item.shoundIBeDeleted) {
                Engine.deleteAnimatedObject(item);
                return;
            }
            // TODO Mettre cette fonction dans l'animatedObject
            //  Je peux pas detect les bullet comme ça
            item.detectColision(Engine.brickList);
            item.live(Engine);
        })
    };

    draw() {
        this.drawBackGround();
        this._brickList.forEach(function (item, index, array) {
            item.draw();
        });
        this._animatedObject.forEach(function (item, index, array) {
            item.draw();
        });
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

    addBrick(brick) {
        this.brickList.push(brick);
    }

    deleteAnimatedObject(object) {
        let index = this.animatedObject.indexOf(object);
        if (index > -1) {
            this.animatedObject.splice(index, 1);
        }
    }

    //
    // static mousePressed(mouseIsPressed) {
    //     if (mouseIsPressed) {
    //         fill(0);
    //     } else {
    //         fill(255);
    //     }
    //     ellipse(mouseX, mouseY, 80, 80);
    // };

    drawBackGround() {
        background(this._background)
    };

    get background() {
        return this._background;
    }

    set background(value) {
        this._background = value;
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

    get gravity() {
        return this._gravity;
    }

    set gravity(value) {
        this._gravity = value;
    }

    get brickList() {
        return this._brickList;
    }

    set brickList(value) {
        this._brickList = value;
    }
}

// module.exports = new Engine();