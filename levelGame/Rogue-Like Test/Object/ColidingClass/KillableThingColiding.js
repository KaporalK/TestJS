class KillableThingColiding extends ColidingInterface {

    constructor(item) {
        super(item);
    }

    support() {
        return [];
    }

    colide(itemToColideWith) {
        return true;
    }

}