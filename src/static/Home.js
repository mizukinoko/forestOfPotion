// MainScene クラスを定義
phina.define('HomeScene', {
    superClass: 'DisplayScene',
    init: function (option) {
        this.superInit(option);
        var self = this;
        // 背景色を指定
        this.backgroundColor = '#444';
        //トークデータロード
        this.talkData = loadInfo('talk.json');
        //背景画像を設定
        var backgroundImage = Sprite('homeBackImage2').addChildTo(this);
        backgroundImage.setPosition(this.gridX.center(), this.gridY.center());
        backgroundImage.setSize(WIDTH, HEIGHT);
        //プレイヤー
        this.player = Sprite('パッツンちゃん').addChildTo(this);
        this.playerAnim = FrameAnimation('pattunSS').attachTo(this.player);
        //animation
        this.playerAnim.gotoAndPlay('blink');
        //サイズをフィットさせない
        this.playerAnim.fit = false;
        this.player.setSize(baseSize * 5, baseSize * 6.25);
        this.player.setPosition(this.gridX.center(), this.gridY.span(7));
        //ロードする
        var loadData = load("SaveData.json");
        if(loadData !== -1){
            for(var i = 0; i < loadData.warehouse.length; i++){
                console.log(loadData.warehouse[i].name);
                //倉庫クラスを作る
                this.warehouse = Warehouse(loadData.warehouse);
                console.log('ロード直後warehouse'+this.warehouse);
            }
        }else{
            //セーブデータが無い場合
            this.warehouse = Warehouse(new Array(0));
        }
        
        //参照用
        var self = this;
        //メニューボタン
        this.menuButton = Button({
            x: WIDTH - baseSize * 1.5,             // x座標
            y: baseSize / 2,             // y座標
            width: baseSize * 1.5,         // 横サイズ
            height: baseSize / 2,        // 縦サイズ
            text: "設定",     // 表示文字
            fontSize: baseSize / 2.5,       // 文字サイズ
            fontColor: 'white', // 文字色
            cornerRadius: 0,   // 角丸み
            stroke: 'gray',     // 枠色
            strokeWidth: 5,     // 枠太さ
            fontFamily: 'pixel',
        }).addChildTo(this);
        this.menuButton.onpointend = function(){
            SoundManager.play('menu');
            self.exit('menu');
        }
        //下側パネル
        var underPanel = RectangleShape({
            x: this.gridX.center(),
            y: HEIGHT - baseSize,
            width: WIDTH,
            height: baseSize * 2,
            fill: 'black',
            stroke: 'gray',
        }).addChildTo(this);

        //ダンジョンボタン
        this.dungeonButton = Button({
            x: this.gridX.span(4),             // x座標
            y: this.gridY.center(6),             // y座標
            width: baseSize * 3,         // 横サイズ
            height: baseSize,        // 縦サイズ
            text: "ダンジョン",     // 表示文字
            fontSize: baseSize / 2.5,       // 文字サイズ
            fontColor: 'white', // 文字色
            cornerRadius: 0,   // 角丸み
            stroke: 'gray',     // 枠色
            strokeWidth: 5,     // 枠太さ
            fontFamily: 'pixel',
            // 他にも指定できる…？
        }).addChildTo(this);
        this.dungeonButton.onpointend = function(){
            SoundManager.play('jump10');
            SoundManager.stopMusic(500);
            //音楽を流す
            SoundManager.playMusic("dungeonBGM", 500, true);
            self.exit('game');
        }

        //ポーション部屋へ
        this.potionButton = Button({
            x: this.gridX.span(12),             // x座標
            y: this.gridY.center(6),             // y座標
            width: baseSize * 3,         // 横サイズ
            height: baseSize,        // 縦サイズ
            text: "調合部屋",     // 表示文字
            fontSize: baseSize / 2.5,       // 文字サイズ
            fontColor: 'white', // 文字色
            cornerRadius: 0,   // 角丸み
            stroke: 'gray',     // 枠色
            strokeWidth: 5,     // 枠太さ
            fontFamily: 'pixel',
            // 他にも指定できる…？
        }).addChildTo(this);
        this.potionButton.onpointend = function(){
            SoundManager.play('door');
            self.exit('potionRoom');
        }

        //更新情報表示ウィンドウ
        this.infoWindow = InfoWindow("Credit").addChildTo(this);
        //更新情報表示ウィンドウ用ボタン
        this.infoWindowButton = Button({
            x: baseSize * 1.5,             // x座標
            y: baseSize / 2,             // y座標
            width: baseSize * 2,         // 横サイズ
            height: baseSize / 2,        // 縦サイズ
            text: "Credit",     // 表示文字
            fontSize: baseSize / 3,       // 文字サイズ
            fontColor: 'white', // 文字色
            cornerRadius: 0,   // 角丸み
            stroke: 'gray',     // 枠色
            strokeWidth: 5,     // 枠太さ
            fontFamily: 'pixel',
        }).addChildTo(this);
        
        //更新情報表示ウィンドウ用ボタンの処理内容
        this.infoWindowButton.onpointend = function(){
            SoundManager.play('menu');
            if(self.infoWindow.visible){
                self.infoWindow.hide();
            }else{
                self.infoWindow.show();
            }
        }
        //音楽を流す
        if(loadData !== -1){
            SoundManager.setVolume(loadData.volume);
            console.log('volume = ' + SoundManager.volume);
            SoundManager.setVolumeMusic(loadData.musicVolume);
            console.log('musicVolume = ' + SoundManager.musicVolume);
        }else{
            console.log('ボリュームが保存されてません');
            SoundManager.setVolume(0.1);
            SoundManager.setVolumeMusic(0.1);
        }
        SoundManager.playMusic('eveningCity');
    },
    update: function (app) {
        if(app.frame % 180 === 0){
            //animation
            this.playerAnim.gotoAndPlay('blink');
        }
        if(app.frame % 600 === 0 && !this.infoWindow.visible){
            var talkBubble = TalkBubbleLabel({
                cornerRadius: 0,
                tipBasePositionRatio: 0.5,
                x: this.player.x - baseSize * 3,
                y: this.player.y - baseSize * 2,
                fontFamily: 'pixel',
                fontSize: baseSize / 3,
                text: this.talkData.player[rand(0, 3)],
            }).addChildTo(this);
            talkBubble.tweener.wait(2000).call(function(){
                console.log('消える');
                talkBubble.remove();
            }).play();
        }
    }
});

