phina.define('ItemWindow', {
    superClass: 'SuperWindow',
    init: function (possession, playerAbsoluteX, playerAbsoluteY, messageWindow) {
        this.superInit(WIDTH/2, HEIGHT/2, baseSize*8, baseSize*8);
        //所持品
        this.displayItem = possession.list;
        //選択ウィンドウ
        this.choiceWindow = ChoiceWindow(possession, playerAbsoluteX, playerAbsoluteY, messageWindow).addChildTo(this);
        //label set
        this.setLabels(baseSize, baseSize, 7);
        //参照用
        this.messageWindow = messageWindow;
    },
    update: function(app){
        if(GameEngine.turn !== 'itemWindow') return;

        var key = app.keyboard;
        if(key.getKeyDown('e') && this.visible) {
            SoundManager.play('select09');
            this.hideWindow();
        }else if(key.getKeyDown('e') && !this.visible) {
            SoundManager.play('select09');
            this.review();
            this.showWindow();
        }else if(key.getKeyDown('up')){
            SoundManager.play('select05');
            this.selecter(-1);
        }else if(key.getKeyDown('down')){
            SoundManager.play('select05');
            this.selecter(1);
        }else if(key.getKeyDown('enter') && this.choiceWindow.closeFrame !== app.frame){
            var selectItemNum = this.page * 7 + this.select;
            if(this.displayItem.length > 0){
                this.choiceWindow.showWindow(selectItemNum, app.frame);
                SoundManager.play('pickup01');
            }
        }else if(key.getKeyDown('right')){
            this.page++;
            this.review();
            this.selecter(-this.select);
        }else if(key.getKeyDown('left')){
            this.page--;
            if(this.page < 0) this.page = 0;
            this.review();
            this.selecter(-this.select);
        }
        //アイテムに対して行動したか
        if(this.choiceWindow.choosedFlag){
            //アイテムを使った・置いた場合
            //フラグをオフにする
            this.choiceWindow.choosedFlag = false;
            this.hideWindow();
            //
        }
    },
});
