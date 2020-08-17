//説明クラス
phina.define('InfoWindow', {
    superClass: 'DisplayElement',
    init: function (key) {
        this.superInit();

        //バックパネル
        this.backPanel = RectangleShape({
            x: WIDTH / 2,
            y: HEIGHT / 2,
            fill: 'black',
            width: WIDTH - baseSize,
            height: HEIGHT - baseSize,
            stroke: 'gray',
            strokeWidth: 5
        }).addChildTo(this);
        this.backPanel.alpha = 0.7;

        //ラベル生成
        this.makeLabel(key);

        //初期では見えなくする
        this.hide();

    },
    makeLabel: function(key){

        var data = loadInfo('help.json');

        for(var i = 0; i < data[key].length; i++){
            Label({
                x: baseSize,
                y: i * (baseSize / 2) + baseSize,
                text: data[key][i],
                fontSize: baseSize / 4,
                fontFamily: 'pixel',
                fill: 'white',
                stroke: 'black',
            })
            .setOrigin(0, 0)
            .addChildTo(this);
        }
    }
});