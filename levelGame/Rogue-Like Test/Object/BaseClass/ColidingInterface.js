class ColidingInterface {

    constructor(item){
        this._item = item;
    }

    support(){
        return [];
    }

    colide(itemToColideWith){
        return this.item;
    }

    get item() {
        return this._item;
    }

    set item(value) {
        this._item = value;
    }
}