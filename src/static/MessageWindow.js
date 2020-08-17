phina.define('MessageWindow', {
    superClass: 'SuperWindow',
    init: function(){
        var cx = WIDTH / 2;
        var cy = HEIGHT - baseSize * 1.5;
        var width = baseSize * 8.6;
        var height = baseSize * 2.6;
        this.superInit(cx, cy, width, height);
        //バックパネル
        this.backPanel.alpha = 0.5;
        this.backPanel.strokeWidth = 0;
        this.backPanel.shadow = 'black';
        this.backPanel.shadowBlur = 10;
        //メッセージキュー
        this.displayItem = new Array(0);
        //label set
        this.setLabels(baseSize / 2, baseSize * 6.25, 5);
        //表示
        this.review();
        this.show();
    },
    setLabels: function(x, y, ln){
        //表示ラベル
        this.labels = new Array(ln);
        for(var i = 0; i < ln; i++){
            this.labels[i] = Label({
                x: x,
                y: y + (i * (baseSize / 2)),
                width: baseSize * 5,
                height: baseSize / 2,
                fontSize: baseSize / 3,
                fontFamily: 'pixel',
                fill: 'white',
                text: '',
            })
            .setOrigin(0, 0)
            .addChildTo(this);
        }
    },
    setMessage: function(message){
        console.log('メッセージ更新');
        //キューを更新
        if(this.displayItem.length >= this.labels.length){
            this.displayItem.splice(2, 1);
        }
        this.displayItem.unshift(message);
        //ウィンドウを更新
        this.review();
    },
    //reviewをオーバーライド
    review: function(){
        var start = this.page * this.labels.length;
        var end = start + this.labels.length;
        //アイテム数が表示ラベルより少ない場合
        if(this.displayItem.length < end){
            end = this.displayItem.length - start;
        }
        //アイテムラベル初期化
        for(var i = 0; i < this.labels.length; i++){
            console.log(i);
            this.labels[i].text = '';
        }
        for(var i = start; i < end; i++){
            var itemName = this.displayItem[i];
            this.labels[i - start].text = itemName;
        }
    },
});