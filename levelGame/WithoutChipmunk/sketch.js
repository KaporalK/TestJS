let engine;
let player;

function setup() {
    // put setup code here
    engine = new Engine(800, 400);
    //W/Height
    engine.createGame();
    Engine.changeBackgound(51);

    //
    // 0 = a de droite a gauche (la largeur)
    //100 = de haut en bas (la hauteur)
    player = new Player(100, 100, 1, 1, 2);
    engine.addAnimatedObject(player);
}

function draw() {
    //put drawing code here
    engine.live();
    //engine.applyGravity();
    engine.draw();
}

// Todo event declaration system mdrrr