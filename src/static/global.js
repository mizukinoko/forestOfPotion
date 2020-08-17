//一ブロックのサイズ
var baseSize = 48 + 48;

//スクロールマージン
var mapScrollMargin = baseSize * 3.5;

//歩行スピード
var v = 260;

//field speed
var fv = v;

//アニメーションの更新スピード
var frequency = 14;

//マップサイズ
var MAP_W = baseSize * 30;
var MAP_H = baseSize * 30;

//画面サイズdefault = 9
var WIDTH = baseSize * 9;
var HEIGHT = baseSize * 9;

//縦のブロック数
var colsDungeonBlock = MAP_W / baseSize;

//横のブロック数
var rowsDungeonBlock = MAP_H / baseSize;

//offset
var offset = baseSize / 2;

//ゲームターンエンジン
var GameEngine = null;

// phina.js をグローバル領域に展開
phina.globalize();
