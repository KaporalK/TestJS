﻿class SosWaypoinColiding extends ColidingInterface {

    constructor(item) {
        super(item);
    }

    support() {
        return ['Brick'];
    }


    colide(itemToColideWith) {
        if (itemToColideWith instanceof Brick) {
            if (this.detectBasicColision(itemToColideWith)) {
                if (this.detectRealColision(this.item.x, this.item.y, itemToColideWith)) {
                    this.findAndApplyMinimumVectorToNotColide(itemToColideWith);
                }
            }
        }
    }

    findAndApplyMinimumVectorToNotColide(itemToColideWith) {
        let edgeDifferences = [
            new Vector((itemToColideWith.x - (this.item.x + this.item.width)), 0),
            new Vector(((itemToColideWith.x + itemToColideWith.width) - this.item.x), 0),
            new Vector(0, (itemToColideWith.y - (this.item.y + this.item.height))),
            new Vector(0, ((itemToColideWith.y + itemToColideWith.height) - this.item.y)),
        ];
        edgeDifferences.sort(function (a, b) {
            return a.getMagnitude() > b.getMagnitude()
        });
        let minimumVector = edgeDifferences[0];

        this.item.x += minimumVector.x;
        this.item.y += minimumVector.y;
    }

}