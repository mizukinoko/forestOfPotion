phina.define('Mapping', {
    superClass: 'DisplayElement',
    init: function (dungeon) {
        this.superInit();
        //ダンジョンデータ
        this.dungeon = dungeon;
        //マッピングチェッカー用配列
        this.throughFlags = new Array(colsDungeonBlock);
        for(var i = 0; i < colsDungeonBlock; i++){
            this.throughFlags[i] = new Array(rowsDungeonBlock);
            for(var j = 0; j < rowsDungeonBlock; j++){
                this.throughFlags[i][j] = false;
            }
        }
        //プレイヤーの印
        this.playerIcon = CircleShape({
            radius: baseSize / 20,
            fill: 'red',
            stroke: 'transparent',
        }).addChildTo(this);
    },
    //マッピング
    review: function(playerAbsoluteX, playerAbsoluteY){
        let px = playerAbsoluteX / baseSize;
        let py = playerAbsoluteY / baseSize;
        let ratio = baseSize / 6;
        this.playerIcon.setPosition(px * ratio, py * ratio);
        //Mappingしたことがある場所ではないかチェック
        if(this.checkThroughFlags(px, py)) return -1;
        //Mapping開始
        console.log('----------Mapping Start!----------');
        //Room Mapping
        var rooms = this.dungeon.rooms;
        for(var i = 0; i < rooms.length; i++){

            let room_x1 = rooms[i].getLeft();
            let room_x2 = rooms[i].getRight();
            let room_y1 = rooms[i].getTop();
            let room_y2 = rooms[i].getBottom();
            
            console.log('px = '+px);
            console.log('py = '+py);
            console.log('room_x1 = '+room_x1);
            console.log('room_x2 = '+room_x2);
            console.log('room_y1 = '+room_y1);
            console.log('room_y2 = '+room_y2);
            
            let check1 = room_x1 <= px && room_x2 >= px;
            let check2 = room_y1 <= py && room_y2 >= py;

            if(check1 && check2){
                console.log('Mapping!');
                let cx = room_x1 * ratio + ((room_x2 - room_x1) / 2) * ratio;
                let cy = room_y1 * ratio + ((room_y2 - room_y1) / 2) * ratio;
                let rect = RectangleShape().addChildTo(this);
                rect.setPosition(cx, cy);
                /**
                 * 1を足すのは、x1 = 1, x2 = 5 の幅5の部屋があった場合
                 * x2 - x1 = 4となり幅が1足りなくなるからである。
                 */
                rect.setSize((room_x2 - room_x1 + 1) * ratio, (room_y2 - room_y1 + 1) * ratio);
                rect.stroke = 'transparent';
                rect.alpha = 0.5;
                //マッピングフラグを更新
                this.flagUpdate(room_x1, room_x2, room_y1, room_y2);
                
                return true;
            }
        }
        //通路のマッピング
        console.log('Mapping!');
        let cx = px * ratio;
        let cy = py * ratio;
        let rect = RectangleShape().addChildTo(this);
        rect.setPosition(cx, cy);
        rect.setSize(ratio, ratio);
        rect.stroke = 'transparent';
        rect.alpha = 0.5;
        //マッピングフラグを更新
        this.flagUpdate(px, px, py, py);

        return true;
    },
    checkThroughFlags: function(px, py){
        if(this.throughFlags[px][py]){
            return true;
        }else{
            return false;
        }
    },
    flagUpdate: function(room_x1, room_x2, room_y1, room_y2){
        for(var i = room_x1; i <= room_x2; i++){
            for(var j = room_y1; j <= room_y2; j++){
                this.throughFlags[i][j] = true;
            }
        }
    }
});