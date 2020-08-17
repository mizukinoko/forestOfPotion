var fs = require("fs");

var DataManager = DataManager || {}

DataManager.DataSave = {

    SavePossessionToWarehouse: function(data) {

        //セーブデータをロードする
        let saveData = load('SaveData.json');

        //セーブする
        data.list.forEach(item => {
            console.log(item.itemData.name);
            //保存
            saveData.warehouse.push(item.itemData);
        });

        //セーブデータを書き出す
        try {
            
            var path = require("path");

            var path = path.dirname(process.execPath);
            console.log("セーブ先：" + path);

            //セーブ
            fs.writeFileSync(path + "\\" + "SaveData.json", JSON.stringify(saveData, null, 4));
            console.log("セーブできました");

        } catch(e) {

            console.log("セーブできませんでした");
            console.log(e);

        }
    },

    SaveGameOver: function(data) {

        //セーブデータをロードする
        let saveData = load('SaveData.json');

        //セーブする
        saveData.debt += 1500;

        try {
            
            var path = require("path");

            var path = path.dirname(process.execPath);
            console.log("セーブ先：" + path);

            //セーブ
            fs.writeFileSync(path + "\\" + "SaveData.json", JSON.stringify(saveData, null, 4));
            console.log("セーブできました");

        } catch(e) {

            console.log("セーブできませんでした");
            console.log(e);

        }
    },

    //セーブデータがない場合、初期セーブデータを作成する
    MakeSaveFile: function() {
        //セーブデータの保存先
        var path = require("path");

        let data = {
            "warehouse": new Array(0),
            "debt": 1000000,
            "volume": 0.1,
            "musicVolume": 0.1
        }

        try {

            path = path.dirname(process.execPath);
            //4行で改行して書き出す
            fs.writeFileSync(path + "\\" + "SaveData.json", JSON.stringify(data, null, 4));
        
        } catch(e) {

            console.log("セーブデータの作成に失敗しました");
            console.log(e);
        }
    },

    SaveMenu: function(data) {
        try{
            fs.writeFileSync(path + "\\SaveData.json", JSON.stringify(data, null, 4));
        } catch(e) {

            console.log('設定を保存できませんでした');
            console.log(e);

        }
    }
}

function save(data, type){
    var path = require("path");
    //ダンジョンをクリアした際のセーブ
    if(type === "dungeonClear"){
        //アイテムのリストを作る
        var saveData = load('SaveData.json');
        console.log('ロードしたセーブデータ' + saveData);
        for(var i = 0; i < data.list.length; i++){
            console.log("セーブするアイテム" + data.list[i].itemData.name);
            saveData.warehouse.push(data.list[i].itemData);
        }
        console.log('saveData = '+saveData.warehouse);
        try{
            //4spaceで改行してJsonを書き出す
            var path = path.dirname(process.execPath);
            console.log('ダンジョンクリア.セーブ先'+path);
            fs.writeFileSync(path + "\\" + "SaveData.json", JSON.stringify(saveData, null, 4));
        }catch(e){
            console.log('セーブ出来ませんでした');
            console.log(e);
        }
    }

    //メニュー設定のセーブ
    if(type === "setMenu"){
        try{
            //4行で改行してJsonを書き出す
            var path = path.dirname(process.execPath);
            fs.writeFileSync(path + "\\SaveData.json", JSON.stringify(data, null, 4));
        }catch(e){
            console.log('セーブ出来ませんでした');
            console.log(e);
        }
    }
    //初めての場合
    if(type === "first"){
        var data = {
            "warehouse": new Array(0),
            "debt": 1000000,
            "volume": 0.1,
            "musicVolume": 0.1
        }
        try{
            //4行で改行してJsonを書き出す
            console.log("ディレクトリ部分切り取り:" + path.dirname(process.execPath));
            var path = path.dirname(process.execPath);
            console.log('最初のセーブ');
            fs.writeFileSync(path + "\\SaveData.json", JSON.stringify(data, null, 4));
        }catch(e){
            console.log('セーブ出来ませんでした');
            console.log(e);
        }
    }
}
//ロード
function load(fn){
    var path = require("path");
    try{
        var path = path.dirname(process.execPath);
        //var fn = path + "\\SaveData.json";
        console.log('ロードファイル名:' + path + "\\" + fn);
        var data = JSON.parse(fs.readFileSync(path + "\\" + fn, 'utf8'));
        //セーブデータを返す
        return data;
    }catch(e){
        console.log('データがありません');
        console.log(e);
        return -1;
    }
}

function loadInfo(fn){
    try{
        var data = JSON.parse(fs.readFileSync(fn, 'utf8'));
        //セーブデータを返す
        return data;
    }catch(e){
        console.log('データがありません');
        return -1;
    }
}