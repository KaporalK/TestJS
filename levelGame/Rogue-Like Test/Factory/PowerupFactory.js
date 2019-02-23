class PowerupFactory{


    static createGunPowerUps(gunName){
        if(gunName === 'ShotGun'){
            return new ShotGun();
        }
    }

}
