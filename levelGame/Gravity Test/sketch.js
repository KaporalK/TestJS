let engine;
let player;
let World;
let Gamer;

function preload() {
    loadJSON('Config/config.json', setLocalVar);
}

function setup() {
    // put setup code here
    engine = new Engine( World.frameRate, World.width, World.height, World.gravity);
    //W/Height
    engine.createGame();
    Engine.changeBackgound(51);

    // 0 = a de droite a gauche (la largeur)
    //100 = de haut en bas (la hauteur)

    player = new Player(Gamer.xStart, Gamer.yStart, Gamer.width, Gamer.height,
                        Gamer.veloX, Gamer.veloY, Gamer.poidsPlayer, Gamer.alphaBounce);
    engine.addAnimatedObject(player);
}

function draw() {
    //put drawing code here
    engine.live();
    //engine.applyGravity();
    engine.draw();
}

function setLocalVar(data){
    World = data.World;
    Gamer = data.Player;
}

// Todo event declaration system mdrrr

