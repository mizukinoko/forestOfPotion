phina.define("ItemClass", {
    // Spriteクラスを継承
    superClass: 'Sprite',
    // コンストラクタ
    init: function (dungeonLayer, dungeonLevel, dungeon) {

        //マップデータ
        this.mapArray = dungeon.dungeonArray;

        //ダンジョンレベル
        this.dungeonLevel = dungeonLevel;

        //参照用ダンジョンtweener.playing
        this.dungeonLayer = dungeonLayer;

        //将来的にはこのリストをサーバーから受け取って生成するようにする
        this.itemList = 
        [
            {
                "name": "食用キノコ",
                "hungry": 10, 
                "hp": 0,
                "mp": 0,
                "maxHP": 0
            },
            {
                "name": "桃色のキノコ",
                "hungry": 10, 
                "hp": 5,
                "mp": 0,
                "maxHP": 0
            },
            {
                "name": "瑠璃色のキノコ",
                "hungry": 10, 
                "hp": 0,
                "mp": 10,
                "maxHP": 0
            },
            {
                "name": "アジサイ",
                "hungry": 5, 
                "hp": 0,
                "mp": 10,
                "maxHP": 0
            },
            {
                "name": "コーンフラワー",
                "hungry":20, 
                "hp": 10,
                "mp": 0,
                "maxHP": 0
            },
            {
                "name": "ハタケシメジ",
                "hungry": 10, 
                "hp": 5,
                "mp": 0,
                "maxHP": 0
            },
            {
                "name": "ミモザ",
                "hungry": 5, 
                "hp": 5,
                "mp": 5,
                "maxHP": 0
            },
            {
                "name": "ムスカリ草",
                "hungry": 10, 
                "hp": -3,
                "mp": 0,
                "maxHP": 0
            },
            {
                "name": "シロツメクサ",
                "hungry": 20, 
                "hp": 5,
                "mp": 0,
                "maxHP": 0
            },
            {
                "name": "黄色いグリモア",
                "hungry": 0,
                "hp": 0,
                "mp": 0,
                "maxHP": rand(1, 2)
            }
        ];

        // 親クラス初期化
        if(this.dungeonLevel <= 1)
        {
            this.itemData = this.itemList[rand(0, 2)];
        }
        else if(this.dungeonLevel <= 2)
        {
            this.itemData = this.itemList[rand(3, 5)];
        }
        else if(this.dungeonLevel <= 3)
        {
            this.itemData = this.itemList[rand(6, 7)];
        }
        else if(this.dungeonLevel <= 4)
        {
            this.itemData = this.itemList[rand(7, 9)];
        }
        else
        {
            this.itemData = this.itemList[rand(0, 9)];
        }

        this.superInit(this.itemData.name);

        //サイズ決め
        this.width = baseSize / 2;
        this.height = baseSize / 2;

        //初期位置決め
        this.initPosition();

        //絶対位置保存
        this.absoluteX = this.x;
        this.absoluteY = this.y;

    },
    initPosition: function () {
        try{
            while (true) {
                var rx = rand(0, colsDungeonBlock - 1);
                var ry = rand(0, rowsDungeonBlock - 1);
                if (this.mapArray[rx][ry] !== 1) {
                    this.x = rx * baseSize;
                    this.y = ry * baseSize;
                    break;
                }
            }
        }catch(e){
            console.log(e);
        }
    },
});