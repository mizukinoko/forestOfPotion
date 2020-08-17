phina.define("", {
    // Spriteクラスを継承
    superClass: 'Sprite',
    // コンストラクタ
    init: function (dungeonLayer, dungeon) {

        //マップデータ
        this.mapArray = dungeon.dungeonArray;

        //参照用ダンジョンtweener.playing
        this.dungeonLayer = dungeonLayer;
    }
});