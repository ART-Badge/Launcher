var TP = require('modules/touch.js')
var hws = require("modules/hardware.js");

Page({
    index: 0,
    menuIndex: 0,
    GameName: [
        { name: "fly bird" },
        { name: "2048" }
    ],

    /* 页面加载时触发该函数 */
    onLoad: function(event) {
        TP.PageTouchInit(this);
    },

    /* 此方法展示窗体后发生 */
    onResume: function(event) {},

    /* 页面显示时触发该函数 */
    onShow: function(event) {},

    /* 页面隐藏时触发该函数 */
    onHide: function(event) {},

    /* 页面退出时触发该函数 */
    onExit: function(event) {
        TP.PageTouchUninit(this);
    },

    onPageTouch: function(event) {
        var that = this
        TP.PageTouchEvent(this, event,
            0,
            function() { that.choose_game(that.menuIndex) },
            function() { app.exit() }, //L2R
            function() { that.pre_game() },
            function() { that.next_game() }
        );
    },

    pre_game: function() {
        this.index--;
        this.index < 0 ? this.index = 1 : null;
        this.setData({
            card1: { prve: true, next: false }
        });
    },

    next_game: function() {
        this.index++;
        this.index > 1 ? this.index = 0 : null;
        this.setData({
            card1: { prve: false, next: true }
        });
    },

    choose_game: function(index) {
        switch (index) {
            case 0:
                pm.redirectTo({ url: 'pages/Game_flybird/Game_flybird' });
                break;
            case 1:
                pm.redirectTo({ url: 'pages/Game_2048/Game_2048' });
                break;
        }
        if (button_fb_open)
            hws.game_menu_audio();
    },

    onCardChange: function(event) {
        this.menuIndex = event.detail.value;
        this.setData({ DotIndicator1: { value: event.detail.value } })
        switch (this.menuIndex) {
            case 0:
                this.setData({
                    title: { value: this.GameName[this.menuIndex].name },
                });
                break;
            default:
                this.setData({
                    title: { value: this.GameName[this.menuIndex].name },
                });
                break;
        }
    },
});