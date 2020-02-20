class Knockback {

    constructor(forceX, forceY, puissance){
        this._forceY = forceY;
        this._puissance = puissance;
        this._active = true;
        this._forceX = forceX
    }

    updateEntity(entity){

        //TODO ApplyForce, a amélioré
        // un truc fix pour tous, pas besoin de la puissan,ce pour l'instant, et on peut plus bouger pendan tle knokback mais ile st mois fort
        entity.nextY += this.forceY;
        entity.nextX += this.forceX;
        this.puissance *= entity.friction;
        if (this.puissance <= 0.1) {
            this.puissance= 0;
            this.active = false;
            this.forceX = 0;
            this.forceY  = 0;
            return true;
        }
    }

    get active() {
        return this._active;
    }

    set active(value) {
        this._active = value;
    }
    get forceX() {
        return this._forceX;
    }

    set forceX(value) {
        this._forceX = value;
    }
    get puissance() {
        return this._puissance;
    }

    set puissance(value) {
        this._puissance = value;
    }
    get forceY() {
        return this._forceY;
    }

    set forceY(value) {
        this._forceY = value;
    }

}