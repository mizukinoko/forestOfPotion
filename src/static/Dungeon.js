phina.define('Dungeon', {
    init: function (dungeonLayer, floor) {

        this.blocks = null;
        this.rooms = null;

        //現在の階層
        this.floor = floor;

        //階層ごとに生成するダンジョンのサイズを変更
        if(this.floor <= 10)
        {
            MAP_W = baseSize * 20;
            MAP_H = baseSize * 20;
            colsDungeonBlock = MAP_W / baseSize;
            rowsDungeonBlock = MAP_H / baseSize;
        }
        else if(this.floor <= 20)
        {
            MAP_W = baseSize * 25;
            MAP_H = baseSize * 25;
            colsDungeonBlock = MAP_W / baseSize;
            rowsDungeonBlock = MAP_H / baseSize;
        }
        else if(this.floor <= 30)
        {
            MAP_W = baseSize * 30;
            MAP_H = baseSize * 30;
            colsDungeonBlock = MAP_W / baseSize;
            rowsDungeonBlock = MAP_H / baseSize;
        }

        //ダンジョンオブジェクト配置配列
        this.dungeonObjectArray = new Array(colsDungeonBlock);
        for(let cols = 0; cols < colsDungeonBlock; cols++) {
            this.dungeonObjectArray[cols] = new Array(rowsDungeonBlock);
        }

        //ダンジョンレイヤー
        this.dungeonLayer = dungeonLayer;

        //ダンジョンを生成
        this.dungeonArray = this.makeDungeon();

        //ダンジョンをアレンジする
        this.arrangeDungeon();

        //ダンジョンを描画
        this.drawDungeon();

        //ワープゲートを設置
        this.setWarpGame();
    },

    arrangeDungeon: function() {

        for(let x = 0; x < colsDungeonBlock; x++) {
            for(let y = 0; y < rowsDungeonBlock; y++) {

                let check1 = this.dungeonArray[x][y] === 1;
                let check2 = rand(1, 7) === 1;
                let check3 = x !== colsDungeonBlock - 1;
                let check4 = y !== rowsDungeonBlock - 1;
                let check5 = this.dungeonObjectArray[x][y] !== "tree";
                let check6 = this.dungeonObjectArray[x][y] !== "space";

                if(check1 && check2 && check3 && check4 && check5 && check6) {

                    console.log("tree生成");

                    this.dungeonObjectArray[x][y] = "tree";

                }else if(check1){

                    this.dungeonObjectArray[x][y] = "grass";

                }else{

                    this.dungeonObjectArray[x][y] = "road";
                }
            }
        }
    },

    makeDungeon: function () {//部屋のサイズ
        let x1, x2, y1, y2;

        //階層ごとに生成する部屋のサイズを変更する
        if(this.floor <= 10)
        {
            x1 = 2;
            x2 = 4;
            y1 = 2;
            y2 = 4;
        }
        else if(this.floor <= 20)
        {
            x1 = 3;
            x2 = 5;
            y1 = 3;
            y2 = 5;
        }
        else if(this.floor <= 30)
        {
            x1 = 3;
            x2 = 6;
            y1 = 3;
            y2 = 6;
        }
        //マップ配列
        dungeonArray = new Array(colsDungeonBlock);
        for (var i = 0; i < colsDungeonBlock; i++) {
            dungeonArray[i] = new Array(rowsDungeonBlock);
        }
        //rot.jsでマップデータを生成
        var dungeon = new ROT.Map.Digger(
            colsDungeonBlock,
            rowsDungeonBlock,
            {
                roomWidth: [x1, x2],
                roomHeight: [y1, y2],
            }
        );
        //マップ配列に情報を書き込む
        dungeon.create(function (x, y, type) {
            dungeonArray[x][y] = type;
        });
        //ダンジョンの部屋を保存
        this.rooms = dungeon.getRooms();
        console.log(this.rooms);
        //ダンジョンデータを返す
        return dungeonArray;
    },

    drawDungeon: function(){

        for (var x = 0; x < colsDungeonBlock; x++) {
            for (var y = 0; y < rowsDungeonBlock; y++) {

                /*
                //壁ならブロックを配置
                if (this.dungeonArray[x][y] === 1 && rand(1, 10) !== 1) {
                    //var grass = 'grass' + String(rand(1, 3));
                    
                    var block = BlockSprite().setPosition(x * baseSize, y * baseSize).addChildTo(this.dungeonLayer);

                    block.width = baseSize;
                    block.height = baseSize;
                        
                } else if(this.dungeonArray[x][y] == 1) {

                    let block = Sprite('tree').addChildTo(this.dungeonLayer).setPosition(x * baseSize, y * baseSize);
                    block.width = baseSize * 2;
                    block.height = baseSize * 2;
                }
                */

                
                if(this.dungeonObjectArray[x][y] === "grass") {

                    let block = BlockSprite(this.floor).setPosition(x * baseSize, y * baseSize).addChildTo(this.dungeonLayer);
                    block.width = baseSize;
                    block.height = baseSize;

                }
            }
        }

        for(let x = 0; x < colsDungeonBlock; x++) {
            for(let y = 0; y < rowsDungeonBlock; y++) {

                if(this.dungeonObjectArray[x][y] === "tree") {

                    if(this.floor <= 6) 
                    {
                        let block = Sprite("tree").addChildTo(this.dungeonLayer);
                        block.setPosition(x * baseSize, y * baseSize - baseSize / 2);
                        block.setSize(baseSize * 2, baseSize * 2);
                    }
                    else if(this.floor <= 9)
                    {
                        let block = Sprite("tree4").addChildTo(this.dungeonLayer);
                        block.setPosition(x * baseSize, y * baseSize - baseSize / 2);
                        block.setSize(baseSize * 2, baseSize * 2);
                    }
                    else if(this.floor <= 12)
                    {
                        let block = Sprite("kareki").addChildTo(this.dungeonLayer);
                        block.setPosition(x * baseSize, y * baseSize - baseSize / 2);
                        block.setSize(baseSize * 2, baseSize * 2);
                    }
                }
            }
        }
    },

    setWarpGame: function(){
        while(true){
            var rx = rand(2, colsDungeonBlock - 2);
            var ry = rand(2, rowsDungeonBlock - 2);
            //ゲート設置が適切かチェック
            //ブロックがないか
            var check1 = (this.dungeonArray[rx][ry] !== 1);
            //通路ではないか
            var check2 = (this.dungeonArray[rx - 1][ry - 1] !== 1);
            var check3 = (this.dungeonArray[rx + 1][ry - 1] !== 1);
            var check4 = (this.dungeonArray[rx - 1][ry + 1] !== 1);
            var check5 = (this.dungeonArray[rx + 1][ry + 1] !== 1);
            if(check1 && check2 && check3 && check4 && check5){
                //ワープゲート設置
                this.warpGate = Sprite('warpGate').addChildTo(this.dungeonLayer);
                this.warpGate.setPosition(rx * baseSize, ry * baseSize);
                var anim = FrameAnimation('warpGateSS').attachTo(this.warpGate);
                anim.fit = false;
                anim.gotoAndPlay('warp1');
                this.warpGate.setSize(baseSize, baseSize);
                //ワープゲートの位置を入力
                this.dungeonArray[rx][ry] = -1;
                break;
            }
        }
    },
});

/**
 * アンチエイリアスを無くすために
 * ブロックのSpriteを自作する
 */
phina.define("BlockSprite", {
    // Spriteクラスを継承
    superClass: 'Sprite',
    // コンストラクタ
    init: function (floor) {
        // 親クラス初期化
        this.superInit(this.grassGen(floor));
    },
    grassGen: function(floor){
        if(floor <= 5)
        {
            if(rand(0, 15) === 2) return 'grass2';
            if(rand(0, 15) === 3) return 'grass3';
            return 'grass1';
        }

        if(floor <= 10)
        {
            if(rand(0, 1) === 0) return 'grass4';
            if(rand(0, 1) === 1) return 'grass5';
            if(rand(0, 1) === 0) return 'kirikabu';
            return 'rock1';
        }

        if(floor <= 15)
        {
            if(rand(0, 1) === 0) return 'grass4';
            if(rand(0, 1) === 1) return 'grass5';
            if(rand(0, 1) === 0) return 'grass6';
            return 'kirikabu';
        }

        if(floor <= 20)
        {
            if(rand(0, 1) === 0) return 'grass7';
            if(rand(0, 1) === 1) return 'kirikabu';
            return 'rock1';
        }

        //ここからフィールドがコピペ状態にあるので、
        //新しい素材を作ったら実装すること
        if(floor <= 25)
        {
            if(rand(0, 1) === 0) return 'grass4';
            if(rand(0, 1) === 1) return 'grass5';
            if(rand(0, 1) === 0) return 'grass6';
            return 'kirikabu';
        }

        if(floor <= 30)
        {
            if(rand(0, 1) === 0) return 'grass4';
            if(rand(0, 1) === 1) return 'grass5';
            if(rand(0, 1) === 0) return 'grass6';
            return 'kirikabu';
        }

        if(floor <= 35)
        {
            if(rand(0, 1) === 0) return 'grass4';
            if(rand(0, 1) === 1) return 'grass5';
            if(rand(0, 1) === 0) return 'grass6';
            return 'kirikabu';
        }

        if(floor <= 40)
        {
            if(rand(0, 1) === 0) return 'grass4';
            if(rand(0, 1) === 1) return 'grass5';
            if(rand(0, 1) === 0) return 'grass6';
            return 'kirikabu';
        }

        if(floor <= 45)
        {
            if(rand(0, 1) === 0) return 'grass4';
            if(rand(0, 1) === 1) return 'grass5';
            if(rand(0, 1) === 0) return 'grass6';
            return 'kirikabu';
        }

        if(floor <= 50)
        {
            if(rand(0, 1) === 0) return 'grass4';
            if(rand(0, 1) === 1) return 'grass5';
            if(rand(0, 1) === 0) return 'grass6';
            return 'kirikabu';
        }
    },
});