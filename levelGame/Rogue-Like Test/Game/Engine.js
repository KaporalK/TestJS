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

    constructor(Level, debug = false) {
        this._gravity = Level.gravity;
        this._background = Level.background;

        this._brickList = [];
        this._animatedObject = [];

        this._tree = new QuadTree(Level.Bounds, false);

        this._levelList = LevelCreator.createLevel(Level, this);
        this._debug = debug;

    }

    live() {
        this._animatedObject.forEach(function (item, index, array) {
            let node = this.tree.retrieve(item);
            if (item.shoundIBeDeleted) {
                this.deleteAnimatedObject(item);
                return;
            }
            node.forEach(function (nodeItem, index, array) {
                if (nodeItem !== this && this.colidingClass.support().includes(nodeItem.constructor.name)) {
                    this.colidingClass.colide(nodeItem);
                }
            }, item);

            item.live(this);
        }, this);
        this.updateTree();
    };

    draw() {
        this.drawBackGround();
        if (this.debug) {
            QuadTreeHelper.drawNode(this.tree.root);
        }
        // console.log('---------------------------------------------------------------------------------------------------------------');
        this._brickList.forEach(function (item, index, array) {
            item.draw();
        });
        this._animatedObject.forEach(function (item, index, array) {
            item.draw();
        });
    };

    //Todo rework ca avec des interface
    updateTree() {
        this.tree.clear();
        this.tree.insert(this.brickList);
        this.animatedObject.forEach(function (item, index, array) {
            if (item instanceof WithBullets && item.bullets.length !== 0) {
                this.tree.insert(item.bullets);
            }
        }, this);
        this.tree.insert(this.animatedObject);
    }

    addAnimatedObject(object) {
        this.animatedObject.push(object);
        this.tree.insert(object);
    };

    addBrick(brick) {
        this.brickList.push(brick);
        this.tree.insert(brick);
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


    get debug() {
        return this._debug;
    }

    set debug(value) {
        this._debug = value;
    }

    drawBackGround() {
        background(this._background)
    };

    get tree() {
        return this._tree;
    }

    set tree(value) {
        this._tree = value;
    }

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

    get levelList() {
        return this._levelList;
    }

    set levelList(value) {
        this._levelList = value;
    }
}

// module.exports = new Engine();