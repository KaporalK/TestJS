
class Engine {

    //TODO config.json
    constructor(Widht, height, bouncy) {
        this.space = new cp.Space();
        this.space.iterations = 60;
        this.bouncyTerrain = bouncy;
        this.v = cp.v;
        this.space.gravity = this.v(0, -500);
        this.space.sleepTimeThreshold = 0.5;
        this.space.collisionSlop = 0.5;
        this.space.sleepTimeThreshold = 0.5;

        let offset = cp.v(-320, -240);
        for(let i=0; i<(this.bouncyTerrain.length - 1); i++){
            let a = this.bouncyTerrain[i], b = this.bouncyTerrain[i+1];
            let shape = space.addShape(new cp.SegmentShape(space.staticBody, cp.vadd(a, offset), cp.vadd(b, offset), 0));
            shape.setElasticity(1);
        }
        
    }

    addObject(Object){
        this.space.addBody(Object);
    }

    live(){

    }
}

// module.exports = new Engine();