phina.define('StatusBar', {
    superClass: 'Label',
    init: function () {
        this.superInit();
        //ステータスバー
        this.text = 'HP:';
        this.x = baseSize;
        this.y = baseSize / 16;
        this.fill = "white";
        this.fontSize = 35;
        this.fontFamily = "pixel";
        this.stroke = 'black';
        this.strokeWidth = 2;
        this.setOrigin(0, 0);
    },
    review: function(playerStatus){
        var hp = playerStatus.hp;
        var maxHP = playerStatus.maxHP;
        var mp = playerStatus.mp;
        var maxMP = playerStatus.maxMP;
        var hungry = playerStatus.hungry;
        var lv = playerStatus.lv;
        //ステータスバー
        this.text = 'Lv:' + lv + ' HP:' + hp + "/" + maxHP + ' MP:' + mp + "/" + maxMP +' 満腹度:' + hungry;
    },
});