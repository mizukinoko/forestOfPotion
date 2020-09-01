// MainScene クラスを定義
phina.define('GameScene', {
  superClass: 'DisplayScene',
  init: function (option) {
    this.superInit(option);
    // 背景色を指定
    this.backgroundColor = '#000';

    //ダンジョンレベル
    this.dungeonLevel = 1;

    //最大深層
    this.maxFloor = 30;

    //階層
    this.floor = 10;

    //レイヤーを定義する
    this.groundLayer = DisplayElement().addChildTo(this);
    this.mobLayer = DisplayElement().addChildTo(this);
    this.playerLayer = DisplayElement().addChildTo(this);
    this.dungeonLayer = DisplayElement().addChildTo(this);

    //地面表示
    this.groundLayer = Sprite('jimen').addChildTo(this.groundLayer);
    this.groundLayer.setSize(MAP_W * 2, MAP_H * 2);
    this.groundLayer.setOrigin(0.5, 0.5);

    //ダンジョン生成
    this.dungeon = Dungeon(this.dungeonLayer, this.floor);

    //トラップ設置
    this.dungeonTraps = new Array(10);
    for(var i = 0; i < this.dungeonTraps.length; i++){
      this.dungeonTraps[i] = TrapClass(this.groundLayer, this.dungeon).addChildTo(this.mobLayer);
    }

    //階層ラベル
    this.floorLabel = Label({
      text: this.floor + 'F ',
      x: baseSize / 3,
      y:baseSize / 16,
      fill: "white",
      fontSize: baseSize / 2,
      fontFamily: "pixel",
      stroke: 'black',
      strokeWidth: 2,
    }).setOrigin(0, 0).addChildTo(this);

    //Mapping
    this.mapping = Mapping(this.dungeon).addChildTo(this);

    //メッセージウィンドウ生成
    this.messageWindow = MessageWindow().addChildTo(this);

    //ステータスバー生成
    this.statusBar = StatusBar().addChildTo(this);

    //プレイヤー生成
    this.player = PlayerClass(this.dungeonLayer, this.groundLayer, this.mobLayer, this.dungeon.dungeonArray, this.messageWindow, this.statusBar).addChildTo(this.playerLayer);

    //ゲーム情報の引継ぎ
    this.takeover(option);

    //ダンジョンレベル変更
    this.dungeonLevel = this.floor / 3;

    //アイテム生成
    this.dungeonItems = new Array(10);
    for(var i = 0; i < this.dungeonItems.length; i++){
      this.dungeonItems[i] = ItemClass(this.groundLayer, this.dungeonLevel, this.dungeon).addChildTo(this.mobLayer);
    }
    
    //Mob生成
    this.mobs = new Array(0);
    this.genMobs(3);
    
    //アイテムウィンドウ生成
    this.itemWindow = ItemWindow(this.player.possession, this.player.absoluteX, this.player.absoluteY, this.messageWindow).addChildTo(this);
    
    //初期スクロール
    this.initScroll();
    
    //ゲームエンジン
    GameEngine = Engine(this.player, this.mobs, this.itemWindow, this.dungeonLayer);

    //操作情報表示ウィンドウ
    this.infoWindow = InfoWindow("DungeonHelp").addChildTo(this);

    //操作情報表示ウィンドウ用ボタン
    this.infoWindowButton = Button({
        x: WIDTH - baseSize,             // x座標
        y: baseSize / 2,             // y座標
        width: baseSize * 1.5,         // 横サイズ
        height: baseSize / 2,        // 縦サイズ
        text: "操作",     // 表示文字
        fontSize: baseSize / 3,       // 文字サイズ
        fontColor: 'white', // 文字色
        cornerRadius: 10,   // 角丸み
        stroke: 'gray',     // 枠色
        strokeWidth: 5,     // 枠太さ
        fontFamily: 'pixel',
    }).addChildTo(this);

    //操作情報表示ウィンドウ用ボタンの処理内容
    this.infoWindowButton.onpointend = () => {

      SoundManager.play('menu');

      //ウィンドウの表示
      if(this.infoWindow.visible){
          this.infoWindow.hide();
      }else{
          this.infoWindow.show();
      }
    }

    //Mapping
    this.mapping.review(this.player.absoluteX, this.player.absoluteY);
  },
  update: function(app){

    //ゲームオーバー
    if(this.player.status.hp <= 0) {

      var data = {
        'playerData': {
          'possession': null,
          'status':this.player.status,
        },
        'clear': false,
        'floor': this.floor,
        'score': this.calScore(),
        'message': "戦闘不能・・・治療費で-$1500"
      };

      //ゲームオーバー時のセーブ
      DataManager.DataSave.SaveGameOver(data);

      //リザルトシーンへ
      this.exit('result', data);
    }

    //敵のHPチェック
    this.mobs.forEach((mob, index, mobs) => {
      if(mob.status.hp <= 0){

        //アイテムをドロップさせる
        this.dungeonItems.push(ItemClass(this.groundLayer, this.dungeonLevel, this.dungeon).addChildTo(this.mobLayer));
        this.dungeonItems[this.dungeonItems.length - 1].x = mob.x;
        this.dungeonItems[this.dungeonItems.length - 1].y = mob.y;
        this.dungeonItems[this.dungeonItems.length - 1].absoluteX = mob.absoluteX;
        this.dungeonItems[this.dungeonItems.length - 1].absoluteY = mob.absoluteY;

        //プレイヤーに経験値を入れる
        this.player.getExp(mob.status.exp);

        //プレイヤーのレベルアップチェック
        this.player.checkLvUp();

        //ステータス更新
        this.player.statusBar.review(this.player.status);

        //敵を削除
        mob.remove();
        mobs.splice(index, 1);
        
        //kill数を増やす
        this.player.status.kill++;
      }
    });

    //アイテム取得
    this.dungeonItems.forEach(item => {
      
      //アイテムを取得可能か
      if(this.canGetItem(item)) {

        //アイテムを消す
        item.hide();
        
        SoundManager.play('getItem');

        //絶対位置を削除
        item.absoluteX = -1;
        item.absoluteY = -1;

        //持ち物に追加
        this.player.possession.setItem(item);

      }
    });

    /*トラップに引っかかっているか*/
    this.dungeonTraps.forEach(trap => {

      if(this.isHitTrap(trap)) {

        trap.show();
        console.log('トラップに掛かりました！');

        //メッセージ表示
        this.messageWindow.setMessage('トラップに掛かりました！');

        //ダメージ計算
        this.player.attacked(1, 0);

        //音を再生
      }
    });

    //次の階層へ
    var check1 = (this.player.absoluteX === this.dungeon.warpGate.x);
    var check2 = (this.player.absoluteY === this.dungeon.warpGate.y);
    if(!this.player.tweener.playing && check1 && check2){

      var data = {
        'playerData': {
          'possession': this.player.possession,
          'status':this.player.status,
        },
        'clear': true,
        'floor': this.floor,
        'score': this.calScore(),
        'message': "ポーションの森　ダンジョンクリア!"
      };

      //最終階層まで行っているか
      if(this.floor > this.maxFloor){
        SoundManager.play('jump10');
        SoundManager.stopMusic(500);

        //持ち物をセーブする
        //save(this.player.possession, "dungeonClear");
        DataManager.DataSave.SavePossessionToWarehouse(this.player.possession);

        this.exit('result', data);

      }else{
        SoundManager.play('jump10');
        this.exit('game', data);
      }
    }

    //mobが一体もいない場合
    if(this.mobs.length <= 0){
      this.genMobs(3);
    }

    //ターン制御
    let key = app.keyboard;

    //走る
    if(key.getKey('space')){
      fv = 130;
      v = 130;
    }
    if(key.getKeyUp('space')){
      fv = 260;
      v = 260;
    }

    result = GameEngine.nextTurn(key, this.mobs, this.player, this.mapGroup);
  
    //Mapping開始
    this.mapping.review(this.player.absoluteX, this.player.absoluteY);
  },

  //score計算
  calScore: function(){

    let score = this.player.possession.list.length * 100;
    score += this.player.status.hp * 10;
    score += this.player.status.mp * 5;
    score += this.player.status.hungry * 5;
    score += this.player.status.kill * 30;

    return score;
  },

  //データ引継ぎ
  takeover: function(data){
    if(typeof data.playerData !== "undefined"){

      console.log('データ引継ぎ');
      this.player.status = data.playerData.status;
      this.player.possession = data.playerData.possession;

      //possessionのメッセージウィンドウを現在のものに更新する
      this.player.possession.messageWindow = this.messageWindow;

      //possessionの参照用プレイヤーを最新にする
      this.player.possession.player = this.player;
      this.player.statusBar.review(this.player.status);
    }
    if(typeof data.floor !== "undefined"){
      this.floor = data.floor + 1;
      this.floorLabel.text = this.floor + 'F ';
    }
  },

  genMobs: function(num){
    this.mobNameList = ['おばけカボチャ', 'ガル', '触手の化け物', 'うさぎ', '魔法使い'];
    for(var i = 0; i < num; i++){

      let r = rand(0, 2);
      
      if(this.floor <= 3) {
        if(r == 0) this.mobs.push(ObakeKabotya(this.dungeon.dungeonArray, this.dungeonLayer, this.player, this.messageWindow).addChildTo(this.mobLayer));
        if(r == 1) this.mobs.push(Garu(this.dungeon.dungeonArray, this.dungeonLayer, this.player, this.messageWindow).addChildTo(this.mobLayer));
        if(r == 2) this.mobs.push(SyokusyuNoBakemono(this.dungeon.dungeonArray, this.dungeonLayer, this.player, this.messageWindow).addChildTo(this.mobLayer));
      }
      else if(this.floor <= 6)
      {
        if(r == 0) this.mobs.push(SyokusyuNoBakemono(this.dungeon.dungeonArray, this.dungeonLayer, this.player, this.messageWindow).addChildTo(this.mobLayer));
        if(r == 1) this.mobs.push(Usagi(this.dungeon.dungeonArray, this.dungeonLayer, this.player, this.messageWindow).addChildTo(this.mobLayer));
        if(r == 2) this.mobs.push(Wizard(this.dungeon.dungeonArray, this.dungeonLayer, this.player, this.messageWindow).addChildTo(this.mobLayer));
      }
      else if(this.floor <= 9)
      {
        if(r == 0) this.mobs.push(Usagi(this.dungeon.dungeonArray, this.dungeonLayer, this.player, this.messageWindow).addChildTo(this.mobLayer));
        if(r == 1) this.mobs.push(Wizard(this.dungeon.dungeonArray, this.dungeonLayer, this.player, this.messageWindow).addChildTo(this.mobLayer));
        if(r == 2) this.mobs.push(KinokoWitch(this.dungeon.dungeonArray, this.dungeonLayer, this.player, this.messageWindow).addChildTo(this.mobLayer));
      }
      else if(this.floor <= 12)
      {
        if(r == 0) this.mobs.push(KinokoWitch(this.dungeon.dungeonArray, this.dungeonLayer, this.player, this.messageWindow).addChildTo(this.mobLayer));
        if(r == 1) this.mobs.push(KinokoGirl(this.dungeon.dungeonArray, this.dungeonLayer, this.player, this.messageWindow).addChildTo(this.mobLayer));
        if(r == 2) this.mobs.push(Pierrot(this.dungeon.dungeonArray, this.dungeonLayer, this.player, this.messageWindow).addChildTo(this.mobLayer));
      } else {
        this.mobs.push(KinokoWitch(this.dungeon.dungeonArray, this.dungeonLayer, this.player, this.messageWindow).addChildTo(this.mobLayer));
      }
    }
  },

  canGetItem: function(item){
    if(this.player.possession.list.length > 21) {
        this.messageWindow.setMessage("持ち物が一杯です");
        return false;
    }

    var check1 = item.absoluteX === this.player.absoluteX;
    var check2 = item.absoluteY === this.player.absoluteY;
    var check3 = !this.player.tweener.playing && !this.dungeonLayer.tweener.playing;

    if(check1 && check2 && check3){
      return true;
    }else{
      return false;
    }
},

isHitTrap: function(trap){

  var check1 = trap.absoluteX === this.player.absoluteX;
  var check2 = trap.absoluteY === this.player.absoluteY;
  var check3 = !this.player.tweener.playing && !this.dungeonLayer.tweener.playing;

  if(check1 && check2 && check3){

      //連続で実行されないように
      if(trap.prevFrame){
          return false;
      }
      
      //トラップにぶつかった
      trap.prevFrame = true;
      return true;

  }else{

      //トラップにぶつかっていない
      return false;

  }
},

  //初期スクロール
  initScroll: function(){
    //初期ポジションまでの距離
    fitX = Math.abs(this.player.x - mapScrollMargin);
    fitY = Math.abs(this.player.y - mapScrollMargin);

    if(this.player.x <= mapScrollMargin){
      this.player.x += fitX;
      this.dungeonLayer.x += fitX;
      this.mobLayer.x += fitX;
    }

    if(this.player.x >= WIDTH - mapScrollMargin){
      this.player.x -= fitX;
      this.dungeonLayer.x -= fitX;
      this.mobLayer.x -= fitX;
    }

    if(this.player.y <= mapScrollMargin){
      this.player.y += fitY;
      this.dungeonLayer += fitY;
      this.mobLayer.y += fitY;
    }

    if(this.player.y >= HEIGHT - mapScrollMargin){
      this.player.y -= fitY;
      this.dungeonLayer.y -= fitY;
      this.mobLayer.y -= fitY;
    }
  },
});

// メイン処理
phina.main(function () {
  // アプリケーション生成
  var app = GameApp({
    query: '#gameCanvas',
    startLabel: 'title',
    assets: ASSETS,
    width: WIDTH,
    height: HEIGHT,
    fps: 60,
    scenes: [
      {
        label: 'menu',
        className: 'MenuScene',
        nextLabel: 'home',
      },
      {
        label: 'title',
        className: 'TitleScene',
        nextLabel: 'home',
      },
      {
        label: 'home',
        className: 'HomeScene',
        nextLabel: '',
      },
      {
        label: 'potionRoom',
        className: 'PotionRoomScene',
        nextLabel: 'home',
      },
      {
        label: 'game',
        className: 'GameScene',
        nextLabel: '',
      },
      {
        label: 'result',
        className: 'ResultScene',
        nextLabel: 'home',
      },
     ]
  });
  // アプリケーション実行
  app.run();
});

//minからmaxまでの整数を返す関数
function rand(min, max){
  //min ~ max
  var sp = max - min + 1;
  var randNum = Math.floor(min + Math.random() * sp);
  //console.log("randNum = " + randNum);
  return randNum;
};
