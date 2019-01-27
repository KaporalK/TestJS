let engine;
let player;
let World;
let Gamer;
let Ennemie;
let badGuy;

function preload() {
    loadJSON('Config/config.json', setLocalVar);
}

function setup() {
    // put setup code here
    engine = new Engine( World.frameRate, World.width, World.height, World.gravity);
    //W/Height
    engine.createGame();
    Engine.drawBackGround(51);

    // 0 = a de droite a gauche (la largeur)
    //100 = de haut en bas (la hauteur)

    player = new Player(Gamer.xStart, Gamer.yStart, Gamer.width, Gamer.height,
                        Gamer.veloX, Gamer.veloY, Gamer.poidsPlayer, Gamer.alphaBounce);

    badGuy = new KillableThing(Ennemie.xStart, Ennemie.yStart, Ennemie.width, Ennemie.height,
        Ennemie.veloX, Ennemie.veloY, Ennemie.poidsPlayer, Ennemie.alphaBounce);

    engine.addAnimatedObject(player);
    engine.addAnimatedObject(badGuy);
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
    Ennemie = data.Ennemie;
}

// Todo event declaration system mdrrr

