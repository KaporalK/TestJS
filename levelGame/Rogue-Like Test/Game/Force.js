class Force {

    constructor(ForceX, ForceY, Puissance) {
        this._forceX = ForceX;
        this._forceY = ForceY;
        this._puissance = Puissance;
    }

    appliForce(AnimatedObject){
        let forceX = this.getAppliablePuissanceX();
        let forceY = this.getAppliablePuissanceY();
        AnimatedObject.posX += forceX;
        AnimatedObject.posY += forceY;

        this.Puissance -= AnimatedObject.poids
    }

    getAppliablePuissanceX(ObectX) {
        let distance = this.ForceX - ObectX;
        return this.Puissance / distance;
    }

    getAppliablePuissanceY(ObjectY) {
        let distance = this.ForceY - ObjectY;
        return this.Puissance / distance;
    }

    get ForceX() {
        return this._forceX;
    }

    set ForceX(value) {
        this._forceX = value;
    }

    get ForceY() {
        return this._forceY;
    }

    set ForceY(value) {
        this._forceY = value;
    }

    get Puissance() {
        return this._puissance;
    }

    set Puissance(value) {
        this._puissance = value;
    }

    get AnimatedObject() {
        return this._animatedObject;
    }

    set AnimatedObject(value) {
        this._animatedObject = value;
    }
}