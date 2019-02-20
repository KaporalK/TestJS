class HUD{

    //todo ?? rework cette class
    constructor(elements){

        this._elements = elements;
    }

    draw(Inventory){

        this.elements.forEach(function(item){
            item.draw();
        }, this);

        Inventory.draw();
    }

    addElements(object) {
        this.elements.push(object);
    };

    deleteElements(object) {
        let index = this.elements.indexOf(object);
        if (index > -1) {
            this.elements.splice(index, 1);
        }
    }

    get elements() {
        return this._elements;
    }

    set elements(value) {
        this._elements = value;
    }


}