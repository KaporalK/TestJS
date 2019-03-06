class PowerUps extends AnimatedObject{

    constructor(data) {
        super(data);
        this._powerType = PowerupFactory.createGunPowerUps(data.class);
        this.colidingClass = new PowerUpColiding(this)
    }

    draw() {
        super.draw();
    }

    live(Engine){
        super.live(Engine);
    }

    pickUp(player){
        player.inventory.pickUpPowerUp(this.powerType);
        this.shouldIBeDeleted = true;
    }


    get powerType() {
        return this._powerType;
    }

    set powerType(value) {
        this._powerType = value;
    }
}