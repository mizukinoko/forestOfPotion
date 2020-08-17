phina.define("LvManager", {
    // コンストラクタ
    init: function (status, messageWindow) {

        //参照用変数
        this.status = status;
        this.messageWindow = messageWindow;
    },
    getExp: function(exp) {
        this.status.exp += exp;
        this.messageWindow.setMessage(exp + "経験値を獲得した");
    },
    checkLvUp: function() {
        if(this.status.exp >= 100 && this.status.lv === 1)
        {
            this.status.lv = 2;
            this.messageWindow.setMessage("ピオのレベルがアップした");

            let hp = rand(2, 3);
            let mp = rand(4, 5);
            let atk = rand(1, 2);

            this.status.hp += hp;
            this.status.maxHP += hp;
            this.status.mp += mp;
            this.status.maxMP += mp;
            this.status.atk += atk;
            
            return true;
        }
    },
});