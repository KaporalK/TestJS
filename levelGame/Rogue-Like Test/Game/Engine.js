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
        this._sosWaypoint = [];

        this._hud = null;

        this._tree = new QuadTree(Level.Bounds, false);

        this._levelList = LevelCreator.createLevel(Level, this);
        this._debug = debug;

    }

    live() {
        this._animatedObject.forEach(function (item) {
            if (item.shoundIBeDeleted) {
                this.deleteAnimatedObject(item);
                return;
            }
            let node = this.tree.retrieve(item);
            node.forEach(function (nodeItem) {
                if (nodeItem !== this && this.colidingClass.support().includes(nodeItem.constructor.name)) {
                    this.colidingClass.colide(nodeItem);
                }
            }, item);

            item.live(this);
            if(item instanceof WithInventory){
                item.inventory.live(this);
            }
        }, this);
        this._sosWaypoint.forEach(function (item) {
            let node = this.tree.retrieve(item);
            node.forEach(function (nodeItem) {
                if (nodeItem !== this && this.colidingClass.support().includes(nodeItem.constructor.name)) {
                    this.colidingClass.colide(nodeItem);
                }
            }, item);
        }, this);+
        this.updateTree();
    };

    draw() {
        this.drawBackGround();
        // console.log('---------------------------------------------------------------------------------------------------------------');
        this._brickList.forEach(function (item, index, array) {
            item.draw();
        });
        this._animatedObject.forEach(function (item, index, array) {
            item.draw();
        });
        if (this.debug) {
            QuadTreeHelper.drawNode(this.tree.root);
            this.levelList.waypoints.forEach(function(item){
                item.draw();
                if(item instanceof SoSWaypoint){
                    alert('ENGINE LIGNE 70 WTF');
                }
            });
            this.sosWaypoint.forEach(function(item){
                item.draw();
            })
        }
        this.hud.draw(this.levelList.player.inventory);
    };

    createHUD(congifHUD){
        this.hud = new HUD([]);
        congifHUD.text.forEach(function(item){
            this.hud.addElements(new TextContainer(item))
        }, this);
    }

    updateTree() {
        this.tree.clear();
        this.tree.insert(this.brickList);
        this.animatedObject.forEach(function (item) {
            if (item instanceof WithInventory && item.inventory.currentGun.bullets.length !== 0) {
                this.tree.insert(item.inventory.currentGun.bullets);
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

    get sosWaypoint() {
        return this._sosWaypoint;
    }

    set sosWaypoint(value) {
        this._sosWaypoint = value;
    }

    addSosWaypoint(brick) {
        this.sosWaypoint.push(brick);
        this.tree.insert(brick);
    }

    deleteSosWaypoint(object) {
        let index = this.sosWaypoint.indexOf(object);
        if (index > -1) {
            this.sosWaypoint.splice(index, 1);
        }
    }

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

    get hud() {
        return this._hud;
    }

    set hud(value) {
        this._hud = value;
    }
}

// module.exports = new Engine();