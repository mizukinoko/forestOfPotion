phina.define("Usagi", {
    // Spriteクラスを継承
    superClass: 'Mob',
    // コンストラクタ
    init: function (mapArray, dungeonLayer, player, messageWindow) {

        // 親クラス初期化
        this.superInit("うさぎ", mapArray, dungeonLayer, player, messageWindow);

        //ステータス
        this.status = {
            'name': "うさぎ",
            'hp': 10,
            'mp': 50,
            'atk': 2,
            'exp': 15,
        };
    },

    playAttackEfe: function(x, y){

        //攻撃エフェクト
       let atkSprite = Sprite('normalAtk', 120, 120).addChildTo(this.dungeonLayer);
       atkSprite.setPosition(x, y);

       let atkAnim = FrameAnimation('playerAtkSS').attachTo(atkSprite);
       atkAnim.gotoAndPlay("atk");

       atkSprite.tweener.wait(200).call(function() {
           atkSprite.remove();
       });

    },

    act: function (absolutePlayerX, absolutePlayerY, mobs, i) {
        console.log("エネミー" + i + "の行動：");
        //プレイヤーとエネミーの位置情報を表示する
        //位置がかぶっていた場合のため
        console.log('Player絶対位置：x : ' + absolutePlayerX + ' y : ' + absolutePlayerY);
        console.log('mob絶対位置：x : ' + this.x + ' y : ' + this.y);
        var self = this;
        //入力コールバック
        var passableCallback = function(x, y){
            return (self.mapArray[x][y] === 0);
        };
        
        //ダイクストラ法
        var dijkstra = new ROT.Path.Dijkstra((absolutePlayerX / baseSize), (absolutePlayerY / baseSize), passableCallback, {topology:4});

        //経路変数
        let path = new Array(0);

        //経路探索
        dijkstra.compute(this.x / baseSize, this.y / baseSize, function(x, y){
            path.push({x:x, y:y});
        });

        console.log("pathの長さ = " + path.length);
        var stepX = path[1].x * baseSize;
        var stepY = path[1].y * baseSize;

        if(absolutePlayerX === stepX && absolutePlayerY === stepY){

            //攻撃する
            SoundManager.play('enemyAtk');

            //攻撃アニメーション再生
            this.playAttackEfe(absolutePlayerX, absolutePlayerY);

            //メッセージ
            //this.messageWindow.setMessage(this.status.name + 'の攻撃！');
            this.player.attacked(this.status.atk, 0);

            return "attack";

        }else{

            //他のMOBとぶつからないかチェックする
            if(this.checkHitMobs(stepX, stepY, mobs, i)){

                //移動する
                this.tweener.moveTo(stepX, stepY, fv).play();

                //絶対座標を更新する
                this.absoluteX = stepX;
                this.absoluteY = stepY;
            }
        }
    }
});