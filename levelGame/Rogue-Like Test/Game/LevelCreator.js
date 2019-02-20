/**
 * @class LevelCreator
 *
 * Cette class sert a crée le niveau et a le passer ensuite a l'engine
 * On lui passe la config du lvl pour le créer
 */
class LevelCreator {

    static createLevel(LevelConfig, Engine) {
        ///TODO les bound dans la config
        //TODO Rework les class Ici pour prendre des objet anonyme en constructeur

        //UTILISER L'OFFSET!!!! pour le hud,
        //Pourquoi pas mettre un offset dans les config pour faire differents lvls
        //TODO fonction addOffsetToXYParams
        let offsetX = LevelConfig.Bounds.x;
        let offsetY = LevelConfig.Bounds.y;

        let LevelObjList = new LevelList();
        //todo rework ca MDR
        Engine.hud = new HUD([new TextContainer('Resources/font/test_ttf.TTF', 'Weapons', 870, 150, 15, {horizontal: CENTER }, '#000000')]);

        //Construction du layout
        LevelObjList.offset = {x: offsetX, y: offsetY, height: LevelConfig.Bounds.height, width: LevelConfig.Bounds.width };

        //Construction du joueur
        let player = new Player(LevelConfig.Player.yStart + offsetY, LevelConfig.Player.xStart + offsetX,
            LevelConfig.Player.width, LevelConfig.Player.height,
            LevelConfig.Player.veloX, LevelConfig.Player.veloY,
            LevelConfig.Player.poidsPlayer, LevelConfig.Player.alphaBounce);
        Engine.addAnimatedObject(player);
        LevelObjList.player = player;

        //Construction des Ennemie
        LevelConfig.Ennemies.forEach(function (item) {
            let badGuy = new KillableThing(item.xStart + offsetX, item.yStart + offsetY,
                item.width, item.height,
                item.veloX, item.veloY,
                item.poidsPlayer, item.alphaBounce);
            this.addAnimatedObject(badGuy);
            LevelObjList.addKillableThing(badGuy);
        }, Engine);


        //Construction des Brick / Mur
        LevelConfig.Layout.Bloc.forEach(function (item) {
            let bloc = new Brick(item.yStart + offsetY, item.xStart + offsetX, item.width, item.height);
            if (item.hasOwnProperty('waypoint')) {
                let waypoint = new Waypoint(item.waypoint.xStart + offsetX, item.waypoint.yStart + offsetY,
                    item.waypoint.width, item.waypoint.height,
                    item.waypoint.BrickX1 + offsetX, item.waypoint.BrickY1 + offsetY,
                    item.waypoint.BrickX2 + offsetX, item.waypoint.BrickY2 + offsetY,
                    item.waypoint.orientation, item.waypoint.side);
                bloc.addWaypoint(waypoint);
                LevelObjList.addWaypoint(waypoint);
            }
            LevelObjList.addBrick(bloc);
            this.addBrick(bloc);
        }, Engine);

        //TODO refact ca dans les configs

        return LevelObjList;
    }
}