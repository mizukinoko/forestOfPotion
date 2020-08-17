phina.define('LoadingScene', {
    superClass: 'DisplayScene',

    init: function (options) {
        this.superInit(options);
        var self = this;
        this.backgroundColor = "black";

        //ラベル
        var label = Label({
            text: "now loading",
            fill: 'white',
            fontSize: baseSize / 1.5
        })
            .setOrigin(0, 0)
            .addChildTo(this)
            .setPosition(this.gridX.span(5), this.gridY.span(3));

        //点
        var point = Label({
            text: "",
            fill: 'white',
            fontSize: baseSize / 1.5
        })
            .setOrigin(0, 0)
            .addChildTo(this)
            .setPosition(this.gridX.span(12), this.gridY.span(3));

        point.tweener.clear()
            .wait(250)
            .call(function () {
                console.log(point.text);
                if (point.text == "") {
                    point.text = " .";
                } else if (point.text == " .") {
                    point.text = " . .";
                } else if (point.text == " . .") {
                    point.text = " . . .";
                } else if (point.text == " . . .") {
                    point.text = "";
                }
            })
            .setLoop(true)
            .play();

        //ローディングバー
        var loadingBar = Gauge({
            value: 0,
            width: baseSize * 8,
            gaugeColor: "orange"
        })
            .setPosition(this.gridX.center(), this.gridY.span(12))
            .addChildTo(this);
        loadingBar.animationTime = 3000;

        //flow
        var flows = [];

        //ローダー
        var loader = AssetLoader();
        var loaderFlow = Flow(function (resolve) {
            //進行
            loader.onprogress = function (e) {
                loadingBar.value = e.progress * 80;
            };

            //ロード完了
            loader.onload = function () {
                resolve("loader loaded !");
            };
        });
        flows.push(loaderFlow);
        loader.load(options.assets);

        Flow.all(flows).then(function (args) {
            loadingBar.animationTime = 1;
            loadingBar.value = 100;

            point.text = "";
            point.tweener.clear();

            label.text = "complete!";
            label.tweener.clear()
                .to({ alpha: 0 }, 100)
                .to({ alpha: 1 }, 100)
                .to({ alpha: 0 }, 100)
                .to({ alpha: 1 }, 100)
                .to({ alpha: 0 }, 100)
                .to({ alpha: 1 }, 100)
                .wait(800)
                .call(function () {
                    self.flare('loaded');
                });
        });
    },
});