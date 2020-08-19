/*
 *Windowクラスの親クラス
 *
 * 
 */
phina.define('SuperWindow', {
    superClass: 'DisplayElement',
    init: function (cx, cy, width, height) {
        this.superInit();
        //バックパネル
        this.backPanel = RectangleShape({
            x: cx,
            y: cy,
            fill: 'navy',
            width: width,
            height: height,
            stroke: 'gray',
            strokeWidth: 5
        }).addChildTo(this);
        this.backPanel.alpha = 0.7;
        //初期表示品目
        this.displayItem = Possession();
        //初期表示品目ラベル
        this.labels = new Array(0);
        //何番目のラベルを選択しているか
        this.select = 0;
        //ページ変数
        this.page = 0;
        //初期アイテムセレクト
        this.selecter(0);
        //初期表示
        this.hide();
    },
    setLabels: function(x, y, ln){
        //表示ラベル
        this.labels = new Array(ln);
        for(var i = 0; i < ln; i++){
            this.labels[i] = Label({
                x: x,
                y: y + (i * baseSize),
                width: baseSize * 5,
                height: baseSize / 2,
                fontSize: baseSize / 2,
                fontFamily: 'pixel',
                fill: 'white',
                text: '',
            })
            .setOrigin(0, 0)
            .addChildTo(this);
        }
    },
    showWindow: function(){
        //所持品一覧を更新
        this.review();
        this.show();
        //選択中のアイテムを初期化
        this.selecter(-this.select);
    },
    hideWindow: function(){
        //閉じる
        this.hide();
        //ターンを進める
        GameEngine.turn = 'mob';
    },
    selecter: function(upDown){
        //枠外にはみ出さないか確認
        if(this.select + upDown < 0 || this.select + upDown >= this.labels.length){
            //はみ出しているので何もしない
            return -1;
        }
        //アイテムが表示されていないラベルを選択しようとしてないか
        labelNum = this.displayItem.length - this.page * 7;
        if(this.select + upDown >= labelNum){
            //何もないラベルを表示しようとしているので
            //なにもしない
            return -1;
        }
        //現在の選択ラベルをクリア
        this.labels[this.select].backgroundColor = 'transparent';

        this.select += upDown;
        this.labels[this.select].backgroundColor = Color(220, 220, 220, 0.4);
        //正常に終了
        return 0;
    },
    review: function(){
        console.log('ページ：'+this.page);
        var start = this.page * this.labels.length;
        var end = start + this.labels.length;
        //アイテム数が表示ラベルより少ない場合
        if(this.displayItem.length < end){
            //スタートから終わりまでいくつあるか
            let tmp = this.displayItem.length - start;
            end = start + tmp;
        }
        console.log('start : ' + start);
        console.log('end : ' + end);
        //アイテムラベル初期化
        for(var i = 0; i < this.labels.length; i++){
            this.labels[i].text = '';
        }
        for(var i = start; i < end; i++){
            var itemName = this.displayItem[i].itemData.name;
            console.log(i + ' : ' + itemName);
            this.labels[i - start].text = itemName;
        }
    },
});