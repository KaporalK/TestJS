class PowerupFactory{


    static createGunPowerUps(powerName){
        if(powerName === 'ShotGun'){
            return new ShotGun();
        }else if (powerName === 'BouncingBullet'){
            return new BouncingBullet({});
        }
    }

}
