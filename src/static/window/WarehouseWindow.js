phina.define('WarehouseWindow', {
    superClass: 'SuperWindow',
    init: function (warehouse) {
        this.superInit(WIDTH/2, HEIGHT/2, baseSize*8, baseSize*8);
        //所持品
        this.displayItem = warehouse.list;
        //選択ウィンドウ
        this.choiceWindow = ChoiceWindow(warehouse).addChildTo(this);
        //label set
        this.setLabels(baseSize, baseSize, 7);
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
        }
        //アイテムに対して行動したか
        if(this.choiceWindow.choosedFlag){
            //アイテムを使った・置いた場合
            this.choiceWindow.choosedFlag = false;
            this.hideWindow();
        }
    },
});