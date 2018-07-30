let engine;
let player;
let config;
let World;
let Gameur;

function preload() {
    config = loadJSON('Config/config.json');
    World = config.World;
    Gameur = config.Player;
}

function setup() {
    // put setup code here
    engine = new Engine(World.width, World.height);
    //W/Height
    engine.createGame();
    Engine.changeBackgound(51);

    // 0 = a de droite a gauche (la largeur)
    //100 = de haut en bas (la hauteur)
    player = new Player(Gameur.xStart, Gameur.yStart, Gameur.width, Gameur.height,
                        Gameur.veloX, Gameur.veloY, Gameur.poids, Gameur.alphaBounce);
    engine.addAnimatedObject(player);
}

function draw() {
    //put drawing code here
    engine.live();
    //engine.applyGravity();
    engine.draw();
}

// Todo event declaration system mdrrr

