phina.define("Mob", {
    // Spriteクラスを継承
    superClass: 'Sprite',
    // コンストラクタ
    init: function (name, mapArray, dungeonLayer, player, messageWindow) {

        // 親クラス初期化
        this.superInit(name);

        //ステータス
        this.status = {
            'name': name,
            'hp': 8,
            'mp': 50,
            'atk': 1,
            'exp': 10,
        };

        //メッセージウインドウ
        this.messageWindow = messageWindow;

        //player参照変数
        this.player = player;

        //マップデータ
        this.mapArray = mapArray;
        this.dungeonLayer = dungeonLayer;

        //サイズ
        this.width = baseSize;
        this.height = baseSize;

        //attach
        this.anim = FrameAnimation(name + "SS").attachTo(this);

        //サイズをフィットさせない
        this.anim.fit = false;

        //animation
        this.anim.gotoAndPlay('walkDown');

        //初期位置決め
        this.initPosition(player.absoluteX / baseSize, player.absoluteY / baseSize);

        //絶対座標
        this.absoluteX = this.x;
        this.absoluteY = this.y;

        //経路探索用変数
        this.path = null;
    },

    initPosition: function (px, py) {
        while (true) {
            //var rx = rand(WIDTH / baseSize, colsDungeonBlock - 1);
            //var ry = rand(HEIGHT / baseSize, rowsDungeonBlock - 1);
            var rx = rand(9, colsDungeonBlock - 1);
            var ry = rand(9, rowsDungeonBlock - 1);
            var check1 = this.mapArray[rx][ry] !== 1;
            var check2 = (rx !== px) && (ry !== py);
            if (check1 && check2) {
                console.log('mob生成');
                console.log(rx);
                console.log(ry);
                this.x = rx * baseSize;
                this.y = ry * baseSize;
                break;
            }
        }
    },

    attacked: function(hpDamage, mpDamage){
        this.status.hp -= hpDamage;
        this.status.mp -= mpDamage;
        //メッセージ
        this.messageWindow.setMessage(this.status.name + 'に' + hpDamage + 'ダメージ!');
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

    //Mobが移動するときに他のMobと衝突しないか確認する
    checkHitMobs: function(nextX, nextY, mobs, i){
        for(var num = 0; num < mobs.length; num++){
            //自分と比較しないようにする
            if(num != i){
                var checkX = mobs[num].absoluteX === nextX;
                var checkY = mobs[num].absoluteY === nextY;
                //ぶつかる場合は偽
                if(checkX && checkY) return false;
            }
        }
        //ぶつからなければ真
        return true;
    },
    update: function(){
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