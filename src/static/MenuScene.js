phina.define('MenuScene', {
    superClass: 'DisplayScene',
    init: function (option) {
        this.superInit(option);
        // 背景色を指定
        this.backgroundColor = '#000';
        //参照用
        var self = this;

        //BGMボリューム欄
        this.musicVolumeLabel = Label({
            x: this.gridX.span(3),             // x座標
            y: this.gridY.span(2),             // y座標
            text: "BGM:",     // 表示文字
            fontSize: baseSize / 2,       // 文字サイズ
            fill: 'white', // 文字色
            fontFamily: 'pixel',
        }).addChildTo(this);
        //BGMボリュームの値
        this.musicVolumeNumLabel = Label({
            x: this.gridX.span(8),             // x座標
            y: this.gridY.span(2),             // y座標
            text: String(SoundManager.musicVolume * 100),     // 表示文字
            fontSize: baseSize / 2,       // 文字サイズ
            fill: 'white', // 文字色
            fontFamily: 'pixel',
        }).addChildTo(this);
        //BGMボリューム下げるボタン
        this.downMusicVolumeButton = Button({
            x: this.gridX.span(6),             // x座標
            y: this.gridY.span(2),             // y座標
            width: baseSize,         // 横サイズ
            height: baseSize,        // 縦サイズ
            text: "←",     // 表示文字
            fontSize: baseSize / 2.5,       // 文字サイズ
            fontColor: 'white', // 文字色
            cornerRadius: 0,   // 角丸み
            stroke: 'black',     // 枠色
            strokeWidth: 1,     // 枠太さ
            fontFamily: 'pixel',
        }).addChildTo(this);
        //BGMボリュームを下げるボタンの動作
        this.downMusicVolumeButton.onpointend = function(){
            var musicVolume = (Number(Math.round(SoundManager.musicVolume * 100)) - 1) / 100;
            if(musicVolume < 0) musicVolume = 0;
            SoundManager.setVolumeMusic(musicVolume);
            console.log("musicVolume = " + SoundManager.musicVolume);
            self.musicVolumeNumLabel.text = String(Math.round(SoundManager.musicVolume * 100));
        }
        //BGMボリューム上げるボタン
        this.upMusicVolumeButton = Button({
            x: this.gridX.span(10),             // x座標
            y: this.gridY.span(2),             // y座標
            width: baseSize,         // 横サイズ
            height: baseSize,        // 縦サイズ
            text: "→",     // 表示文字
            fontSize: baseSize / 2.5,       // 文字サイズ
            fontColor: 'white', // 文字色
            cornerRadius: 0,   // 角丸み
            stroke: 'black',     // 枠色
            strokeWidth: 1,     // 枠太さ
            fontFamily: 'pixel',
        }).addChildTo(this);
        //BGMボリュームを上げるボタンの動作
        this.upMusicVolumeButton.onpointend = function(){
            var musicVolume = (Number(Math.round(SoundManager.musicVolume * 100)) + 1) / 100;
            if(musicVolume > 100) musicVolume = 100;
            SoundManager.setVolumeMusic(musicVolume);
            console.log("musicVolume = " + SoundManager.musicVolume);
            self.musicVolumeNumLabel.text = String(Math.round(SoundManager.musicVolume * 100));
        }

        //効果音ボリューム欄
        this.volumeLabel = Label({
            x: this.gridX.span(3),             // x座標
            y: this.gridY.span(4),             // y座標
            text: "効果音:",     // 表示文字
            fontSize: baseSize / 2,       // 文字サイズ
            fill: 'white', // 文字色
            fontFamily: 'pixel',
        }).addChildTo(this);
        //効果音ボリュームの値
        this.volumeNumLabel = Label({
            x: this.gridX.span(8),             // x座標
            y: this.gridY.span(4),             // y座標
            text: String(SoundManager.musicVolume * 100),     // 表示文字
            fontSize: baseSize / 2,       // 文字サイズ
            fill: 'white', // 文字色
            fontFamily: 'pixel',
        }).addChildTo(this);
        //効果音下げるボタン
        this.downVolumeButton = Button({
            x: this.gridX.span(6),             // x座標
            y: this.gridY.span(4),             // y座標
            width: baseSize,         // 横サイズ
            height: baseSize,        // 縦サイズ
            text: "←",     // 表示文字
            fontSize: baseSize / 2.5,       // 文字サイズ
            fontColor: 'white', // 文字色
            cornerRadius: 0,   // 角丸み
            stroke: 'black',     // 枠色
            strokeWidth: 1,     // 枠太さ
            fontFamily: 'pixel',
        }).addChildTo(this);
        //効果音ボリュームを下げるボタンの動作
        this.downVolumeButton.onpointend = function(){
            var volume = (Number(Math.round(SoundManager.volume * 100)) - 1) / 100;
            if(volume < 0) volume = 0;
            SoundManager.setVolume(volume);
            console.log("volume = " + SoundManager.volume);
            self.volumeNumLabel.text = String(Math.round(SoundManager.volume * 100));
        }
        //効果音ボリューム上げるボタン
        this.upVolumeButton = Button({
            x: this.gridX.span(10),             // x座標
            y: this.gridY.span(4),             // y座標
            width: baseSize,         // 横サイズ
            height: baseSize,        // 縦サイズ
            text: "→",     // 表示文字
            fontSize: baseSize / 2.5,       // 文字サイズ
            fontColor: 'white', // 文字色
            cornerRadius: 0,   // 角丸み
            stroke: 'black',     // 枠色
            strokeWidth: 1,     // 枠太さ
            fontFamily: 'pixel',
        }).addChildTo(this);
        //BGMボリュームを上げるボタンの動作
        this.upVolumeButton.onpointend = function(){
            var volume = (Number(Math.round(SoundManager.volume * 100)) + 1) / 100;
            if(volume > 100) volume = 100;
            SoundManager.setVolume(volume);
            self.volumeNumLabel.text = String(Math.round(SoundManager.volume * 100));
        }

        //ホーム画面に戻るボタン
        this.homeButton = Button({
            x: this.gridX.span(4),             // x座標
            y: HEIGHT - baseSize,             // y座標
            width: baseSize * 3,         // 横サイズ
            height: baseSize,        // 縦サイズ
            text: "リビングへ",     // 表示文字
            fontSize: baseSize / 2.5,       // 文字サイズ
            fontColor: 'white', // 文字色
            cornerRadius: 0,   // 角丸み
            stroke: 'gray',     // 枠色
            strokeWidth: 5,     // 枠太さ
            fontFamily: 'pixel',
            // 他にも指定できる…？
        }).addChildTo(this);
        this.homeButton.onpointend = function(){
            var loadData = load("SaveData.json");
            loadData.volume = SoundManager.volume;
            loadData.musicVolume = SoundManager.musicVolume;
            save(loadData, "setMenu");
            SoundManager.play('door');
            self.exit('home');
        }
    }
});