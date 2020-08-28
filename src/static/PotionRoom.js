phina.define('PotionRoomScene', {
    superClass: 'DisplayScene',
    init: function (option) {
        this.superInit(option);
        //トークデータ
        this.talkData = loadInfo('talk.json');
        //ゲームエンジン
        GameEngine = Engine();
        //ロードする
        var loadData = load('SaveData.json');
        for(var i = 0; i < loadData.warehouse.length; i++){
            console.log(loadData.warehouse[i].name);
        }
        //倉庫クラスを作る
        this.warehouse = Warehouse(loadData.warehouse);
        console.log('ロード直後warehouse'+this.warehouse);
        //背景画像を設定
        var backgroundImage = Sprite('homeBackImage2').addChildTo(this);
        backgroundImage.setPosition(this.gridX.center(), this.gridY.center());
        backgroundImage.setSize(WIDTH, HEIGHT);

        //プレイヤー
        this.player = Sprite('パッツンちゃん').addChildTo(this);
        this.playerAnim = FrameAnimation('pattunSS').attachTo(this.player);
        this.playerAnim.fit = false;
        this.playerAnim.gotoAndPlay('blink');
        this.player.setSize(baseSize * 5, baseSize * 6.25);
        this.player.setPosition(this.gridX.center(), this.gridY.span(7));
        //水釜を作る
        this.waterKettle = WaterKettle('waterKettle').addChildTo(this);
        this.waterKettle.setPosition(this.player.x, this.player.y + baseSize * 3);
        this.waterKettle.setSize(baseSize * 5, baseSize * 3);
        this.waterKettleAnim = FrameAnimation('waterKettleSS').attachTo(this.waterKettle);
        this.waterKettleAnim.fit = false;
        this.waterKettleAnim.gotoAndPlay('water');

        this.questGroup = DisplayElement().addChildTo(this);//依頼パーツのグループ

        //ボタン類を作る
        this.setButton();
        //ポーションフレーム
        this.potionFrame = Sprite('potionFrame')
        .setSize(baseSize * 2 - 20, baseSize * 2 - 20)
        .setPosition(this.gridX.center(), this.gridY.center(6) + 13)
        .addChildTo(this);
        //アイテムウィンドウを作る
        this.itemListWindow = ItemListWindow(this.warehouse, this.waterKettle, this.potionFrame).addChildTo(this);

        //借金の残りを表示
        this.debt = loadData.debt;
        this.debtLabel = Label({
            text: "ローン : $" + this.debt,
            fontFamily: "pixel",
            fill: "white",
            stroke: "black",
        }).addChildTo(this);
        
        this.debtLabel.setPosition(this.gridX.span(3), HEIGHT - baseSize);

        //依頼
        this.questInfo = QuestInfo().addChildTo(this);
        this.quest = Sprite('依頼娘').addChildTo(this);
        this.quest.setPosition(this.gridX.center(6), this.gridY.center(-1));
        this.quest.setSize(baseSize * 2, baseSize * 2);
        this.questInfo.setQuest();
        this.quest.setInteractive(true);
        this.quest.onpointend = () => {
            this.questInfo.show();
        }
    },
    update: function(app){
        if(app.frame % 240 === 0){
            //瞬き
            this.playerAnim.gotoAndPlay('blink');
        }
        //しゃべる
        if(app.frame % 600 === 0){
            var talkBubble = TalkBubbleLabel({
                cornerRadius: 0,
                tipDirection: 'left',
                tipBasePositionRatio: 0.5,
                x: this.player.x + baseSize * 2,
                y: this.player.y - baseSize * 2,
                fontFamily: 'pixel',
                fontSize: baseSize / 3,
                text: this.talkData.potionRoom[rand(0, 2)],
            }).addChildTo(this);
            talkBubble.tweener.wait(3000).call(function(){
                console.log('消える');
                talkBubble.remove();
            }).play();
        }
    },
    makeQuest: function(){
        /*依頼*/
        this.questImage = Sprite('カエルちゃん')
        .setPosition(this.gridX.span(10), this.gridY.span(3))
        .addChildTo(this.questGroup);
        //依頼ボタンの処理
        this.questImage.onpointend = function(){
            
        }.bind(this);
        this.questLabel = Label({
            text: '依頼',
            x: this.questImage.x,
            y: this.questImage.y + baseSize,
            fontFamily: 'pixel',
            fontSize: baseSize / 3,
            fill: 'yellow',
            stroke: 'white'
        }).addChildTo(this.questImage);
    },
    setButton: function(){
        //参照用
        var self = this;
        //下側パネル
        var underPanel = Sprite('backPanel1')
        .setSize(WIDTH, baseSize * 2)
        .setPosition(this.gridX.center(), HEIGHT - baseSize)
        .addChildTo(this);
        
        //売るボタン
        this.saleButton = Button({
            x: this.gridX.span(12),             // x座標
            y: HEIGHT - baseSize * 1.5,             // y座標
            width: baseSize * 2,         // 横サイズ
            height: baseSize / 2,        // 縦サイズ
            text: "売却",     // 表示文字
            fontSize: baseSize / 3,       // 文字サイズ
            fontColor: 'white', // 文字色
            cornerRadius: 0,   // 角丸み
            stroke: 'gray',     // 枠色
            strokeWidth: 5,     // 枠太さ
            fontFamily: 'pixel',
        }).addChildTo(this);

        //売却ボタンを押したとき
        this.saleButton.onpointend = () => {

            //お金を入れる
            this.debt -= this.questInfo.reward;
            this.debtLabel.text = "ローン : $" + this.debt;

            //ポーションの画像を削除
            this.itemListWindow.potionImage.remove();

            //水窯の中に入っているアイテムを削除
            this.waterKettle.entryItems = new Array(0);

            //クエストを新しく生成する
            this.questInfo.setQuest();
        }
        
        //リビングへ
        this.homeButton = Button({
            x: this.gridX.span(13),             // x座標
            y: this.gridY.center(-7),             // y座標
            width: baseSize * 2,         // 横サイズ
            height: baseSize / 2,        // 縦サイズ
            text: "リビング",     // 表示文字
            fontSize: baseSize / 3,       // 文字サイズ
            fontColor: 'white', // 文字色
            cornerRadius: 0,   // 角丸み
            stroke: 'gray',     // 枠色
            strokeWidth: 5,     // 枠太さ
            fontFamily: 'pixel',
            // 他にも指定できる…？
        }).addChildTo(this);
        this.homeButton.onpointend = function(){
            SoundManager.play('door');
            self.exit('home');
        }
    }
});

phina.define('ItemListWindow', {
    superClass: 'DisplayElement',
    init: function (warehouse, waterKettle, potionFrame) {
        //投入アイテム
        this.waterKettle = waterKettle;
        //ポーションフレーム
        this.potionFrame = potionFrame;
        //ポーション表示用変数
        this.potionImage = null;
        this.itemList = 
        [
            {
                "name": "食用キノコ",
            },
            {
                "name": "桃色のキノコ",
            },
            {
                "name": "瑠璃色のキノコ",
            },
            {
                "name": "アジサイ",
            },
            {
                "name": "コーンフラワー",
            },
            {
                "name": "ハタケシメジ",
            },
            {
                "name": "ミモザ",
            },
            {
                "name": "ムスカリ草"
            },
            {
                "name": "シロツメクサ"
            },
            {
                "name": "ヒガンバナ"
            },
            {
                "name": "タイツリソウ"
            },
            {
                "name": "リコリス"
            },
            {
                "name": "オオヒエンソウ"
            },
        ];
        this.superInit();
        this.warehouse = warehouse
        //選択中ラベル
        this.nowSelectLabel = 1;
        //カーソルが乗っているアイテム名を表示するラベル
        this.itemNameLabel = Label({
            x: WIDTH / 2,             // x座標
            y: baseSize / 2,             // y座標
            text: "",     // 表示文字
            fontSize: baseSize / 2,       // 文字サイズ
            fill: 'white', // 文字色
            stroke: 'black',
            strokeWidth: 3,
            fontFamily: 'pixel',
        }).addChildTo(this);
        //アイテム画像
        this.makeSprite();
        //ラベル作成
        //this.makeLabel();
        //ラベル更新
        this.review();
    },
    makeSprite: function(){
        //バックパネル
        var backPanel = RectangleShape({
            x: 0,
            y: 0,
            width: baseSize * 1.25, 
            height: HEIGHT - baseSize * 2.5,
            fill: 'black',
            stroke: 'white'
        }).addChildTo(this);
        backPanel.setOrigin(0, 0);
        backPanel.alpha = 0;
        //参照用
        var self = this;
        //素材画像
        this.itemSpriteArray = new Array(3);
        for(var i = 0; i < 3; i++){
            this.itemSpriteArray[i] = Icon(this.itemList[i].name, i).addChildTo(this);
            this.itemSpriteArray[i].x = baseSize * 0.75;
            this.itemSpriteArray[i].y = baseSize + i * baseSize * 1.25 + baseSize * 1.25;
            this.itemSpriteArray[i].setSize(baseSize, baseSize);
        }
        //アイテム数ラベル
        this.itemNumberLabelArray = new Array(3);
        for(var i = 0;i < this.itemNumberLabelArray.length; i++){
            this.itemNumberLabelArray[i] = Label({
                x: this.itemSpriteArray[i].x + baseSize / 2,
                y: this.itemSpriteArray[i].y - baseSize / 2,
                text: ' × ' + String(this.counter(this.itemList[i].name)),
                fill: 'white',
                stroke: 'black',
                fontSize: baseSize / 2,
                fontFamily: 'pixel',
            }).setOrigin(0, 0).addChildTo(this);
        }
        //iconのタッチイベント設定
        for(var i = 0; i < 3; i++){
            this.itemSpriteArray[i].setInteractive(true);
            this.itemSpriteArray[i].onpointend = function(){
                console.log(this.name + 'がクリックされたよ');
                //倉庫の在庫を減らす
                for(var j = 0; j < self.warehouse.list.length; j++){
                    if(self.warehouse.list[j].name === this.name){
                        //アイテムを窯に投入する
                        self.waterKettle.setItem(self.warehouse.list[j]);
                        console.log('水窯に入っているアイテム');
                        console.log(self.waterKettle.entryItems);
                        //倉庫からアイテムを削除する
                        self.warehouse.list.splice(j, 1);
                        //ポーションの画像を表示する
                        console.log('potionName = ' + self.waterKettle.potionName);
                        self.potionImage = Sprite(self.waterKettle.potionName)
                        .setPosition(self.potionFrame.x, self.potionFrame.y)
                        .setSize(baseSize * 1.5, baseSize * 1.5)
                        .addChildTo(self);
                        break;
                    }
                }
                //素材数をカウントしなおす
                self.reCount();
                //素材投入アニメーション
                var icon = Sprite(this.name)
                .setPosition(this.x, this.y)
                .setSize(this.width / 2, this.height / 2)
                .addChildTo(self);
                icon.tweener.moveTo(baseSize * 4.5, baseSize * 5.5, 500)
                .call(function(){
                    //削除する
                    icon.remove();
                })
                .play();
            }
            this.itemSpriteArray[i].onpointover = function(){
                //音を流す
                SoundManager.play('cursor');
                self.itemNameLabel.text = this.name;
            }
            this.itemSpriteArray[i].onpointout = function(){
                self.itemNameLabel.text = '';
            }
        }
        //矢印ボタン
        this.upArrow = Sprite('upArrow').addChildTo(this);
        this.upArrow.setPosition(baseSize * 0.75, baseSize);
        this.upArrow.setSize(baseSize, baseSize);
        this.upArrow.setInteractive(true);
        this.upArrow.onclick = function(){
            console.log('上矢印クリックされたよ');
            self.review(-1);
        }

        this.downArrow = Sprite('downArrow').addChildTo(this);
        this.downArrow.setPosition(baseSize * 0.75, baseSize * 6);
        this.downArrow.setSize(baseSize, baseSize);
        this.downArrow.setInteractive(true);
        this.downArrow.onclick = function(){
            console.log('下矢印クリックされたよ');
            self.review(1);
        }
    },
    counter: function(name){
        var count = 0;
        for(var i = 0; i < this.warehouse.list.length; i++){
            if(this.warehouse.list[i].name === name){
                count++;
            }
        }
        console.log(name + ': ' + count);
        return count;
    },
    checkItemNumber: function(upDown){
        for(var i = 0; i < 3; i++){
            var itemNumber = this.itemSpriteArray[i].itemNumber + upDown;
            if(typeof this.itemList[itemNumber] === "undefined"){
                return false;
            }
        }
        //大丈夫だった場合
        return true;
    },
    iconClear: function(){
        for(var i = 0; i < 3; i++){
            this.itemSpriteArray[i].remove();
        }
    },
    reCount: function(){
        for(var i = 0; i < 3; i++){
            this.itemNumberLabelArray[i].text = ' × ' + String(this.counter(this.itemSpriteArray[i].name));
        }
    },
    review: function(upDown){
        //参照用
        var self = this;
        //音を流す
        SoundManager.play('upDownBtn');
        //流す
        if(this.checkItemNumber(upDown)){
            //一回全部クリアにする
            this.iconClear();
            for(var i = 0; i < 3; i++){
                var itemNumber = this.itemSpriteArray[i].itemNumber + upDown;
                this.itemSpriteArray[i] = Icon(this.itemList[itemNumber].name, itemNumber).addChildTo(this);
                this.itemSpriteArray[i].x = baseSize * 0.75;
                this.itemSpriteArray[i].y = baseSize + i * baseSize * 1.25 + baseSize * 1.25;
                this.itemSpriteArray[i].setSize(baseSize, baseSize);
                this.itemSpriteArray[i].setInteractive(true);
                this.itemSpriteArray[i].onpointend = function(){
                    console.log(this.name + 'がクリックされたよ');

                    //倉庫の在庫を減らす
                    for(var j = 0; j < self.warehouse.list.length; j++){
                        if(self.warehouse.list[j].name === this.name){
                            //アイテムを窯に投入する
                            self.waterKettle.setItem(self.warehouse.list[j]);
                            console.log('水窯に入っているアイテム');
                            console.log(self.waterKettle.entryItems);
                            //倉庫からアイテムを削除する
                            self.warehouse.list.splice(j, 1);
                            //ポーションの画像を表示する
                            console.log('potionName = ' + self.waterKettle.potionName);
                            self.potionImage = Sprite(self.waterKettle.potionName)
                            .setPosition(self.potionFrame.x, self.potionFrame.y)
                            .setSize(baseSize * 1.5, baseSize * 1.5)
                            .addChildTo(self);
                            break;
                        }
                    }

                    /*
                    //水窯にすでにアイテムが入っていないか確認する
                    if(self.waterKettle.entryItems.length > 0) {
                        console.log("すでにポーションができてます。\nこれ以上の投入は不可能です");
                        return 0;
                    }
                    */

                    /*
                    //倉庫の在庫を減らす
                    for(var j = 0; j < self.warehouse.list.length; j++){
                        if(self.warehouse.list[j].name === this.name){
                            self.waterKettle.setItem(self.warehouse.list[j]);
                            self.warehouse.list.splice(j, 1);
                            break;
                        }
                    }
                    */
                    //素材数をカウントしなおす
                    self.reCount();
                    //素材投入アニメーション
                    var icon = Sprite(this.name)
                    .setPosition(this.x, this.y)
                    .setSize(this.width / 2, this.height / 2)
                    .addChildTo(self);
                    icon.tweener.moveTo(baseSize * 4.5, baseSize * 5.5, 500)
                    .call(function(){
                        //素材投入アニメ削除
                        console.log("素材投入アニメ削除");
                        //削除する
                        icon.remove();
                    })
                    .play();
                }
                this.itemSpriteArray[i].onpointover = function(){
                    //音を流す
                    SoundManager.play('cursor');
                    self.itemNameLabel.text = this.name;
                }
                this.itemSpriteArray[i].onpointout = function(){
                    self.itemNameLabel.text = '';
                }
                //素材の数を更新する
                this.itemNumberLabelArray[i].text = ' × ' + String(this.counter(this.itemSpriteArray[i].name));
            }
        }
    },
    update: function(app){
    }
});

//iconクラス
phina.define("Icon", {
    // Spriteクラスを継承
    superClass: 'Sprite',
    // コンストラクタ
    init: function (name, itemNumber) {
        this.superInit(name);
        this.name = name;
        this.itemNumber = itemNumber;
    }
});
/*
phina.define('ItemListWindow1', {
    superClass: 'DisplayElement',
    init: function (warehouse) {
        this.superInit();
        this.backgroundColor = "#000";
        this.warehouse = warehouse;
        //将来的にはこのリストをサーバーから受け取って生成するようにする
        this.itemList = 
        [
            {
                "name": "アジサイ",
            },
            {
                "name": "コーンフラワー",
            },
            {
                "name": "ハタケシメジ",
            },
            {
                "name": "ミモザ",
            },
            {
                "name": "ムスカリ草",
            },
            {
                "name": "食用キノコ",
            },
            {
                "name": "桃色のキノコ",
            },
            {
                "name": "瑠璃色のキノコ",
            },
        ];
        //選択中ラベル
        this.nowSelectLabel = 1;
        //何ページ目か
        this.page = 1;
        //アイテム画像
        this.makeSprite();
        //icon作成
        this.makeIcon();
        //ラベル更新
        this.review();
        //消す
        this.hide();
    },
    makeIcon: function(){
        //iconのポジション
        this.iconPosition = [
            {x: baseSize * 1.5, y: baseSize * 1.5},
            {x: baseSize * 3.5, y: baseSize * 1.5},
            {x: baseSize * 5.5, y: baseSize * 1.5},
            {x: baseSize * 7.5, y: baseSize * 1.5},
            {x: baseSize * 1.5, y: baseSize * 6},
            {x: baseSize * 3.5, y: baseSize * 6},
            {x: baseSize * 5.5, y: baseSize * 6},
            {x: baseSize * 7.5, y: baseSize * 6},
        ];
        //iconを作る
        this.icons = Array(this.itemList.length);
        //瓶を作る
        this.bottles = Array(this.itemList.length);
        for(var i = 0; i < this.itemList.length; i++){
            //icon
            this.icons[i] = Sprite(this.itemList[i].name).addChildTo(this);
            this.icons[i].setSize(baseSize * 0.75, baseSize * 0.75);
            this.icons[i].setPosition(this.iconPosition[i].x, this.iconPosition[i].y);
            //瓶
            this.bottles[i] = Sprite('bottle').addChildTo(this);
            this.bottles[i].setSize(baseSize * 1, baseSize * 2);
            this.bottles[i].setPosition(this.iconPosition[i].x, this.iconPosition[i].y);
        }
    },
    makeSprite: function(){
    },
    review: function(){
        
    },
    update: function(app){
    }
});

function counter(list, name){
    var count = 0;
    for(var i = 0; i < list.length; i++){
        if(list[i].itemData.name === "name"){
            count++;
        }
    }
    if(count > 0){
        return count;
    }else{
        console.log('そのアイテムはありませんでした');
        return -1;
    }
}
*/

