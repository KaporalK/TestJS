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

//TODO implementer ce calcul
// https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
// Pour savoir si un blck est entre moi et un ennemie
class ColidingInterface {

    constructor(item){
        this._item = item;
    }

    support(){
        return [];
    }

    colide(itemToColideWith){
        return this.item;
    }

    detectRealColision(itemX, itemY, itemToColideWith) {
        return (itemX < itemToColideWith.x + itemToColideWith.width &&
            itemX + this.item.width > itemToColideWith.x &&
            itemY < itemToColideWith.y + itemToColideWith.height &&
            itemY + this.item.height > itemToColideWith.y
        )
    }
    detectBasicColision(itemToColideWith) {
        return !(
            (this.item.x - COLISION_DETECTION_OFFSET >= itemToColideWith.x + itemToColideWith.width)      // trop à gauche
            || (this.item.x + this.item.width + COLISION_DETECTION_OFFSET <= itemToColideWith.x) // trop à gaucheighte
            || (this.item.y - COLISION_DETECTION_OFFSET >= itemToColideWith.y + itemToColideWith.height) // trop en bas
            || (this.item.y + this.item.height + COLISION_DETECTION_OFFSET <= itemToColideWith.y)
        );
    }

    get item() {
        return this._item;
    }

    set item(value) {
        this._item = value;
    }
}