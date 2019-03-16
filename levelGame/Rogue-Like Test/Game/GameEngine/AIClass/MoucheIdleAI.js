class MoucheIdleAI {

    constructor(item) {
        this._item = item;

        this._states = {
            'target': this.item.target,
            'state': ['idle']
        };

        //On défini les eta possible de l'objet avec les fonctions de callback associé
        this._possibleState = {
            'idle': 'findIdleTarget',
            'goingToTarget': 'idleTargetLogic',
            'imHurt': 'modifierDummyFunc', // modifier
        };


        this._idleTarget = 0;
        this._maxIdleTarget = 5;

        this._idleRange = 15;
        this._nextIdlePosRange = 50;

        this._maxTimeGoingToTarget = 1000;
        this._timeGoingToTarget = 0;


        this._directionalStrat = ['moveToTargetLogic'];

        this._possibleDirectionalStrat = {
            'moveToTargetLogic': 'moveToTargetLogic',
        };

        this._moveStrat = ['defaultMove'];

        this._possibleMoveStrat = {
            'defaultMove': 'moveLogic',
            'knockBack': 'forceLogic',
        };


    }

    live(Engine) {

        this.applyAIBeforeMovingToTarget(Engine);
        this.applyMoveStrat(Engine);
        this.addAdditionalState(Engine);

    }

    //-------------------STATE AI---------------------------------
    applyAIBeforeMovingToTarget(Engine) {

        //Default comportement
        // 'idle': 'findIdleTarget', --->   goingToTarget
        // 'goingToTarget': 'playerTargetLogic', ---> idle

        //State modifier
        //
        // 'imHurt': 'modifierDummyFunc', // modifier

        // this.addAdditionalState(Engine);
        let currentStates = this.states.state; //Les states vont surment changer en cours de routes
        for (let i = 0; i < this.states.state.length; i++) {
            this[this.possibleState[currentStates[i]]](Engine);
        }

    }

    addAdditionalState(Engine) {

        if (this.item.hp < this.item.maxHp) {
            this.states.state.push('imHurt');
        }
    }

    //-----------------------MOVEMENT AI---------------------------------
    applyMoveStrat(Engine) {

        // playerTargetLogic.playerDetected ---> ++ moveToTargetLogic
        // playerTargetLogic.playerDetected false ---> -- moveToTargetLogic

        let currentDirectionalStrat = this.directionalStrat;
        for (let i = 0; i < this.directionalStrat.length; i++) {
            this[this.possibleDirectionalStrat[currentDirectionalStrat[i]]](Engine);
        }

        // Default ---->  ++ moveLogic
        // bulletColiding.true ---> ++ knockBack
        // applyForce.force < 0.1 ---> --- knockBack

        let currentMoveStrat = this.moveStrat;
        for (let i = 0; i < this.moveStrat.length; i++) {
            this[this.possibleMoveStrat[currentMoveStrat[i]]](Engine);
        }

    }

    //--------------------------------STATES STRATEGIE ------------------------------

    findIdleTarget(Engine) {
        if (this.item.target instanceof SoSWaypoint) {
            Engine.deleteSosWaypoint(this.item.target);
        }

        let nextIdleX = this.item.x;
        let nextIdleY = this.item.y;


        if (this.idleTarget < this.maxIdleTarget) {
            nextIdleX = random(this.item.x - this.idleRange, this.item.x + this.idleRange);
            nextIdleY = random(this.item.y - this.idleRange, this.item.y + this.idleRange);
        } else if (this.idleTarget === this.maxIdleTarget) {
            nextIdleX = random(this.item.x - this.nextIdlePosRange, this.item.x + this.nextIdlePosRange);
            nextIdleY = random(this.item.y - this.nextIdlePosRange, this.item.y + this.nextIdlePosRange);
            this.idleTarget = 0;
        }

        this.item.target = new SoSWaypoint(nextIdleX, nextIdleY, this.item.width, this.item.height);

        Engine.addSosWaypoint(this.item.target);

        this.states.state = ['goingToTarget'];
        this.timeGoingToTarget = 0;

    }

    idleTargetLogic(Engine) {

        this.timeGoingToTarget++;
        if ((this.timeGoingToTarget >= this.maxTimeGoingToTarget) || (this.item.targetDistance(this.item.target) < this.item.width / 3)) {
            this.states.state = ['idle'];
            Engine.deleteSosWaypoint(this.item.target);
        }

    }

    //--------------DIRECTIONNAL STRATEGIE----------------------------------
    //todo rework la position de la logic final
    moveToTargetLogic(Engine) {
        if (this.item.target.x + (this.item.target.width / 2) < this.item.x + (this.item.width / 2)) {
            this.item.moveLeft = true;
        } else if (this.item.target.x + (this.item.target.width / 2) > this.item.x + (this.item.width / 2)) {
            this.item.moveRight = true;
        }
        if (this.item.target.y + (this.item.target.height / 2) < this.item.y + (this.item.height / 2)) {
            this.item.moveUp = true;
        } else if (this.item.target.y + (this.item.target.height / 2) > this.item.y + (this.item.height / 2)) {
            this.item.moveDown = true;
        }

    }

    //--------------MOVE STRAT--------------------------------------------
    forceLogic(Engine) {
        //TODO ApplyForce, a amélioré
        // Reduire la force en fonction de la puissance un truc du genre
        this.item.nextY += this.item.force.y;
        this.item.nextX += this.item.force.x;
        this.item.force.puissance *= this.item.friction;
        if (this.item.force.puissance <= 0.1) {
            this.item.force.puissance = 0;
            let i = this.moveStrat.indexOf('knockBack');
            this.moveStrat.splice(i);
        }

    }

    moveLogic(Engine) {
        if (this.item.moveUp && this.item.canMoveUp && this.item.y === this.item.nextY) {
            this.item.nextY -= this.item.velocityY;
        }
        if (this.item.moveDown && this.item.canMoveDown && this.item.y === this.item.nextY) {
            this.item.nextY += this.item.velocityY;
        }
        if (this.item.moveLeft && this.item.canMoveLeft && this.item.x === this.item.nextX) {
            this.item.nextX -= this.item.velocityX;
        }
        if (this.item.moveRight && this.item.canMoveRight && this.item.x === this.item.nextX) {
            this.item.nextX += this.item.velocityX;
        }
    }


    get maxTimeGoingToTarget() {
        return this._maxTimeGoingToTarget;
    }

    set maxTimeGoingToTarget(value) {
        this._maxTimeGoingToTarget = value;
    }

    get timeGoingToTarget() {
        return this._timeGoingToTarget;
    }

    set timeGoingToTarget(value) {
        this._timeGoingToTarget = value;
    }

    modifierDummyFunc() {
        return true;
    }

    get idleTarget() {
        return this._idleTarget;
    }

    set idleTarget(value) {
        this._idleTarget = value;
    }

    get maxIdleTarget() {
        return this._maxIdleTarget;
    }

    set maxIdleTarget(value) {
        this._maxIdleTarget = value;
    }

    get idleRange() {
        return this._idleRange;
    }

    set idleRange(value) {
        this._idleRange = value;
    }

    get nextIdlePosRange() {
        return this._nextIdlePosRange;
    }

    set nextIdlePosRange(value) {
        this._nextIdlePosRange = value;
    }

    get directionalStrat() {
        return this._directionalStrat;
    }

    set directionalStrat(value) {
        this._directionalStrat = value;
    }

    get possibleDirectionalStrat() {
        return this._possibleDirectionalStrat;
    }

    set possibleDirectionalStrat(value) {
        this._possibleDirectionalStrat = value;
    }

    get moveStrat() {
        return this._moveStrat;
    }

    set moveStrat(value) {
        this._moveStrat = value;
    }

    get possibleMoveStrat() {
        return this._possibleMoveStrat;
    }

    set possibleMoveStrat(value) {
        this._possibleMoveStrat = value;
    }

    get states() {
        return this._states;
    }

    set states(value) {
        this._states = value;
    }

    get possibleState() {
        return this._possibleState;
    }

    set possibleState(value) {
        this._possibleState = value;
    }

    get item() {
        return this._item;
    }

    set item(value) {
        this._item = value;
    }
}