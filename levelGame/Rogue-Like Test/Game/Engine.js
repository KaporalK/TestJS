/**
 * @class Engine
 * @param LevelConfig
 *
 * Cette class représente le niveaux qui tourne actuellement,
 * le but final de cette classe est d'appeler principalement
 * des interface qui initierons le niveaux en train de tourné en fonction des fichier de config.
 *
 * Normalement aucun métier ne devrais atterir ici.
 *
 */
class Engine {

    constructor(Level) {

        let engine = this;
        this._gravity = Level.gravity;
        this._background = Level.background;

        this._brickList = [];
        this._KillableObject = [];
        this._animatedObject = [];
        // 0 = a de droite a gauche (la largeur)
        //100 = de haut en bas (la hauteur)

        this.player = new Player(Level.Player.xStart, Level.Player.yStart,
            Level.Player.width, Level.Player.height,
            Level.Player.veloX, Level.Player.veloY,
            Level.Player.poidsPlayer, Level.Player.alphaBounce);

        //TODO foreach sur les badGuy
        this.badGuy = new KillableThing(Level.Ennemie.xStart, Level.Ennemie.yStart,
            Level.Ennemie.width, Level.Ennemie.height,
            Level.Ennemie.veloX, Level.Ennemie.veloY,
            Level.Ennemie.poidsPlayer, Level.Ennemie.alphaBounce);

        this.addAnimatedObject(this.player);
        this.addAnimatedObject(this.badGuy);

        Level.Layout.Bloc.forEach(function (item, index, array) {
            let bloc = new Brick(item.yStart, item.xStart, item.width, item.height);
            engine.addBrick(bloc);
        })

    }

    live() {
        let Engine = this;
        this._animatedObject.forEach(function (item, index, array) {
            if (item.shoundIBeDeleted) {
                Engine.deleteAnimatedObject(item);
                return;
            }
            // TODO Mettre cette fonction dans l'animatedObject
            //  Je peux pas detect les bullet comme ça
            Engine.detectColision(item);
            item.live(Engine);
        })
    };

    draw() {
        this.drawBackGround();
        this._brickList.forEach(function (item, index, array) {
            item.draw();
        });
        this._animatedObject.forEach(function (item, index, array) {
            item.draw();
        });
    };

    getKillableThing() {
        return this.KillableObject;
    }

    addAnimatedObject(object) {
        if (object instanceof KillableThing) {
            this.KillableObject.push(object);
        }
        this.animatedObject.push(object);
    };

    addBrick(brick) {
        this.brickList.push(brick);
    }

    deleteAnimatedObject(object) {
        let index = this.animatedObject.indexOf(object);
        if (index > -1) {
            this.animatedObject.splice(index, 1);
        }
    }

    //
    // static mousePressed(mouseIsPressed) {
    //     if (mouseIsPressed) {
    //         fill(0);
    //     } else {
    //         fill(255);
    //     }
    //     ellipse(mouseX, mouseY, 80, 80);
    // };
    //TODO séparé le terrain en carré pour trié plus vite les element a detecter la colision
    // meilleur offset actuellement je multipli les dessin par deux pour avoir eventuellement moins de pixel a calculer lors des colision
    // mais ca reste bancale

    detectColision(animatedObject) {
        this.brickList.forEach(function (item, index, array) {
            if (Engine.detectBasicColision(animatedObject, item)) {
                //TODO implémenter une interface de colision pour que cette fonction soit jolie et que je puisse traiter
                // tous les object de la même facon pour les colision dans l'engine
                // Actuelement je gere que le player mdr.
                let newY = animatedObject.posY;
                let newX = animatedObject.posX;
                let nextMoveX = null;
                let nextMoveY = null;
                if (animatedObject.moveUp && animatedObject.canMoveUp) {
                    newY = animatedObject.posY - animatedObject.moveSpeed;
                }
                if (animatedObject.moveDown && animatedObject.canMoveDown) {
                    newY = animatedObject.posY + animatedObject.moveSpeed;
                }
                if (animatedObject.moveLeft && animatedObject.canMoveLeft) {
                    newX = animatedObject.posX - animatedObject.moveSpeed;
                }
                if (animatedObject.moveRight && animatedObject.canMoveRight) {
                    newX = animatedObject.posX + animatedObject.moveSpeed;
                }
                //TODO implementer l'algorithme de detection de colision ici
                if(Engine.detectRealColision(animatedObject, newX, newY, item)){
                    if (animatedObject.moveUp) {
                        animatedObject.canMoveUp = false;
                    }
                    if (animatedObject.moveDown) {
                        animatedObject.canMoveDown = false;
                    }
                    if (animatedObject.moveLeft) {
                        animatedObject.canMoveLeft = false;
                    }
                    if (animatedObject.moveRight) {
                        animatedObject.canMoveRight = false;
                    }
                }
            }
        })
    }

    static detectBasicColision(item, brick) {
        return !(
            (brick.posX - COLISION_DETECTION_OFFSET >= item.posX + item.largeur)      // trop à gauche
            || (brick.posX + brick.largeur + COLISION_DETECTION_OFFSET <= item.posX) // trop à gauchauteure
            || (brick.posY - COLISION_DETECTION_OFFSET >= item.posY + item.hauteur) // trop en bas
            || (brick.posY + brick.hauteur + COLISION_DETECTION_OFFSET <= item.posY)
        );
    }
    //todo implémeter lee calcul des colision de ici https://openclassrooms.com/fr/courses/1374826-theorie-des-collisions/1374988-formes-simples
    // enfin celui pour un point sur un cube, pour connaire quel coté touche
    static detectRealColision(item, itemX, itemY, brick) {
        return (itemX < brick.posX + brick.largeur &&
            itemX + item.largeur > brick.posX &&
            itemY  < brick.posY + brick.hauteur &&
            itemY  + item.hauteur > brick.posY
        )
    }

    drawBackGround() {
        background(this._background)
    };

    get background() {
        return this._background;
    }

    set background(value) {
        this._background = value;
    }

    get animatedObject() {
        return this._animatedObject;
    }

    set animatedObject(value) {
        this._animatedObject = value;
    }

    get KillableObject() {
        return this._KillableObject;
    }

    set KillableObject(value) {
        this._KillableObject = value;
    }

    get gravity() {
        return this._gravity;
    }

    set gravity(value) {
        this._gravity = value;
    }

    get brickList() {
        return this._brickList;
    }

    set brickList(value) {
        this._brickList = value;
    }
}

// module.exports = new Engine();