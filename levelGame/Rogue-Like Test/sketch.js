let World;
let Gamer;
let Ennemie;
let Animations;
let configHUD;

let rogueGame;

function preload() {
    loadJSON('Config/config.json', setLocalVar);
}

function setup() {
    rogueGame = new RogueGame(World);
}

function draw() {

    rogueGame.draw();

}

function setLocalVar(data){
    World = data.World;
    configHUD = data.HUD;
    Animations = data.Animations;
    Gamer = data.Player;
    Ennemie = data.Ennemie;
}
