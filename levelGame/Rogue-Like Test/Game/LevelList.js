/**
 * @class LevelList
 *
 * Une class pour stocker les different objet du lvl pour y acceder facilement si un autre objet en a besoin
 */
class LevelList {
    constructor() {
        this._player = null;
        this._killableThing = [];
        this._brick = [];
        this._annimatedObject = [];
        this._waypoints = [];
        this._pickUps = [];

        this._offset = {x: 0, y: 0, height:0, width: 0}

    }


    get offset() {
        return this._offset;
    }

    set offset(value) {
        this._offset = value;
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

    addAnimatedObject(value) {
        this.animatedObject.push(value);
    }

    deleteAnimatedObject(object) {
        let index = this.animatedObject.indexOf(object);
        if (index > -1) {
            this.animatedObject.splice(index, 1);
        }
    }


    get waypoints() {
        return this._waypoints;
    }

    set waypoints(value) {
        this._waypoints = value;
    }

    addWaypoint(waypoint) {
        this.waypoints.push(waypoint);
    }

    deleteWaypoint(object) {
        let index = this.waypoints.indexOf(object);
        if (index > -1) {
            this.waypoints.splice(index, 1);
        }
    }

    get pickUps() {
        return this._pickUps;
    }

    set pickUps(value) {
        this._pickUps = value;
    }


    addPickUps(waypoint) {
        this.pickUps.push(waypoint);
    }

    deletePickUps(object) {
        let index = this.pickUps.indexOf(object);
        if (index > -1) {
            this.pickUps.splice(index, 1);
        }
    }

}