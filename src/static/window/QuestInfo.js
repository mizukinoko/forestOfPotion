phina.define('QuestInfo', {
    superClass: 'DisplayElement',
    init: function () {
        this.superInit();

        //バックパネル
        this.backPanel = RectangleShape({
            x: WIDTH / 2,
            y: HEIGHT / 2,
            width: baseSize * 7,
            height: baseSize * 7,
            stroke: 'gray',
            strokeWidth: 5
        }).addChildTo(this);

        //閉じるボタン
        this.closeButton = Button({
            x: WIDTH / 2,
            y: HEIGHT - baseSize,
            text: "閉じる",
            fontColor: "white",
            stroke: "gray",
            fontFamily: "pixel"
        }).addChildTo(this);
        this.closeButton.onpointend = () => {
            this.hide();
        }

        this.backPanel.alpha = 0.7;

        //クエストアイテムの画像
        this.questItem = null;

        //報酬
        this.reward = 0;
        this.rewardLabel = Label("報酬").addChildTo(this);
        this.rewardLabel.setPosition(WIDTH / 2, HEIGHT / 2 + baseSize);

        this.messageLabel = Label('メッセージ').addChildTo(this);
        this.messageLabel.x = WIDTH / 2;
        this.messageLabel.y = HEIGHT / 2;

        this.hide();

        //クエスト定義
        this.quests = [
            "HPポーション(Lv1)",
            "MPポーション(Lv1)",
            "SPポーション(Lv1)"
        ];
    },

    setQuest: function() {
        let r = rand(0, 2);
        let num = rand(1, 3);
        this.reward = 100;
        
        this.questItem = Sprite(this.quests[r]).addChildTo(this);
        this.questItem.setSize(baseSize, baseSize);
        this.questItem.setPosition(WIDTH / 2, baseSize * 3);

        let questMessage = this.quests[r] + "を" + num + "個ください";
        this.messageLabel.text = questMessage;

        this.rewardLabel.text = "報酬：$" + this.reward;
    }
});