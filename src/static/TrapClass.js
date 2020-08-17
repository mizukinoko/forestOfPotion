phina.define("TrapClass", {
    // Spriteクラスを継承
    superClass: 'Sprite',
    // コンストラクタ
    init: function (dungeonLayer, dungeon) {

        //マップデータ
        this.mapArray = dungeon.dungeonArray;

        //参照用ダンジョンtweener.playing
        this.dungeonLayer = dungeonLayer;

        this.superInit("地雷");

        //サイズ決め
        this.width = baseSize / 2;
        this.height = baseSize / 2;

        //初期位置決め
        this.initPosition();

        //絶対位置保存
        this.absoluteX = this.x;
        this.absoluteY = this.y;

        //連続でトラップを踏まないようにするためのフラグ
        this.prevFrame = false;
        
        //トラップを隠す
        this.hide();
    },
    initPosition: function () {
        try{
            while (true) {
                var rx = rand(0, colsDungeonBlock - 1);
                var ry = rand(0, rowsDungeonBlock - 1);
                if (this.mapArray[rx][ry] !== 1) {
                    this.x = rx * baseSize;
                    this.y = ry * baseSize;
                    break;
                }
            }
        }catch(e){
            console.log(e);
        }
    },
    checkHitTrap: function(){

        var check1 = this.absoluteX === this.player.absoluteX;
        var check2 = this.absoluteY === this.player.absoluteY;
        var check3 = !this.player.tweener.playing && !this.dungeonLayer.tweener.playing;

        if(check1 && check2 && check3){

            //連続で実行されないように
            if(this.prevFlag){
                return true;
            }

            this.show();
            console.log('トラップに掛かりました！');
            //メッセージ表示
            this.messageWindow.setMessage('トラップに掛かりました！');
            //ダメージ計算
            this.player.attacked(1, 0);
            //音を再生
            //SoundManager.play('getItem');
            return true;
        }else{
            return false;
        }
    },
});