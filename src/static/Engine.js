phina.define("Engine", {
  
  // 初期化
  init: function (player, mobs, itemWindow, mapGroup) {
    this.mapGroup = mapGroup;
    this.player = player;
    this.mobs = mobs;
    this.itemWindow = itemWindow;
    this.turn = 'player';
    this.lock = false;
  },

  keyCheck: function(key){
    //何かしらのキーが押されていることを確認
    if(key.getKey('left') || key.getKey('right') || key.getKey('up') || key.getKey('down') || key.getKey('space')){
      console.log('キーが入力されました');
      return true;
    }else{
      return false;
    }
  },

  checkMoving: function(player, mobs, dungeonGroup){
    if(mobs[mobs.length - 1].tweener.playing){
      return false;
    }
    
    if(player.tweener.playing || dungeonGroup.tweener.playing){
      return false;
    }
    return true;
  },

  checkLock: function(key, player, mobs, dungeonGroup){
    if(this.lock === true){
      return false;
    }
    if(!this.checkMoving(player, mobs, dungeonGroup)){
      return false;
    }
    if(this.lock === false && this.keyCheck(key)){
      //ロックをかける
      this.lock = true;
      console.log('ロックを掛けました');
      return true;
    }
  },

  nextTurn: function(key, mobs, player, mapGroup){
    //mobsが移動中は実行しない
    if(mobs[0].tweener.playing) return -1;
    //playerが移動中は実行しない
    if(player.tweener.playing) return -1;
    if(mapGroup.tweener.playing) return -1;
    //if (player.tweener.playing || mapGroup.tweener.playing) return -1;
    var self = this;
    /**
     * PLAYER
     */
    if(this.turn === 'player'){
      var result = this.actPlayer(key);
      //プレイヤー移動時
      if(result === 'end'){
        console.log('プレイヤー行動完了');
        this.turn = 'mob';
      }
      //プレイヤー攻撃時
      if(result === 'attack'){
        this.turn = 'playerAttacking';
        setTimeout(() => {
          console.log('プレイヤーの攻撃終了');
          this.turn = 'mob';
        }, 300);
      }
      //プレイヤーアイテム選択時
      if(result === 'itemWindow'){
        console.log('プレイヤーはアイテム選択中');
        this.turn = 'itemWindow';
      }
    }
    /**
     * MOB
     */
    if(this.turn === 'mob'){
      result = this.actMob();
      if(result === "attack"){
        this.turn = 'mobAttacking';
        setTimeout(() => {
          console.log('Mobの攻撃');
          this.turn = 'player';
        }, 300);
      }
      if(result === "end"){
        this.turn = 'player';
      }
    }
    //戻り値
    return true;
  },

  actPlayer: function(key){
    //敵がまだ動き終わっていない
    if(this.mobs[this.mobs.length - 1].tweener.playing) return -1;
    return this.player.handleEvent(key, this.mobs);
  },

  actMob: function(){
    var tmpArray = new Array(this.mobs.length);
    for(var i = 0; i < this.mobs.length; i++){
      console.log('エネミー : ' + i + 'が行動');
      tmpArray[i] = this.mobs[i].act(this.player.absoluteX, this.player.absoluteY, this.mobs, i);
    }
    //攻撃したMobがいないかチェック
    for(var i = 0; i < this.mobs.length; i++){
      if(tmpArray[i] === "attack") return "attack";
    }
    //攻撃したMobがいない場合
    return "end";
  }
});