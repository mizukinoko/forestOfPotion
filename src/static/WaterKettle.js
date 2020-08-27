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
        /**
         * LV1
         */
        if(this.entryItems[0].name === "桃色のキノコ") return "HPポーション(Lv1)";
        if(this.entryItems[0].name === "瑠璃色のキノコ") return "MPポーション(Lv1)";
        if(this.entryItems[0].name === "食用キノコ") return "SPポーション(Lv1)";
        /**
         * LV2
         */
        if(this.entryItems[0].name === "コーンフラワー") return "HPポーション(Lv2)";
        if(this.entryItems[0].name === "アジサイ") return "MPポーション(Lv2)";
        if(this.entryItems[0].name === "ハタケシメジ") return "SPポーション(Lv2)";

        //どれにも当てはまらない場合
        return "MPポーション(Lv1)";
    }
});