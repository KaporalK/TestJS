let World;
let Gamer;
let Ennemie;
let Animations;

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
    Animations = data.Animations;
    Gamer = data.Player;
    Ennemie = data.Ennemie;
}
