/**
 * @class LevelCreator
 *
 * Cette class sert a crée le niveau et a le passer ensuite a l'engine
 * On lui passe la config du lvl pour le créer
 */
class LevelCreator {

    static createLevel(LevelConfig, Engine) {
        //UTILISER L'OFFSET!!!! pour le hud,
        //Pourquoi pas mettre un offset dans les config pour faire differents lvls
        let offsetX = LevelConfig.Bounds.x;
        let offsetY = LevelConfig.Bounds.y;

        let LevelObjList = new LevelList();
        //todo rework ca MDR
        Engine.hud = new HUD([new TextContainer('Resources/font/test_ttf.TTF', 'Weapons', 870, 150, 15, {horizontal: CENTER}, '#000000')]);

        //Construction du layout
        LevelObjList.offset = LevelCreator.createBounds(LevelConfig.Bounds);

        //Construction du joueur
        let player = new Player(LevelCreator.addOffsetToXYParams(LevelConfig.Player, offsetX, offsetY));
        Engine.addAnimatedObject(player);
        LevelObjList.player = player;

        //Construction des Ennemie
        LevelConfig.Ennemies.forEach(function (item) {
            let badGuy = new KillableThing(LevelCreator.addOffsetToXYParams(item, offsetX, offsetY));
            this.addAnimatedObject(badGuy);
            LevelObjList.addKillableThing(badGuy);
        }, Engine);


        //---------------------------------
        //Construction des Brick / Mur
        LevelConfig.Layout.Bloc.forEach(function (item) {
            let bloc = new Brick(LevelCreator.addOffsetToXYParams(item, offsetX, offsetY));
            if (item.hasOwnProperty('waypoint')) {
                let waypoint = new Waypoint(LevelCreator.addOffsetToBrickXYParams(item.waypoint, offsetX, offsetY));
                bloc.addWaypoint(waypoint);
                LevelObjList.addWaypoint(waypoint);
            }
            LevelObjList.addBrick(bloc);
            this.addBrick(bloc);
        }, Engine);

        //TODO refact ca dans les configs

        return LevelObjList;
    }

    static createBounds(Bounds) {

        return {
            x: Bounds.x,
            y: Bounds.y,
            height: Bounds.height + Bounds.y,
            width: Bounds.width + Bounds.x
        }
    }

    static addOffsetToXYParams(Object, offsetX, offsetY) {
        Object.x += offsetX;
        Object.y += offsetY;
        return Object;
    }

    static addOffsetToBrickXYParams(Object, offsetX, offsetY) {
        Object.x += offsetX;
        Object.y += offsetY;
        Object.BrickX1 += offsetX;
        Object.BrickY1 += offsetY;
        Object.BrickX2 += offsetX;
        Object.BrickY2 += offsetY;

        return Object;
    }

    static createAnnimatedObject() {

    }
}