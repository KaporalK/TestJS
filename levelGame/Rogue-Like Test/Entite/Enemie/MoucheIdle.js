class MoucheIdle extends FlyingEnemie{

    constructor(param){

        param.width = 5;
        param.height = 5;
        param.velocityX = 0.3;
        param.velocityY = 0.3;

        super(param);

        this.color = [0, 0, 0];

        this._hp = 50;
        this._maxHp = this._hp;

        this._detectionPlayerRange = 750;
        this._maxPlayerRange = 750;

        this.colidingClass = new MoucheColiding(this);
        this.ai = new MoucheIdleAI(this);

    }

}