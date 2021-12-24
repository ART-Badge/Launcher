var TP = require('modules/touch.js');
var hws = require("modules/hardware.js");

Page({
    boardTimer: null,
    score: 0,

    /* 此方法在第一次显示窗体前发生 */
    onLoad: function(event) {
        // 暂时关闭息屏动作
        low_power_timer = false
        TP.PageTouchInit(this);
        // 设置按键模式

        var itemsXml = {
            list: {
                page: this,
                items: [{
                    xml: "panels/brick",
                    items: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, ]
                }]
            },
            gesture: "none"
        };

        this.setData({
            listctrl1: itemsXml,
            listctrl2: itemsXml,
            listctrl3: itemsXml,
            listctrl4: itemsXml,
            imagebox2: "start",
            panelscore: { hide: true },
            button1: { hide: true },
            // button2: { hide: true },
        });
    },

    initialData: function() {
        this.boardTimer = null;
        this.score = 0;
        this.downIdx = 20;

        this.setData({
            // 鸟起始位置
            imagebox2: { position: { x: 20, y: 102 } },
            label1: 0,
            listctrl1: { rect: { x: 135, } },
            listctrl2: { rect: { x: 135, } },
            listctrl3: { rect: { x: 280, } },
            listctrl4: { rect: { x: 280, } },
        });
    },

    /* 此方法展示窗体后发生 */
    onResume1: function(event) {
        this.initialData();
        var width = 240,
            height = 240;
        // 303 = 135 + (240 - 40 * 2) * 0.8 + 40           

        var that = this;
        this.boardTimer = setInterval(function() {
            var boardrect = that.getData("imagebox2", "rect");
            var by = boardrect.y + 12;
            var gety = that.checkCrash();
            if (!gety) {
                return;
            }

            if (by >= 196) {
                by = 196;
                that.destory();
            } else {
                that.setData({ imagebox2: { position: { y: by }, /*value: "images/bird2.png" */ } });
            }
            boardrect = that.getData("listctrl1", "rect");
            var boardrect3 = that.getData("listctrl3", "rect");

            var multiple = 1 + Math.floor(that.score / 50) / 10;
            multiple = multiple >= 2 ? 2 : multiple;
            var bx = (boardrect.x - (width / 50 * multiple));
            // console.log("bx> " + Math.floor(bx) + "  lst1> " + boardrect.x + " lst3> " + boardrect3.x)
            var bx3 = (boardrect3.x - (width / 50 * multiple));
            // console.log("bx3>>>> " + bx3 + "  bx>>> " + bx)
            if (Math.floor(bx) < -30) {
                var randomTH = Math.floor(Math.random() * (height * 0.6 - 50)) + 40;
                var theight = (height * 0.6) - randomTH;
                var ty = height - theight;
                that.setData({
                    listctrl1: { rect: { x: 303, width: 40, height: randomTH } },
                    listctrl2: { rect: { x: 303, width: 40, height: theight, y: ty } },
                    listctrl3: { rect: { x: bx3, width: 40 } },
                    listctrl4: { rect: { x: bx3, width: 40 } },
                    label1: that.score += 1,
                });
            } else if (Math.floor(bx3) < -30) {
                var randomTH = Math.floor(Math.random() * (height * 0.6 - 50)) + 40;
                var theight = (height * 0.6) - randomTH;
                var ty = height - theight;
                that.setData({
                    listctrl1: { rect: { x: bx, width: 40 } },
                    listctrl2: { rect: { x: bx, width: 40 } },
                    listctrl3: { rect: { x: 303, width: 40, height: randomTH } },
                    listctrl4: { rect: { x: 303, width: 40, height: theight, y: ty } },
                    label1: that.score += 1,
                });
            } else {
                that.setData({
                    listctrl1: { rect: { x: bx, width: 40 } },
                    listctrl2: { rect: { x: bx, width: 40 } },
                    listctrl3: { rect: { x: bx3, width: 40 } },
                    listctrl4: { rect: { x: bx3, width: 40 } },
                });
            }
        }, 500);
    },

    // game over
    destory: function(event) {
        if (button_fb_open)
            hws.game_over_audio()
        this.setData({ imagebox2: { value: ["images/bird3.png"] } });

        if (this.boardTimer) {
            clearInterval(this.boardTimer);
            this.boardTimer = null;
        }

        var that = this;
        var boardrect = that.getData("imagebox2", "rect");

        var downpx = 12;
        var destoryTimer = setInterval(function() {
            boardrect.y = boardrect.y + (downpx += 2);
            if (boardrect.y >= 196) {
                boardrect.y = 196;
                clearInterval(destoryTimer);
                destoryTimer = null;

                var bestscore = localStorage.getItem("bestscore") | 0;
                if (bestscore != undefined && that.score > bestscore) {
                    bestscore = that.score;
                    localStorage.setItem("bestscore", that.score);
                }
                that.setData({
                    panel1: { hide: false },
                    panelscore: { hide: false },
                    imagebox17: { value: "images/gameover-bd.png" },
                    lblnum1: that.score,
                    lblnum2: bestscore,
                });
                that.crickShow(false);
            }
            that.setData({ imagebox2: { position: { y: boardrect.y } } });
        }, 50);
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
        if (this.boardTimer) {
            clearInterval(this.boardTimer);
            this.boardTimer = null;
        }
    },

    checkCrash: function() {
        var newy = 0;
        var brid = this.getData("imagebox2", "rect");
        var l1 = this.getData("listctrl1", "rect");
        var l2 = this.getData("listctrl2", "rect");
        var newby = newy = brid.y - this.downIdx;

        // x crash
        var l1xcrash = (brid.x + brid.width) >= l1.x;
        // y crash
        var l1ycrash = brid.y < (l1.height);

        // x crash
        var l2xcrash = (brid.x + brid.width) >= l2.x;
        // y crash
        var l2ycrash = (brid.y + brid.height) > l2.y;
        // listctrl2 crash
        if (((l2xcrash && l2ycrash) || (l1xcrash && l1ycrash)) || (newby <= -this.downIdx)) {
            this.destory();
            return null;
        }

        var l3 = this.getData("listctrl3", "rect");
        var l4 = this.getData("listctrl4", "rect");
        newby = newy = brid.y - this.downIdx;

        // x crash
        var l3xcrash = (brid.x + brid.width) >= l3.x;
        // y crash
        var l3ycrash = brid.y < (l3.height);

        // x crash
        var l4xcrash = (brid.x + brid.width) >= l4.x;
        // y crash
        var l4ycrash = (brid.y + brid.height) > l4.y;

        // listctrl4 crash
        if (((l4xcrash && l4ycrash) || (l3xcrash && l3ycrash)) || (newby <= -this.downIdx)) {
            this.destory();
            return null;
        }
        return newy;
    },

    onBtn: function(event) {
        // console.log("## onBtn >> " + event.target.id)
        this.setData({ imagebox2: { value: ["images/bird2.png", "images/bird3.png", "images/bird4.png"], } });
        this.setData({ imagebox2: "start", panel1: { hide: true } });
        this.crickShow(true);
        this.onResume1();
    },

    onPageTouch: function(event) {
        var that = this
        if (!that.boardTimer) { return; }
        TP.PageTouchEvent(this, event,
            0,
            0, //R2L 
            function() { that.exit_app() }, //L2R
            0, //T2D
            0 //重新开始游戏 //D2T
        );
    },

    control_bird: function() {
        var gety = this.checkCrash();
        if (gety) {
            this.setData({ imagebox2: { position: { y: gety }, /*value: "images/bird1.png" */ } });
        }
    },

    onPanelTouch: function(event) {
        if (event.touchs[0].type == "touchend") {
            this.setData({ panel1: { hide: true, ontouch: function() {} } });
            this.onResume1();
        }
    },

    onPanel2Touch: function(event) {
        var that = this
        TP.PageTouchEvent(this, event,
            0,
            0, //R2L 
            function() { that.exit_app() }, //L2R
            0,
            function() { that.resert_game() } //重新开始游戏
        );
    },

    resert_game: function() {
        this.setData({ imagebox2: { value: ["images/bird1.png"], } });
        this.setData({ imagebox2: "start", panel1: { hide: true } });
        this.crickShow(true);
        this.onResume1();
    },

    crickShow: function(show) {
        this.setData({
            label2: { visible: show },
            listctrl1: { visible: show },
            listctrl2: { visible: show },
            listctrl3: { visible: show },
            listctrl4: { visible: show },
            button1: { hide: show },
            // button2: { hide: show },
        });
    },

    onBtnTouch: function(event) {
        if (!this.boardTimer) { return; }
        switch (event.type) {
            case "press":
                var gety = this.checkCrash();
                if (gety) {
                    this.setData({ imagebox2: { position: { y: gety } } });
                }
                break;
            case "long":
        }
    },

    exit_app: function() {
        console.log("exit game app");
        //恢复按键模式
        pm.redirectTo({ url: 'pages/Game_list/Game_list' });
    },
});