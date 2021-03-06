/**
 * @class ColidingInterface
 *
 * Cette class est destiner a être utilisé dans un annimatedObject
 * qui qui aura des colision a calculer
 *
 * La fonction support doit retourner un tableau contenant le nom des class avec laquel cette class peut interagir
 * la fonction colide est celle utiliser par l'engine pour lancer le calcule de la colision
 *              Elle devra ce faire en 2 parte:
 *                  J'elimine l'itemToColideWith si il n'est pas de la bonne classe
 *                  Si il est de la bonne classe, je le redirige vers la fonction qui fera le calcul
 */

// ameliorer ce calcul
// https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
// https://developer.roblox.com/articles/2D-Collision-Detection
// Pour savoir si un blck est entre moi et un ennemie
class ColidingInterface {

    constructor(item) {
        this._item = item;
    }

    support(item) {
        return false;
    }

    colide(itemToColideWith) {
        return this.item;
    }

    detectRealColision(itemX, itemY, itemToColideWith) {
        let ret = false;
        if (this.item.hasOwnProperty('velocityX')) {
            ret = (itemX + this.item.velocityX < itemToColideWith.x + itemToColideWith.width &&
                itemX + this.item.width + this.item.velocityX > itemToColideWith.x &&
                itemY + this.item.velocityY < itemToColideWith.y + itemToColideWith.height &&
                itemY + this.item.height + this.item.velocityY > itemToColideWith.y
            )
        } else {
            ret = (itemX < itemToColideWith.x + itemToColideWith.width &&
                itemX + this.item.width > itemToColideWith.x &&
                itemY < itemToColideWith.y + itemToColideWith.height &&
                itemY + this.item.height > itemToColideWith.y
            )
        }
        return ret;
    }

    detectBasicColision(itemToColideWith) {
        return !(
            (this.item.x - COLISION_DETECTION_OFFSET >= itemToColideWith.x + itemToColideWith.width)      // trop à gauche
            || (this.item.x + this.item.width + COLISION_DETECTION_OFFSET <= itemToColideWith.x) // trop à gaucheighte
            || (this.item.y - COLISION_DETECTION_OFFSET >= itemToColideWith.y + itemToColideWith.height) // trop en bas
            || (this.item.y + this.item.height + COLISION_DETECTION_OFFSET <= itemToColideWith.y)
        );
    }

    findAndApplyMinimumVectorToNotColide(itemToColideWith) {
        let edgeDifferences = [
            new Vector((itemToColideWith.x - (this.item.nextX + this.item.width)), 0),
            new Vector(((itemToColideWith.x + itemToColideWith.width) - this.item.nextX), 0),
            new Vector(0, (itemToColideWith.y - (this.item.nextY + this.item.height))),
            new Vector(0, ((itemToColideWith.y + itemToColideWith.height) - this.item.nextY)),
        ];
        edgeDifferences.sort(function (a, b) {
            return a.getMagnitude() > b.getMagnitude()
        });
        let minimumVector = edgeDifferences[0];

        if (minimumVector.y < 0) {
            this.item.canMoveDown = false;
        } else if (minimumVector.y > 0) {
            this.item.canMoveUp = false;
        }
        if (minimumVector.x < 0) {
            this.item.canMoveRight = false;
        } else if (minimumVector.x > 0) {
            this.item.canMoveLeft = false;
        }
        this.item.nextX += minimumVector.x;
        this.item.nextY += minimumVector.y;
    }

    findMinimumVectorToNotColide(itemToColideWith) {
        let edgeDifferences = [
            new Vector((itemToColideWith.x - (this.item.nextX + this.item.width)), 0),
            new Vector(((itemToColideWith.x + itemToColideWith.width) - this.item.nextX), 0),
            new Vector(0, (itemToColideWith.y - (this.item.nextY + this.item.height))),
            new Vector(0, ((itemToColideWith.y + itemToColideWith.height) - this.item.nextY)),
        ];
        edgeDifferences.sort(function (a, b) {
            return a.getMagnitude() > b.getMagnitude()
        });
        return edgeDifferences[0];
    }


    findCollidingSide(itemToColideWith, collidingCallbacks){

        let player_bottom = this.item.y + this.item.height;
        let tiles_bottom = itemToColideWith.y + itemToColideWith.height;
        let player_right = this.item.x + this.item.width;
        let tiles_right = itemToColideWith.x + itemToColideWith.width;

        let b_collision = tiles_bottom - this.item.y;
        let t_collision = player_bottom - itemToColideWith.y;
        let l_collision = player_right - itemToColideWith.x;
        let r_collision = tiles_right - this.item.x;

        //Bottom collision
        if (t_collision < b_collision && t_collision < l_collision && t_collision < r_collision) {
            collidingCallbacks.bottom(itemToColideWith);
        }
        //Top collision
        if (b_collision < t_collision && b_collision < l_collision && b_collision < r_collision) {
            collidingCallbacks.top(itemToColideWith);
        }
        //Right collision
        if (l_collision < r_collision && l_collision < t_collision && l_collision < b_collision) {
            collidingCallbacks.right(itemToColideWith);
        }
        //Left collision
        if (r_collision < l_collision && r_collision < t_collision && r_collision < b_collision) {
            collidingCallbacks.left(itemToColideWith);
        }
    }


    get item() {
        return this._item;
    }

    set item(value) {
        this._item = value;
    }
}