var dcmlib = require('dcm')
var TP = require('modules/touch.js');
var hws = require("modules/hardware.js");

var arr = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
var arrCurrent = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
var total = 0;

Page({

    //刷新所有label
    cleanLabel: function() {
        for (var i = 0; i < 4; i++)
            for (var j = 0; j < 4; j++) {
                arr[i][j] = 0;
            }
    },

    freshLabel: function() {
        var data = {};
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (arr[i][j] == 2048) {
                    // console.log("You win!");
                    this.gameOver(true);
                    return;
                }
                data['imagebox' + (i * 4 + (j + 1))] = { value: "images/" + arr[i][j] + ".png" };
            }
        }
        this.setData(data);
    },

    //随机生成2or4
    getNullLabel: function() {
        for (var k = 0; k < 1; k++) {
            //取出值为0的label序号
            var nullLabel = [];
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (arr[i][j] == 0)
                        nullLabel[nullLabel.length] = (i * 4 + (j + 1));
                }
            }
            //判断是否游戏结束，当空余格子少于2(即为0时)游戏结束
            if (nullLabel.length == 0) {
                // console.log("game over");
                this.gameOver(false);
                return;
            }
            var num = Math.floor(Math.random() * nullLabel.length);
            var i = parseInt((nullLabel[num] - 1) / 4);
            var j = (nullLabel[num] - 1) % 4;
            //随机生成2or4
            if (Math.round(Math.random()))
                arr[i][j] = 2;
            else
                arr[i][j] = 4;
        }
    },

    //向水平按
    toHorz: function(direction) {
        var line = [];
        for (var i = 0; i < 4; i++)
            line[i] = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++)
                if (arr[i][j] != 0) {
                    line[i][(line[i]).length] = arr[i][j];
                }
        }
        for (var i = 0; i < 4; i++) {
            if (line[i].length > 1) {
                if (direction == "left") {
                    for (var j = 0; j < line[i].length; j++)
                        if (line[i][j] == line[i][j + 1]) {
                            line[i][j + 1] += line[i][j];
                            total += line[i][j + 1];
                            line[i].splice(j, 1);
                            j = -1;
                        }
                } else {
                    for (var j = line[i].length - 1; j > 0; j--)
                        if (line[i][j] == line[i][j - 1]) {
                            line[i][j - 1] += line[i][j];
                            total += line[i][j - 1];
                            line[i].splice(j, 1);
                            j = line[i].length;
                        }
                }
            }
        }
        for (var i = 0; i < 4; i++)
            if (direction == "left") {
                for (var j = 0; j < 4; j++)
                    if (j < line[i].length)
                        arr[i][j] = line[i][j];
                    else
                        arr[i][j] = 0;
            } else if (direction == "right") {
            for (var j = 0; j < 4; j++)
                if (j < line[i].length)
                    arr[i][3 - j] = line[i][(line[i]).length - 1 - j];
                else
                    arr[i][3 - j] = 0;
        }
    },

    //垂直按
    toVert: function(direction) {
        var line = [];
        for (var i = 0; i < 4; i++)
            line[i] = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++)
                if (arr[j][i] != 0) {
                    line[i][(line[i]).length] = arr[j][i];
                }
        }

        for (var i = 0; i < 4; i++) {
            if (line[i].length > 1) {
                if (direction == "up") {
                    for (var j = 0; j < line[i].length; j++)
                        if (line[i][j] == line[i][j + 1]) {
                            line[i][j + 1] += line[i][j];
                            total += line[i][j + 1]
                            line[i].splice(j, 1);
                            j = -1;
                        }
                } else {
                    for (var j = line[i].length - 1; j > 0; j--)
                        if (line[i][j] == line[i][j - 1]) {
                            line[i][j - 1] += line[i][j];
                            total += line[i][j - 1];
                            line[i].splice(j, 1);
                            j = line[i].length;
                        }
                }
            }
        }

        for (var i = 0; i < 4; i++)
            if (direction == "up") {
                for (var j = 0; j < 4; j++)
                    if (j < line[i].length)
                        arr[j][i] = line[i][j];
                    else
                        arr[j][i] = 0;
            } else if (direction == "down") {
            for (var j = 0; j < 4; j++)
                if (j < line[i].length)
                    arr[3 - j][i] = line[i][(line[i]).length - 1 - j];
                else
                    arr[3 - j][i] = 0;
        }
    },

    //获取总分
    getTotal: function() {
        this.setData({ lblscore: total });
    },

    /* 此方法在第一次显示窗体前发生 */
    onLoad: function(event) {
        // 暂时关闭息屏动作
        low_power_timer = false
        TP.PageTouchInit(this);
        this.setData({ panel2: { hide: true } });
        this.cleanLabel();
        this.getNullLabel();
        this.freshLabel();
    },

    /* 此方法展示窗体后发生 */
    onResume: function(event) {

    },

    /* 当前页状态变化为显示时触发 */
    onShow: function(event) {

    },

    /* 当前页状态变化为隐藏时触发 */
    onHide: function(event) {

    },

    /* 此方法关闭窗体前发生 */
    onExit: function(event) {
        // 恢复息屏动作
        low_power_timer = true
        TP.PageTouchUninit(this);
        // 全局变量置空
        arr = null;
        arrCurrent = null;
        total = null;
    },

    onPageTouch: function(event) {
        var that = this;
        TP.PageTouchEvent(this, event,
            0,
            function() { that.operation("right") }, //R2L 
            function() { that.operation("left") }, //L2R
            function() { that.operation("up") }, //T2D
            function() { that.operation("down") } //D2T
        );
    },

    operation: function(event) {
        for (var i = 0; i < 4; i++)
            for (var j = 0; j < 4; j++)
                arrCurrent[i][j] = arr[i][j];
        if (event == "left") {
            this.toHorz("left");
        } else if (event == "right")
            this.toHorz("right");
        else if (event == "up")
            this.toVert("up");
        else if (event == "down")
            this.toVert("down");
        else if (event == "restart") {
            this.cleanLabel();
            total = 0;
        }
        this.getNullLabel();
        this.freshLabel();
        this.getTotal();
    },

    gameOver: function(win) {
        this.setData({ panel2: { hide: false }, imagebox17: { value: "images/" + (win ? "YOUWIN.png" : "gameover.png") } });
        if (button_fb_open)
            win == true ? hws.game_win_audio() : hws.game_over_audio();

        var lastbest = localStorage.getItem("bestscore2") | 0;
        if (lastbest != undefined && total > lastbest) {
            lastbest = total
            localStorage.setItem("bestscore2", lastbest);
        }
        this.setData({ label2: total, label3: lastbest });
    },

    exitevent: function(event) {
        switch (event.type) {
            case "press":
                pm.redirectTo({ url: 'pages/Game_list/Game_list' });
                if (button_fb_open)
                    hws.openBeep() // 反馈
                break;
        }
    },
});