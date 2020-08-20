phina.define("PlayerClass", {
    // Spriteクラスを継承
    superClass: 'Sprite',
    // コンストラクタ
    init: function (dungeonLayer, groundLayer, mobLayer, mapArray, messageWindow, statusBar) {

        // 親クラス初期化
        this.superInit('player');

        //プレイヤーのデータ
        this.status = {
            'name': 'ピア',
            'hp': 15,
            'mp': 50,
            'hungry': 100,
            'maxHP': 15,
            'maxMP': 50,
            'maxHungry': 100,
            'atk': 5,
            'kill': 0,
            'lv': 1,
            'exp': 0,
        };

        //歩数
        this.step = 0;

        //ステータスバー
        this.statusBar = statusBar;
        this.statusBar.review(this.status);

        //参照用メッセージウィンドウ
        this.messageWindow = messageWindow;

        //持ち物
        this.possession = Possession(messageWindow, this);

        //参照用レイヤー
        this.dungeonLayer = dungeonLayer;
        this.groundLayer = groundLayer;
        this.mobLayer = mobLayer;
        this.dungeonLayer = dungeonLayer;

        //マップデータ
        this.mapArray = mapArray;
        this.moveFlag = false;

        //サイズ
        this.width = baseSize;
        this.height = baseSize;

        //attach
        this.anim = FrameAnimation('playerSS').attachTo(this);

        //サイズをフィットさせない
        this.anim.fit = false;

        //animation
        this.anim.gotoAndPlay('walkDown');

        //向いている方向
        this.direction = 'down';

        //実行中のアニメーション
        this.nowAnimation = 'walkDown';

        //初期位置決め
        this.initPosition();

        //プレイヤーの絶対位置を保存
        this.absoluteX = this.x;
        this.absoluteY = this.y;
    },

    initPosition: function () {
        while (true) {
            var margin = mapScrollMargin / baseSize;
            var rx = rand(margin, colsDungeonBlock - margin);
            var ry = rand(margin, rowsDungeonBlock - margin);
            if (this.mapArray[rx][ry] !== 1) {
                this.x = rx * baseSize;
                this.y = ry * baseSize;
                break;
            }
        }
    },

    playAnimation: function(nextAnimation){
        if(this.nowAnimation !== nextAnimation){
            this.anim.gotoAndPlay(nextAnimation);
            this.nowAnimation = nextAnimation;
        }
    },

    hitCheck: function(nextX, nextY, mobs){
        for(var i = 0; i < mobs.length; i++){
            var check1 = (mobs[i].x / baseSize) === nextX;
            var check2 = (mobs[i].y / baseSize) === nextY;
            //ぶつかる場合
            if(check1 && check2) {
                return i;
            }
        }
        //ぶつからない場合
        return -1;
    },

    attackTo: function(mobs, num){

        //MPを消費する
        this.status.mp -= 2;

        SoundManager.play('damage7');

        //メッセージを表示する
        //this.messageWindow.setMessage(mobs[num].status.name+'を攻撃した');

        //攻撃エフェクト再生
        this.playAttackEfe(mobs[num].x, mobs[num].y);

        //ダメージ計算
        mobs[num].attacked(this.status.atk, 0);

        //ステータスバーを更新
        this.statusBar.review(this.status);
        return true;
    },

    attacked: function(hpDamage, mpDamage){
        this.status.hp -= hpDamage;
        this.status.mpDamage -= mpDamage;
        this.statusBar.review(this.status);
        this.messageWindow.setMessage(this.status.name + 'は' + hpDamage + 'ダメージ!');

        //ダメージアニメーション
        /*
        let damageLabel = Label(hpDamage).addChildTo(this.dungeonLayer).setPosition(this.x, this.y);
        damageLabel.stroke = "black";
        damageLabel.fill = "white";
        damageLabel.tweener
        .moveBy({x: 0, y: -baseSize}, 300)
        .call(function(){
            damageLabel.remove();
        })
        .play();
        */
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

    update: function(){
    },

    act: function () {
        console.log('1: ' + this.tweener.playing);
    },

    /**
     * ステータスコントロール
     */
    //自動回復
    autoRecoveryControler: function(){
        //自動回復
        if(this.step % 5 === 0){
            if(this.status.maxHP > this.status.hp) this.status.hp++;
            if(this.status.maxMP > this.status.mp) this.status.mp++;
            this.statusBar.review(this.status);
        }
    },

    //満腹度コントロール
    hungryControler: function(){
        if(this.step === 0) return -1;
        if(this.step % 7 === 0){
            //満腹度を減らす
            if(this.status.hungry > 0) {
                this.status.hungry--;
                this.statusBar.review(this.status);
            }
        }
    },

    mapScrollAsync: async function(x, y, fv) {

        //マップをスクロースさせる
        this.dungeonLayer.tweener.moveBy(x, y, fv).play();
        this.groundLayer.tweener.moveBy(x, y, fv).play();
        this.mobLayer.tweener.moveBy(x, y, fv).play();
    },

    handleEvent: function (key, mobs) {

        if (key.getKey('a')) {

            var nextX = (this.absoluteX - baseSize) / baseSize;
            var nextY = this.absoluteY / baseSize;

            if (this.mapArray[nextX][nextY] !== 1 && this.hitCheck(nextX, nextY, mobs) < 0) {

                this.playAnimation('walkLeft');

                //向いている方向
                this.direction = 'left';

                //mapスクロールチェック
                if (this.x > mapScrollMargin) {
                    this.tweener.moveBy(-baseSize, 0, v).play();
                } else {
                    this.mapScrollAsync(baseSize, 0, fv);
                }

                //歩数を数える
                this.step++;
                //絶対位置を更新
                this.absoluteX -= baseSize;
                console.log('左へ移動しました');
                //ステータスコントロール
                this.autoRecoveryControler();
                this.hungryControler();
                return 'end';
            } else {
                this.playAnimation('walkLeft');
                //向いている方向
                this.direction = 'left';
            }
        }

        if (key.getKey('w')) {
            var nextX = this.absoluteX / baseSize;
            var nextY = (this.absoluteY - baseSize) / baseSize;
            if (this.mapArray[nextX][nextY] !== 1 && this.hitCheck(nextX, nextY, mobs) < 0) {
                this.playAnimation('walkUp');
                //向いている方向
                this.direction = 'up';
                //mapスクロールチェック
                if (this.y > mapScrollMargin) {
                    this.tweener.moveBy(0, -baseSize, v)
                        .play();
                } else {
                    this.mapScrollAsync(0, baseSize, fv);
                }
                //歩数を数える
                this.step++;
                //絶対位置を更新
                this.absoluteY -= baseSize;
                console.log('上へ移動しました');
                //ステータスコントロール
                this.autoRecoveryControler();
                this.hungryControler();
                //結果を返す
                return 'end';
            } else {
                this.playAnimation('walkUp');
                //向いている方向
                this.direction = 'up';
            }
        }

        if (key.getKey('d')) {
            var nextX = (this.absoluteX + baseSize) / baseSize;
            var nextY = this.absoluteY / baseSize;
            if (this.mapArray[nextX][nextY] !== 1 && this.hitCheck(nextX, nextY, mobs) < 0) {
                this.playAnimation('walkRight');
                //向いている方向
                this.direction = 'right';
                //mapスクロールチェック
                if (this.x < (WIDTH - mapScrollMargin)) {
                    this.tweener.moveBy(baseSize, 0, v)
                        .play();
                } else {
                    this.mapScrollAsync(-baseSize, 0, fv);
                }
                //歩数を数える
                this.step++;
                //絶対位置を更新
                this.absoluteX += baseSize;
                console.log('右へ移動しました');
                //ステータスコントロール
                this.autoRecoveryControler();
                this.hungryControler();
                //結果を返す
                return 'end';
            } else {
                this.playAnimation('walkRight');
                //向いている方向
                this.direction = 'right';
            }
        }

        if (key.getKey('s')) {
            var nextX = this.absoluteX / baseSize;
            var nextY = (this.absoluteY + baseSize) / baseSize;
            if (this.mapArray[nextX][nextY] !== 1 && this.hitCheck(nextX, nextY, mobs) < 0) {
                this.playAnimation('walkDown');
                //向いている方向
                this.direction = 'down';
                //mapスクロールチェック
                if (this.y < (HEIGHT - mapScrollMargin)) {
                    this.tweener.moveBy(0, baseSize, v)
                        .play();
                } else {
                    this.mapScrollAsync(0, -baseSize, fv);
                }
                //歩数を数える
                this.step++;
                //絶対位置を更新
                this.absoluteY += baseSize;
                console.log('下へ移動しました');
                //ステータスコントロール
                this.autoRecoveryControler();
                this.hungryControler();
                //結果を返す
                return 'end';
            } else {
                this.playAnimation('walkDown');
                //向いている方向
                this.direction = 'down';
            }
        }
        if(key.getKeyDown('e')){
            console.log('itemWindow');
            //ステータスコントロール
            this.autoRecoveryControler();
            this.hungryControler();
            return 'itemWindow';
        }

        if(key.getKeyDown('enter') && key.getKeyDown('shift')){
            let px = this.absoluteX / baseSize;
            let py = this.absoluteY / baseSize;
            let leftMob = this.hitCheck(px - 1, py, mobs);
            let rightMob = this.hitCheck(px + 1, py, mobs);
            let upMob = this.hitCheck(px, py - 1, mobs);
            let downMob = this.hitCheck(px, py + 1, mobs);
        }
        if(key.getKeyDown('enter')){
            var num = null;
            if(this.direction === 'left') num = this.hitCheck((this.absoluteX/baseSize)-1, this.absoluteY/baseSize, mobs);
            if(this.direction === 'up') num = this.hitCheck(this.absoluteX/baseSize, (this.absoluteY/baseSize)-1, mobs);
            if(this.direction === 'right') num = this.hitCheck((this.absoluteX/baseSize)+1, this.absoluteY/baseSize, mobs);
            if(this.direction === 'down') num = this.hitCheck(this.absoluteX/baseSize, (this.absoluteY/baseSize)+1, mobs);
            
            console.log(num);
            var result = false;
            if(num >= 0 && this.status.mp >= 5){
                //ステップ増加
                this.step++;
                //攻撃する
                var self = this;
                result = this.attackTo(mobs, num);
                //const promise = new Promise((resolve, reject) => self.attackTo(mobs, num));
                //ターン変更
                if(result) return 'attack';
            }else if(this.status.mp < 5){
                this.messageWindow.setMessage('MPが足りません');
                //ステータスコントロール
                this.autoRecoveryControler();
                this.hungryControler();
                //ターンを変更する
                return 'end';
            }
        }
    },

    getExp: function(exp) {
        this.status.exp += exp;
        this.messageWindow.setMessage(exp + "経験値を獲得した");
    },

    /**
     * レベルアップ管理
     */
    checkLvUp: function() {

        let tmp = ((this.status.lv ** 2) + (this.status.lv * 100));
        let lvUp = this.status.exp - tmp;

        console.log("tmp = " + tmp);
        console.log("playerLV = " + this.status.lv);
        if(lvUp > 0)
        {
            this.status.lv++;
            this.messageWindow.setMessage(this.status.name + "のレベルがアップした");

            let plusHP = rand(2, 4);
            let plusMP = rand(3, 6);
            let plusATK = rand(1, 2);

            this.status.hp += plusHP
            this.status.maxHP += plusHP;
            this.status.mp += plusMP;
            this.status.maxMP += plusMP;
            this.status.atk += plusATK;
            
            return true;
        }
        /*
        if(this.status.exp >= 100 && this.status.lv === 1)
        {
            this.status.lv = 2;
            this.messageWindow.setMessage(this.status.name + "のレベルがアップした");

            let hp = rand(2, 3);
            let mp = rand(4, 5);
            let atk = rand(1, 2);

            this.status.hp += hp;
            this.status.maxHP += hp;
            this.status.mp += mp;
            this.status.maxMP += mp;
            this.status.atk += atk;
            
            return true;
        }
        */
    },
});