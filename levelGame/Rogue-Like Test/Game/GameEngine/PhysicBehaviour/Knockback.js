class Knockback {

    constructor(){
        this._active = true;
    }

    updateEntity(entity){

        //TODO ApplyForce, a amélioré
        // Reduire la force en fonction de la puissance un truc du genre
        entity.nextY += entity.force.y;
        entity.nextX += entity.force.x;
        entity.force.puissance *= entity.friction;
        if (entity.force.puissance <= 0.1) {
            entity.force.puissance = 0;
            this.active = false;
            entity.force.x = 0;
            entity.force.y = 0;
        }
    }

    get active() {
        return this._active;
    }

    set active(value) {
        this._active = value;
    }
}