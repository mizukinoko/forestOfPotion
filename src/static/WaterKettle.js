phina.define("WaterKettle", {
    // Spriteクラスを継承
    superClass: 'Sprite',
    // コンストラクタ
    init: function (name) {
        // 親クラス初期化
        this.superInit(name);
        this.entryItems = new Array(0);
        //現在のポーション名
        this.potionName = '';
    },
    setItem: function(item){
        this.entryItems.push(item);
        this.potionName = this.makePotion();
    },
    makePotion: function(){
        if(this.entryItems[0].name === "桃色のキノコ"){
            return "HPポーション(初級)";
        }
        if(this.entryItems[0].name === "瑠璃色のキノコ"){
            return "MPポーション(初級)";
        }
        if(this.entryItems[0].name === "食用キノコ"){
            return "SPポーション(初級)";
        }

        //どれにも当てはまらない場合
        return "MPポーション(初級)";
    }
});