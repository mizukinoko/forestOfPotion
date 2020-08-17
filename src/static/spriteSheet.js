var ASSETS = {
    image: {
      //title
      'title': './images/title.gif',

      //effect
      'normalAtk': './images/effect/pipo-btleffect002.png',

      //homeBackGround
      'homeBackImage1': './images/home/homeBackImage1.png',
      'homeBackImage2': './images/home/homeBackImage2.png',
      'homeBackImage3': './images/home/homeBackImage3.png',

      //家具
      'bottle': './images/bottle3.png',
      'waterKettle': './images/水釜/waterKettleSheet.png',

      //window
      'itemWindow1': './images/window/mainwindowE.png',
      'potionFrame': './images/window/mainwindowJ.png',
      'rightArrow': './images/window/rightArrow.png',
      'leftArrow': './images/window/leftArrow.png',
      'upArrow': './images/window/upArrow.png',
      'downArrow': './images/window/downArrow.png',

      //backPanel
      'backPanel1': './images/window/backPanel2.png',

      //Player
      'player': './images/player/whiteHair.png',

      //'player': './images/player/パッツンちゃん歩行チップ.png',
      'カエルちゃん': './images/player/カエルちゃんv3.png',
      //'パッツンちゃん': './images/player/パッツンちゃん瞬きスプライトシート.png',
      'パッツンちゃん': './images/player/銀髪ちゃん/銀髪立ち絵スプライトシート.png',

      //キャラクター
      '依頼娘': './images/chara/依頼娘.png',

      //Mob
      'おばけカボチャ': './images/mob/e_004_b.png',
      'ガル': './images/mob/e_002.png',
      '触手の化け物': './images/mob/azathoth.png',
      'うさぎ': './images/mob/rabbit.png',
      '魔法使い': './images/mob/wizard.png',

      //Dungeon Item
      'jimen': './images/jimen.png',
      'warpGate': './images/pipo-mapeffect013c-2.png',
      'grass1': './images/grass1.png',
      'grass2': './images/grass2.png',
      'grass3': './images/grass3.png',
      'grass4': './images/grass4.png',
      'grass5': './images/grass5.png',
      'grass6': './images/grass6.png',
      'grass7': './images/grass.png',
      'kirikabu': './images/kirikabu.png',
      'rock1': './images/rock.png',
      'tree': './images/tree.png',
      'tree3': './images/tree5_2.png',
      'tree4': './images/tree4.png',
      'kareki': './images/kareki.png',

      //トラップ
      'alphaTrap': './images/trap/alphaTrap.png',
      '地雷': './images/trap/地雷.png',

      //item
      'アジサイ': './images/ingredients/アジサイ.png',
      'コーンフラワー': './images/ingredients/コーンフラワー.png',
      'ハタケシメジ': './images/ingredients/ハタケシメジ.png',
      'ミモザ': './images/ingredients/ミモザ.png',
      'ムスカリ草': './images/ingredients/ムスカリ草.png',
      '食用キノコ': './images/ingredients/食用キノコ.png',
      '桃色のキノコ': './images/ingredients/桃色のキノコ.png',
      '瑠璃色のキノコ': './images/ingredients/瑠璃色のキノコ.png',
      'シロツメクサ': './images/ingredients/シロツメクサ.png',
      'ツタバウンラン': './images/ingredients/ツタバウンラン.png',
      'ムラサキレンゲ': './images/ingredients/ムラサキレンゲ.png',
      'レンゲ': './images/ingredients/レンゲ.png',
      'ホウセンカ': './images/ingredients/ホウセンカ.png',

      '黄色いグリモア': './images/ingredients/グリモア黄色.png',

      //ポーション
      'MPポーション(初級)': './images/potion/potion1.png',
      'HPポーション(初級)': './images/potion/potion2.png',
      'SPポーション(初級)': './images/potion/potion3.png',
    },
    font: {
      'pixel': './font/PixelMplus10-Regular.ttf'
    },
    sound: {
      'heros': './sounds/MusMus-BGM-076.mp3',
      'nameko': './sounds/MusMus-BGM-089.mp3',
      'taesan': './sounds/MusMus-BGM-090.mp3',
      'dungeonBGM': './sounds/MusMus-BGM-094.mp3',//ダンジョンBGM
      'eveningCity': './sounds/MusMus-BGM-097.mp3',
      'pickup01': './sounds/sh_pickup01.mp3',//アイテム選択
      'poka03': './sounds/poka03.mp3',//選択肢決定
      'select09': './sounds/select09.mp3',//ウィンドウ開閉
      'select05': './sounds/select05.mp3',//選択カーソル移動音
      'jump10': './sounds/jump10.mp3',//ワープ
      'damage7': './sounds/damage7.mp3',//攻撃
      'enemyAtk': './sounds/doka.mp3',//敵攻撃
      'door': './sounds/door.mp3',
      'title': './sounds/button84.mp3',//タイトル画面
      'upDownBtn': './sounds/button68.mp3',//矢印上下
      'getItem': './sounds/sound03.mp3',
      'cursor': './sounds/btn02.mp3',//カーソルが乗ったとき
      'menu': './sounds/menu.mp3',
    },
    spritesheet: {
      //プレイヤー
      "playerSS": {
        "frame": {
          "width": 48,
          "height": 48,
          "cols": 3,
          "rows": 4,
        },
        //歩行アニメーション
        "animations": {
          "walkDown": {
            "frames": [0, 2],
            "next": "walkDown",
            "frequency": frequency,
          },
          "walkUp": {
            "frames": [9, 11],
            "next": "walkUp",
            "frequency": frequency,
          },
          "walkLeft": {
            "frames": [3, 5],
            "next": "walkLeft",
            "frequency": frequency,
          },
          "walkRight": {
            "frames": [6, 8],
            "next": "walkRight",
            "frequency": frequency,
          },
        }
      },
      //攻撃エフェクト
      "playerAtkSS": {
        "frame": {
          "width": 120,
          "height": 120,
          "cols": 9,
          "rows": 1,
        },
        //攻撃アニメーション
        "animations": {
          "atk": {
            "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8],
            "next": "",
            "frequency": 2,
          },
        }
      },

      //パッツンちゃん
      "pattunSS": {
        "frame": {
          "width": 192,
          "height": 240,
          "cols": 7,
          "rows": 1,
        },
        //瞬き
        "animations": {
          "blink": {
            "frames": [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 0],
            "next": "",
            "frequency": 1,
          },
        }
      },

      //水釜
      "waterKettleSS": {
        "frame": {
          "width": 144,
          "height": 96,
          "cols": 3,
          "rows": 1,
        },
        //
        "animations": {
          "water": {
            "frames": [0, 1, 2, 1],
            "next": "water",
            "frequency": 50,
          },
        }
      },


      //pumpkinSS
      "おばけカボチャSS":{
        "frame": {
          "width": 32,
          "height": 32,
          "cols": 3,
          "rows": 4,
        },
        //animation
        "animations": {
          "walkDown": {
            "frames": [0, 1, 2],
            "next": "walkDown",
            "frequency": frequency,
          },
          "walkUp": {
            "frames": [9, 10, 11],
            "next": "walkUp",
            "frequency": frequency,
          },
          "walkLeft": {
            "frames": [3, 4, 5],
            "next": "walkLeft",
            "frequency": frequency,
          },
          "walkRight": {
            "frames": [6, 7, 8],
            "next": "walkRight",
            "frequency": frequency,
          },
        }
      },
      
      /*ガル*/

      "ガルSS":{
        "frame": {
          "width": 32,
          "height": 32,
          "cols": 3,
          "rows": 4,
        },
        //animation
        "animations": {
          "walkDown": {
            "frames": [0, 1, 2],
            "next": "walkDown",
            "frequency": frequency,
          },
          "walkUp": {
            "frames": [9, 10, 11],
            "next": "walkUp",
            "frequency": frequency,
          },
          "walkLeft": {
            "frames": [3, 4, 5],
            "next": "walkLeft",
            "frequency": frequency,
          },
          "walkRight": {
            "frames": [6, 7, 8],
            "next": "walkRight",
            "frequency": frequency,
          },
        }
      },

      //触手の化け物SS
      "触手の化け物SS":{
        "frame": {
          "width": 48,
          "height": 48,
          "cols": 3,
          "rows": 4,
        },
        //animation
        "animations": {
          "walkDown": {
            "frames": [0, 1, 2],
            "next": "walkDown",
            "frequency": frequency,
          },
          "walkUp": {
            "frames": [9, 10, 11],
            "next": "walkUp",
            "frequency": frequency,
          },
          "walkLeft": {
            "frames": [3, 4, 5],
            "next": "walkLeft",
            "frequency": frequency,
          },
          "walkRight": {
            "frames": [6, 7, 8],
            "next": "walkRight",
            "frequency": frequency,
          },
        }
      },

      //うさぎSS
      "うさぎSS":{
        "frame": {
          "width": 32,
          "height": 34,
          "cols": 3,
          "rows": 4,
        },
        //animation
        "animations": {
          "walkDown": {
            "frames": [0, 1, 2],
            "next": "walkDown",
            "frequency": frequency,
          },
          "walkUp": {
            "frames": [9, 10, 11],
            "next": "walkUp",
            "frequency": frequency,
          },
          "walkLeft": {
            "frames": [3, 4, 5],
            "next": "walkLeft",
            "frequency": frequency,
          },
          "walkRight": {
            "frames": [6, 7, 8],
            "next": "walkRight",
            "frequency": frequency,
          },
        }
      },

      //魔法使い
      "魔法使いSS":{
        "frame": {
          "width": 48,
          "height": 48,
          "cols": 3,
          "rows": 4,
        },
        //animation
        "animations": {
          "walkDown": {
            "frames": [0, 1, 2],
            "next": "walkDown",
            "frequency": frequency,
          },
          "walkUp": {
            "frames": [9, 10, 11],
            "next": "walkUp",
            "frequency": frequency,
          },
          "walkLeft": {
            "frames": [3, 4, 5],
            "next": "walkLeft",
            "frequency": frequency,
          },
          "walkRight": {
            "frames": [6, 7, 8],
            "next": "walkRight",
            "frequency": frequency,
          },
        }
      },


      "warpGateSS":{
        "frame": {
          "width": 192,
          "height": 192,
          "cols": 5,
          "rows": 2,
        },
        //animation
        "animations": {
          "warp1": {
            "frames": [0, 1, 2, 3, 4],
            "next": "warp1",
            "frequency": 5,
          },
        }
      },
    }
  };