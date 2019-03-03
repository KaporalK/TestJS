class KillableAI {

    constructor(item) {
        this._item = item;

        this._states = {
            'target': this.item.target,
            'state': ['defaultTarget']
        };

        //On défini les eta possible de l'objet avec les fonctions de callback associé
        this._possibleState = {
            'defaultTarget': 'defaultTargetLogic',
            'waypointTarget': 'waypointTargetLogic',
            'nullTarget': 'defaultTargetLogic',
            'sosWaypointNearby': 'sosWaypointNearbyLogic',
            'sosWaypointTarget': 'sosWaypointTargetLogic',
            'playerTarget': 'playerTargetLogic',
            'imBlocked': 'imBlockLogic',
            'imHurt': 'modifierDummyFunc', // modifier
        };

        this._directionalStrat = [];

        this._possibleDirectionalStrat = {
            'moveToTargetLogic': 'moveToTargetLogic',
        };

        this._moveStrat = ['defaultMove'];

        this._possibleMoveStrat = {
            'defaultMove': 'moveLogic',
            'knockBack': 'forceLogic',
        };


    }

    //Utilisation des Waypoints pour choisir sont target
    //Si le target n'est pas le joueur
    ///TODO tester mieu L'IA !!
    //-------------------UNIQUEMENT POUR LA SELECTION DU TARGET POUR LA PROCHAINE FRAME--------------//
    ////
    //TODO utiliser le system de waypoint pour placer des target intermédiaire entre l'ennemie et le vrai target
    //  Pour pouvoir alterner le mouvement de l'enemie
    // Exemple:
    // --------------------------------------------------------------
    // --------------------------------------------------------------
    // --------------------------------------------------------------
    // -----------------------------[TARGET 2]-----------------------
    // --------------------------------------------------------------
    // ----------------------------[WAYPOINT]------------------------
    // --------------------------------------------------------------
    // ---------------------------|          |--[TARGET 1]-----------
    // ---------------------------|          |-----------------------
    // ---------------------------|          |-----------------------
    // ---------------------------|          |-----------------------
    // ----------[TARGET 3]-------|          |-----------------------
    // ---------------------------|          |-----------------------
    // -----[RealTarget]----------|          |-----------[ENNEMIE]---
    // --------------------------------------------------------------
//https://en.wikipedia.org/wiki/Finite-state_machine
///https://gamedev.stackexchange.com/questions/2194/new-to-creating-ai-where-to-start

    //il faut un state handler, qui va prendre le state, faire les actions possible et changer de state si besoin
    //faut que je fasse un ARBRE plus simple des etat de mes enemie,
    //le jeux est simple, faut que les choix de l'ai soit limité


    live(Engine) {

        this.applyAIBeforeMovingToTarget(Engine);
        this.applyMoveStrat(Engine);
        this.addAdditionalState(Engine);

    }

    //-------------------STATE AI---------------------------------
    applyAIBeforeMovingToTarget(Engine) {

        //Default comportement
        //
        // defaultTarget  ----->  playerTarget
        // waypointTarget ----->  playerTarget
        // nullTarget ----->  playerTarget
        // sosWaypointNearby ----->  playerTarget
        // sosWaypointTarget ----->  true
        // playerTarget   ----->  waypointsTarget

        //State modifier
        //
        // imHurt
        // imBlocked

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
        if (this.item.amIBlocked()) {
            this.states.state.push('imBlocked');
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

    //Todo rework les fonction static ?
    defaultTargetLogic(Engine) {
        this.item.target = Engine.levelList.player;
        this.states.state = ['playerTarget'];

    }
    
    playerTargetLogic(Engine) {

        //todo revoir le placement de cette ligne
        this.item.movingToTarget = this.item.movingToTarget ? this.item.targetDistance(Engine.levelList.player) < this.item.maxPlayerRange
            : this.item.targetDistance(Engine.levelList.player) < this.item.detectionPlayerRange;

        if (this.item.movingToTarget || this.states.state.includes('imHurt')) {

            if (!this.directionalStrat.includes('moveToTargetLogic')) {
                this.directionalStrat.push('moveToTargetLogic');
            }

            //je regarde la liste des brick qui peuvent être entre lui et moi c-a-d ceux qui ont des waypoints
            Engine.levelList.brick.forEach(function (item) {
                if (item.hasOwnProperty('_waypoints') && item.waypoints.length > 0) {
                    let x = item.waypoints.length;
                    for (let i = 0; i < x; i++) {
                        //Si la brick est entre lui est moi son waypoint devient le target
                        let brickbetUs = this.item.isBrickBetweenUs(Engine.levelList.player, item.waypoints[i]);
                        if (brickbetUs) {
                            //Todo faire une liste des target possible pour choisir le plus proche si jamais y'en a plusieurs
                            this.item.target = item.waypoints[i];
                            this.states.state = ['waypointTarget'];
                        }
                    }
                }
            }, this);
        } else if (this.directionalStrat.includes('moveToTargetLogic')) {
            let i = this.directionalStrat.indexOf('moveToTargetLogic');
            this.directionalStrat.splice(i);
        }
    }
    
    waypointTargetLogic(Engine) {

        //Je regarde si le le block est toujours entre nous
        //si il est pas entre nous, le joueur redevien le target
        if (!this.item.isBrickBetweenUs(Engine.levelList.player, this.item.target)) {
            this.item.target = Engine.levelList.player;
            this.states.state = ['playerTarget'];
        } else if ((this.item.targetDistance(Engine.levelList.player) > this.item.detectionPlayerRange) && this.item.hp === this.item.maxHp) {
            this.item.target = Engine.levelList.player;
            this.item.movingToTarget = false;
            this.states.state = ['playerTarget'];
        }
    }

    sosWaypointTargetLogic(Engine) {

        if (this.item.targetDistance(this.item.target) < this.item.width / 3) {
            this.states.state = ['sosWaypointNearby']
        }

    }

    sosWaypointNearbyLogic(Engine) {
        Engine.deleteSosWaypoint(this.item.target);
        this.item.target = Engine.levelList.player;
        this.states.state = ['playerTarget'];
    }

    imBlockLogic(Engine) {
        let distance = new Vector(this.item.x, this.item.y);
        let realSosPos = new Vector(this.item.x, this.item.y);
        let playerVect = new Vector(Engine.levelList.player.x, Engine.levelList.player.y);
        distance.subtractFrom(playerVect);
        distance.divideBy(2);
        realSosPos.subtractFrom(distance);
        if (this.item.target instanceof SoSWaypoint) {
            Engine.deleteSosWaypoint(this.item.target);
        }
        this.item.target = new SoSWaypoint(realSosPos.x, realSosPos.y, 15, 15);
        this.states.state = ['sosWaypointTarget'];
        Engine.addSosWaypoint(this.item.target);

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


    modifierDummyFunc(){
        return true;
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