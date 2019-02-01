/**
 * @class LevelList
 *
 * Une class pour stocker les different objet du lvl pour y acceder facilement si un autre objet en a besoin
 */
class LevelList{
    constructor(oui){
        this._player = null;
        this._killableThing = [];
        this._brick = [];
        this._annimatedObject = [];
    }


    get player() {
        return this._player;
    }

    set player(value) {
        this._player = value;
    }

    get killableThing() {
        return this._killableThing;
    }

    set killableThing(value) {
        this._killableThing = value;
    }

    addKillableThing(brick) {
        this.killableThing.push(brick);
    }

    deleteKillableThing(object) {
        let index = this.killableThing.indexOf(object);
        if (index > -1) {
            this.killableThing.splice(index, 1);
        }
    }
    get brick() {
        return this._brick;
    }

    set brick(value) {
        this._brick = value;
    }

    addBrick(brick) {
        this.brick.push(brick);
    }

    deleteBrick(object) {
        let index = this.brick.indexOf(object);
        if (index > -1) {
            this.brick.splice(index, 1);
        }
    }

    get animatedObject() {
        return this._annimatedObject;
    }

    set animatedObject(value) {
        this._annimatedObject = value;
    }

    addAnimatedObject(brick) {
        this.brick.push(brick);
    }

    deleteAnimatedObject(object) {
        let index = this.animatedObject.indexOf(object);
        if (index > -1) {
            this.animatedObject.splice(index, 1);
        }
    }
}