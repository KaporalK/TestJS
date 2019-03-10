class Zombie extends GroundEnemie{

    constructor(param){

        param.width = 15;
        param.height = 15;
        param.velocityX = 0.6;
        param.velocityY = 0.6;

        super(param)
    }

}