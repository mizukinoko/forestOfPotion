phina.define('ChoiceWindow', {
    superClass: 'SuperWindow',
    init: function (warehouse, playerAbsoluteX, playerAbsoluteY, messageWindow) {
        var x = baseSize * 7;
        var y = baseSize * 2;
        var width = baseSize * 2.3;
        var height = baseSize * 2.2;
        this.superInit(x, y, width, height);
        //選択中のアイテム
        this.selectItemNum = 0;
        //開かれた時のフレーム
        this.openFrame = -1;
        //閉じた時のフレーム
        this.closeFrame = -1;
        //選択完了フラグ
        this.choosedFlag = false;
        //参照用
        this.messageWindow = messageWindow;
        //バックパネルを変更
        this.backPanel.fill = 'blue';
        //label set
        this.displayItem = ['使う', '捨てる'];
        this.setLabels(baseSize * 6, baseSize * 1, 2);
        this.labels[0].text = '使う';
        this.labels[1].text = '捨てる';
        
        //アイテム操作に必要なplayerのデータ
        this.warehouse = warehouse;
        this.playerAbsoluteX = playerAbsoluteX;
        this.playerAbsoluteY = playerAbsoluteY;
    },
    use: function(closeFrame){
        console.log('use');
        this.warehouse.use(this.selectItemNum);
        //選択が完了したことを伝える
        this.choosedFlag = true;

        this.hideWindow(closeFrame);
    },
    throw: function(closeFrame){
        console.log('throw');
        this.warehouse.throw(this.selectItemNum);
        //選択が完了したことを伝える
        this.choosedFlag = true;

        this.hideWindow(closeFrame);
    },
    //ウィンドウ表示をオーバーライドする
    showWindow: function(selectItemNum, openFrame){
        //開かれた時の経過フレーム
        this.openFrame = openFrame;
        GameEngine.turn = 'choiceWindow';
        //行動フラグ初期化
        this.choosedFlag = false;
        this.selectItemNum = selectItemNum;
        this.show();
        this.selecter(-this.select);
    },
    //ウィンドウ隠しをオーバーライドする
    hideWindow: function(closeFrame){
        this.hide();
        //closeFrame更新
        this.closeFrame = closeFrame;
        //アイテムウィンドウに操作権を戻す
        GameEngine.turn = 'itemWindow';
    },
    update: function(app){
        if(GameEngine.turn !== 'choiceWindow') return;
        //開かれた時のフレームと同じ場合は行動しない
        if(this.openFrame === app.frame) return;
        var key = app.keyboard;
        if(key.getKeyDown('up')){
            SoundManager.play('select05');
            this.selecter(-1);
        }else if(key.getKeyDown('down')){
            SoundManager.play('select05');
            this.selecter(1);
        }else if(key.getKeyDown('e')){
            //選択ウィンドウを閉じる
            this.hideWindow();
        }else if(key.getKeyDown('enter')){
            SoundManager.play('poka03');
            if(this.select === 0){
                this.use(app.frame);
            }else{
                this.throw(app.frame);
            }
        }
    }
});

phina.define('WarehouseChoiceWindow', {
    superClass: 'SuperWindow',
    init: function (warehouse) {
        var x = baseSize * 7;
        var y = baseSize * 2;
        var width = baseSize * 2.3;
        var height = baseSize * 2.2;
        this.superInit(x, y, width, height);
        //選択中のアイテム
        this.selectItemNum = 0;
        //開かれた時のフレーム
        this.openFrame = -1;
        //閉じた時のフレーム
        this.closeFrame = -1;
        //選択完了フラグ
        this.choosedFlag = false;
        //バックパネルを変更
        this.backPanel.fill = 'blue';
        //label set
        this.displayItem = ['使う', '捨てる'];
        this.setLabels(baseSize * 6, baseSize * 1, 2);
        this.labels[0].text = '使う';
        this.labels[1].text = '捨てる';
        
        //アイテム操作に必要なplayerのデータ
        this.warehouse = warehouse;
        this.playerAbsoluteX = playerAbsoluteX;
        this.playerAbsoluteY = playerAbsoluteY;
    },
    use: function(closeFrame){
        console.log('use');
        this.warehouse.use(this.selectItemNum);
        //選択が完了したことを伝える
        this.choosedFlag = true;

        this.hideWindow(closeFrame);
    },
    throw: function(closeFrame){
        console.log('throw');
        this.warehouse.throw(this.selectItemNum);
        //選択が完了したことを伝える
        this.choosedFlag = true;

        this.hideWindow(closeFrame);
    },
    //ウィンドウ表示をオーバーライドする
    showWindow: function(selectItemNum, openFrame){
        //開かれた時の経過フレーム
        this.openFrame = openFrame;
        GameEngine.turn = 'choiceWindow';
        //行動フラグ初期化
        this.choosedFlag = false;
        this.selectItemNum = selectItemNum;
        this.show();
        this.selecter(-this.select);
    },
    //ウィンドウ隠しをオーバーライドする
    hideWindow: function(closeFrame){
        this.hide();
        //closeFrame更新
        this.closeFrame = closeFrame;
        //アイテムウィンドウに操作権を戻す
        GameEngine.turn = 'itemWindow';
    },
    update: function(app){
        if(GameEngine.turn !== 'choiceWindow') return;
        //開かれた時のフレームと同じ場合は行動しない
        if(this.openFrame === app.frame) return;
        var key = app.keyboard;
        if(key.getKeyDown('up')){
            SoundManager.play('select05');
            this.selecter(-1);
        }else if(key.getKeyDown('down')){
            SoundManager.play('select05');
            this.selecter(1);
        }else if(key.getKeyDown('e')){
            //選択ウィンドウを閉じる
            this.hideWindow();
        }else if(key.getKeyDown('enter')){
            SoundManager.play('poka03');
            if(this.select === 0){
                this.use(app.frame);
            }else{
                this.throw(app.frame);
            }
        }
    }
});