let World;
let Gamer;
let Ennemie;


let rogueGame;

function preload() {
    loadJSON('Config/config.json', setLocalVar);
}

function setup() {
    // put setup code here
    // engine = new Engine( World.frameRate, World.width, World.height, World.gravity);
    // //W/Height
    // engine.initGame();
    // Engine.drawBackGround(51);
    //
    // // 0 = a de droite a gauche (la largeur)
    // //100 = de haut en bas (la hauteur)
    //
    // player = new Player(Gamer.xStart, Gamer.yStart, Gamer.width, Gamer.height,
    //     Gamer.veloX, Gamer.veloY, Gamer.poidsPlayer, Gamer.alphaBounce);
    //
    // badGuy = new KillableThing(Ennemie.xStart, Ennemie.yStart, Ennemie.width, Ennemie.height,
    //     Ennemie.veloX, Ennemie.veloY, Ennemie.poidsPlayer, Ennemie.alphaBounce);
    //
    // engine.addAnimatedObject(player);
    // engine.addAnimatedObject(badGuy);

    rogueGame = new RogueGame(World)
}

function draw() {

    rogueGame.draw();

}

function setLocalVar(data){
    World = data.World;
    Gamer = data.Player;
    Ennemie = data.Ennemie;
}

// Todo event declaration system mdrrr

