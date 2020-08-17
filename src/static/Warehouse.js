phina.define("Warehouse", {
    // 初期化
    init: function (warehouse) {
        this.list = warehouse;
        console.log('倉庫クラス'+this.list);
    },
    throw: function(index){
        console.log(this.list[index]+'を入れた');
    },
    //倉庫に入れる
    put: function(index){
        //倉庫にアイテムを追加
        this.list.push(this.list[index]);
        //所持アイテムから削除する
        this.list.splice(index, 1);
    },
    //倉庫から出す
    pick: function(index){
        //所持品に追加する
        this.list.push(this.list[index]);
        //倉庫から削除する
        this.list.splice(index, 1);
    },
    sort: function(){
      //ソート
    }
  });