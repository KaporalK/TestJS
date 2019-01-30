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

    get item() {
        return this._item;
    }

    set item(value) {
        this._item = value;
    }
}