/**
 * @class WithInventory
 *
 * Class a utiliser si on veut faire un objet qui bouge et qui tire des trucs  :)
 */
class WithInventory extends AnimatedObject{


    constructor(params) {
        super(params);

        this._inventory = new Inventory(this);

    }

    get inventory() {
        return this._inventory;
    }

    set inventory(value) {
        this._inventory = value;
    }
}