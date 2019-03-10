
class EnemieFactory{

    static getKillableThingClass(className){

        if(className === 'Zombie'){
            return Zombie;
        }else if(className === 'MoucheFollow'){
            return MoucheFollow;
        }else if(className === 'MoucheIdle'){
            return MoucheIdle;
        }
    }

}
