class KillableAI
{

    constructor(item){
        this._item = item;
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
    chooseTarget(Engine){
        if (this.item.target !== Engine.levelList.player) {
            //Je vérifie que c'est un waypoint
            if (this.item.target instanceof Waypoint) {
                //Je regarde si le le block est toujours entre nous
                //si il est pas entre nous, le joueur redevien le target
                if (!this.item.isBrickBetweenUs(Engine.levelList.player, this.item.target)) {
                    this.item.target = Engine.levelList.player;
                } else if ((this.item.targetDistance(Engine.levelList.player) > this.item.detectionPlayerRange) && this.item.hp === this.item.maxHp) {
                    this.item.target = Engine.levelList.player;
                    this.item.movingToTarget = false
                }
            } else if (this.item.target === null) { //On pourrait set le player direct quand ont construit le killable ?
                this.item.target = Engine.levelList.player;
            }
            //TODO faire en sorte que l'ennemie puisse sortir de l'agro du SosWayoint si le mec est en face de lui
            if (this.item.target instanceof SoSWaypoint && this.item.targetDistance(this.item.target) < this.item.width / 3) {
                Engine.deleteSosWaypoint(this.item.target);
                this.item.target = Engine.levelList.player;
            }
            //Si le target est le joueur, ou je n'est pas de target
        } else if (this.item.target === Engine.levelList.player) {
            //Je check si il est en range
            this.item.movingToTarget = this.item.movingToTarget ? this.item.targetDistance(Engine.levelList.player) < this.item.maxPlayerRange
                : this.item.targetDistance(Engine.levelList.player) < this.item.detectionPlayerRange;
            if (this.item.movingToTarget || this.item.hp < this.item.maxHp) {
                console.log('toto');
                //je regarde la liste des brick qui peuvent être entre lui et moi c-a-d ceux qui ont des waypoints
                Engine.levelList.brick.forEach(function (item) {
                    if (item.hasOwnProperty('_waypoints') && item.waypoints.length > 0) {
                        let x = item.waypoints.length;
                        for (let i = 0; i < x; i++) {
                            //Si la brick est entre lui est moi son waypoint devient le target
                            let brickbetUs = this.isBrickBetweenUs(Engine.levelList.player, item.waypoints[i]);
                            if (brickbetUs && this.playerDetected) {
                                //Todo faire une liste des target possible pour choisir le plus proche si jamais y'en a plusieurs
                                this.target = item.waypoints[i];
                            } else if (!brickbetUs && !this.playerDetected) {
                                this.playerDetected = true;
                            }
                        }
                    }
                }, this.item);
            }
        }
    }

    unblock(Engine){
        if (this.item.amIBlocked()) {
            if (this.target instanceof SoSWaypoint) {
                alert('A merde, sinon supprime biento')
            } else {
                let distance = new Vector(this.item.x, this.item.y);
                let realSosPos = new Vector(this.item.x, this.item.y);
                let playerVect = new Vector(Engine.levelList.player.x, Engine.levelList.player.y);
                distance.subtractFrom(playerVect);
                distance.divideBy(2);
                realSosPos.subtractFrom(distance);
                this.item.target = new SoSWaypoint(realSosPos.x, realSosPos.y, 15, 15);
                Engine.addSosWaypoint(this.item.target);
            }
        }
    }

    get item() {
        return this._item;
    }

    set item(value) {
        this._item = value;
    }
}