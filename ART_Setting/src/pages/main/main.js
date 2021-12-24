var TP = require('modules/touch.js')
var hws = require("modules/hardware.js");

Page({
    menuIndex: 0,
    exit_app_flg: 1,
    current_backlight: 10,

    /* 页面加载时触发该函数 */
    onLoad: function(event) {
        var page = this;
        TP.PageTouchInit(page);
        this.setData({
            slider2: { value: hws.getScreenBrightness() }
        })
        if (button_fb_open)
            this.setData({
                imagebox1: { value: "images/24gf-volumeZero.png" },
                slider1: { value: 100 }
            })
        else
            this.setData({
                imagebox1: { value: "images/24gf-volumeCross.png" },
                slider1: { value: 0 }
            })
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

    onCardChange: function(event) {
        this.setData({ DotIndicator1: { value: event.detail.value } })
        this.menuIndex = event.detail.value;
    },

    onPageTouch: function(event) {
        var that = this
        TP.PageTouchEvent(this, event,
            0,
            function() { that.next_card() },
            function() { that.prev_card() }, //L2R
            function() { that.up_touch_fun() }, //T2D
            function() { that.down_touch_fun() } //D2T
        );
    },

    next_card: function() {
        this.setData({
            card1: { prve: false, next: true }
        })
    },

    prev_card: function() {
        this.setData({
            card1: { prve: true, next: false }
        })
        if (this.menuIndex == 0) app.exit()
    },

    up_touch_fun: function() {
        var that = this
        switch (that.menuIndex) {
            case 0:
                // 开启反馈
                button_fb_open = true;
                hws.openBeep() // bi
                hws.keyfb_enun(1)
                that.setData({
                    slider1: { value: 100 },
                    imagebox1: { value: "images/24gf-volumeZero.png" }
                })
                break;
            case 1:
                that.add_func(10)
                break;
        }
    },

    down_touch_fun: function() {
        var that = this
        switch (that.menuIndex) {
            case 0:
                // 关闭反馈
                button_fb_open = false;
                hws.keyfb_enun(0)
                that.setData({
                    slider1: { value: 0 },
                    imagebox1: { value: "images/24gf-volumeCross.png" }
                })
                break;
            case 1:
                that.sub_func(10)
                break;
        }
    },

    // 按键 +
    add_func: function(data) {
        var that = this
        low_power_timer = false
        var new_value = that.current_backlight
        new_value = new_value + data;
        if (new_value >= 100) {
            new_value = 100;
        }
        that.current_backlight = new_value
        that.setData({ slider2: { value: that.current_backlight } });
        hws.setScreenBrightness(that.current_backlight);
    },

    // 按键 -
    sub_func: function(data) {
        var that = this
        var new_value = that.current_backlight
        new_value = new_value - data;
        if (new_value < 0) {
            new_value = 0;
        }
        that.current_backlight = new_value
        that.setData({ slider2: { value: that.current_backlight } });
        hws.setScreenBrightness(that.current_backlight);
    },

    exit_fun: function() {
        // 同时左滑
        var that = this;
        if (that.exit_app_flg == 1) {
            console.log("exit setting app")
            app.exit();
        }
    }
});