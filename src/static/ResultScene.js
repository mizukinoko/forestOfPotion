phina.define('ResultScene', {
    superClass: 'ResultScene',
    init: function(option) {
        this.superInit(option);

        this.messageLabel.fontFamily = "pixel";
        this.messageLabel.setPosition(this.gridX.center(), this.gridY.span(2));

        this.scoreText.fontFamily = 'pixel';
        this.scoreText.fontSize = 48 * 2;
        this.scoreText.setPosition(this.gridX.center(), this.gridY.span(6));

        this.scoreLabel.fontFamily = 'pixel';
        this.scoreLabel.fontSize = 96;
        this.scoreLabel.setPosition(this.gridX.center(), this.gridY.span(8));

        this.shareButton.text = "シェアする";
        this.shareButton.width = 48 * 6;
        this.shareButton.fontFamily = 'pixel';
        this.shareButton.cornerRadius = 0;

        this.playButton.text = "家に帰る";
        this.playButton.fontFamily = "pixel";
        this.playButton.width = 48 * 6;
        this.playButton.cornerRadius = 0;

        this.playButton.onpointend = () => {
            this.exit("home", option);
        }
    }
})