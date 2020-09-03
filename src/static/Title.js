// タイトルシーン
phina.define('TitleScene', {
  superClass: 'DisplayScene',
  // コンストラクタ
  init: function(option) {

    this.superInit(option);

    //セーブデータをロード
    //DataManager.DataSave.MakeSaveFile();
    if(load('SaveData.json') === -1){
      DataManager.DataSave.MakeSaveFile();
    }

    //音量初期化
    SoundManager.setVolumeMusic(0.1);
    SoundManager.setVolume(0.1);

    // 背景追加
    var titleGif = Sprite('title').addChildTo(this);
    titleGif.setPosition(this.gridX.center(), this.gridY.center());
    titleGif.setSize(WIDTH, HEIGHT);

    // タイトル
    Label({
      text: 'ポーションの森',
      fill: 'white',
      stroke: 'black',
      strokeWidth: 10,
      fontSize: baseSize ,
      fontFamily: 'pixel',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(4));

    Label({
      text: "TOUCH START",
      fill: 'white',
      stroke: 'black',
      strokeWidth: 10,
      fontSize: baseSize / 2,
      fontFamily: 'pixel',
    }).addChildTo(this)
      .setPosition(this.gridX.center(), this.gridY.span(12))
      .tweener.fadeOut(1000).fadeIn(500).setLoop(true).play();
    // 画面タッチ時
    this.on('pointend', function() {
      
      //音を流す
      SoundManager.play('title');

      // 次のシーンへ
      setTimeout(() => {
        this.exit();
      }, 2000);
    });

  },
  // 毎フレーム更新処理
  update: function() {
  },
});