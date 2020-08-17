
phina.define("Label", {
    // Spriteクラスを継承
    superClass: 'Label',
    // コンストラクタ
    init: function (args) {
        // 親クラス初期化
        this.superInit(args);
        //this.padding = 1;
    },
    draw: function(canvas){
        canvas.save();                        //canvasの状態をスタックに保存
        canvas.imageSmoothingEnabled = false; //拡大時の補完を無効にする
    
        this.superMethod('draw', canvas);     //Spriteのdrawメソッド呼び出し
    
        canvas.restore();                     //他に影響が出ないように状態を戻す
    },
});

phina.define("Sprite", {
    // Spriteクラスを継承
    superClass: 'Sprite',
    // コンストラクタ
    init: function (args) {
        // 親クラス初期化
        this.superInit(args);
    },
    draw: function(canvas){
        canvas.save();                        //canvasの状態をスタックに保存
        canvas.imageSmoothingEnabled = false; //拡大時の補完を無効にする
    
        this.superMethod('draw', canvas);     //Spriteのdrawメソッド呼び出し
    
        canvas.restore();                     //他に影響が出ないように状態を戻す
    },
});

phina.define("Button", {
    // Spriteクラスを継承
    superClass: 'Button',
    // コンストラクタ
    init: function (args) {
        // 親クラス初期化
        this.superInit(args);
        this.padding = 2;
        this.fill = Color(0, 0, 0, 0.5);
    },
    draw: function(canvas){
        canvas.save();                        //canvasの状態をスタックに保存
        canvas.imageSmoothingEnabled = false; //拡大時の補完を無効にする
    
        this.superMethod('draw', canvas);     //Spriteのdrawメソッド呼び出し
    
        canvas.restore();                     //他に影響が出ないように状態を戻す
    },
});
