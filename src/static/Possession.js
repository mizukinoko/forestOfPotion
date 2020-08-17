phina.define("Possession", {
  // 初期化
  init: function (messageWindow, player) {
      this.list = new Array(0);
      this.messageWindow = messageWindow;
      this.player = player;
  },
  setItem: function(item){
      this.list.push(item);
      console.log('アイテム ' + item.itemData.name + 'を取得しました');
      this.messageWindow.setMessage(item.itemData.name + 'を拾いました');
  },
  use: function(index){
    //アイテムを使う
    //空腹度更新
    this.player.status.hungry += this.list[index].itemData.hungry;
    if(this.player.status.hungry > this.player.status.maxHungry) this.player.status.hungry = this.player.status.maxHungry;
    //HP更新
    this.player.status.hp += this.list[index].itemData.hp;
    if(this.player.status.hp > this.player.status.maxHP) this.player.status.hp = this.player.status.maxHP;
    //MP更新
    this.player.status.mp += this.list[index].itemData.mp;
    if(this.player.status.mp > this.player.status.maxMP) this.player.status.mp = this.player.status.maxMP;
    //maxHP更新
    this.player.status.maxHP += this.list[index].itemData.maxHP;
    //ステータスバー更新
    this.player.statusBar.review(this.player.status);
    //メッセージを表示
    this.messageWindow.setMessage(this.list[index].itemData.name+'を使いました');
    //所持アイテムから削除する
    this.list.splice(index, 1);
  },
  throw: function(index){
    //メッセージを表示
    this.messageWindow.setMessage(this.list[index].itemData.name+'を捨てました');
    //所持アイテムから削除する
    this.list.splice(index, 1);
  },
  sort: function(){
    //ソート
  }
});