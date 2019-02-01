/**
 * @class LevelCreator
 *
 * Cette class sert a crée le niveau et a le passer ensuite a l'engine
 * On lui passe la config du lvl pour le créer
 */
class LevelCreator {

    static createLevel(LevelConfig, Engine) {
        ///TODO les bound dans la config

        let LevelObjList = new LevelList('oui');

        let player = new Player(LevelConfig.Player.xStart, LevelConfig.Player.yStart,
            LevelConfig.Player.width, LevelConfig.Player.height,
            LevelConfig.Player.veloX, LevelConfig.Player.veloY,
            LevelConfig.Player.poidsPlayer, LevelConfig.Player.alphaBounce);
        Engine.addAnimatedObject(player);
        LevelObjList.player = player;

        LevelConfig.Ennemies.forEach(function (item, index, array) {
            let badGuy = new KillableThing(item.xStart, item.yStart,
                item.width, item.height,
                item.veloX, item.veloY,
                item.poidsPlayer, item.alphaBounce);
            this.addAnimatedObject(badGuy);
            LevelObjList.addKillableThing(badGuy);
        }, Engine);

        LevelConfig.Layout.Bloc.forEach(function (item, index, array) {
            let bloc = new Brick(item.yStart, item.xStart, item.width, item.height);
            this.addBrick(bloc);
            LevelObjList.addBrick(bloc);
        }, Engine);

        return LevelObjList;
    }
}