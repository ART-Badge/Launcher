var dcmlib = require('dcm');
var TP = require('modules/touch.js');
var hws = require("modules/hardware.js");
var Anim = require("modules/transitions.js");

var backlight = 0;
var backlight_Timer = 0;

var Backlight_SetGradual = function() {
    backlight_Timer = setInterval(function() {
        backlight++;
        hws.setScreenBrightness(backlight);
        if (backlight == 10) {
            backlight = 0;
            if (backlight_Timer != 0) {
                clearInterval(backlight_Timer);
                backlight_Timer = 0;
            }
        }
    }, 80);
}

Page({
    menuIndex: 0,

    /* 此方法在第一次显示窗体前发生 */
    onLoad: function(event) {
        var page = this;
        TP.PageTouchInit(page);

        this.setData({
            msg_panel: { hide: true },
        });

        var sysdcm = dcmlib.Open('system');
        /* 绑定字段值修改回调 */
        sysdcm.onChange('ble.mac', function(event) {
            var v = sysdcm.getItem(event) + ''
            page.setData({ QRCode: { version: 4, source: v } });
            page.setData({ BLE_Name: { value: v } });
        })

        /* 绑定天气修改回调 */
        sysdcm.onChange('m.p.id.day_weather', function(event) {
            // var v2 = sysdcm.getItem('m.p.id.metting1')
            if (pm.getPageName() == "Setup_page") {
                page.setData({
                    msg_panel: { hide: false },
                    animatedImage1: "start"
                });
                // 1s超时定时器
                var runTimer = setTimeout(function() {
                    clearTimeout(runTimer);
                    runTimer = 0;
                    page.setData({
                        animatedImage1: { hide: true },
                        msg_panel: { background: "images/receive_success.png" },
                    });
                }, 1000);

                // 1s超时定时器
                var pageTimer = setTimeout(function() {
                    clearTimeout(pageTimer);
                    pageTimer = 0;
                    pm.redirectTo({ url: 'pages/Design_page/Design_page' })
                    sysdcm.offChange('m.p.id.day_weather')
                }, 2000);
            }
        })

        /* 绑定修改回调 */
        sysdcm.onChange('m.p.id.metting5', function(event) {
            var v = sysdcm.getItem(event) + ''
            console.log('@js:id.metting5:' + v)

            if (pm.getPageName() == "Setup_page") {
                page.setData({
                    animatedImage1: { hide: true },
                    msg_panel: { background: "images/receive_success.png" },
                });

                // 1s超时定时器
                var pageTimer = setTimeout(function() {
                    clearTimeout(pageTimer);
                    pageTimer = 0;
                    console.log("@js:now ready redirectTo next page...")
                    pm.redirectTo({ url: 'pages/Design_page/Design_page' })
                }, 1000);
            }
        })
        this.sysdcm = sysdcm;
    },

    /* 此方法展示窗体后发生 */
    onResume: function(event) {
        //调整背光
        Backlight_SetGradual();
    },

    /* 当前页状态变化为显示时触发 */
    onShow: function(event) {
        var v = this.sysdcm.getItem('ble.mac')
        if (v != null) {
            this.setData({ QRCode: { version: 4, source: v } });
            this.setData({ BLE_Name: { value: v } });
        } else {
            this.setData({ QRCode: { version: 3, source: 'unknown' } });
            this.setData({ BLE_Name: { value: 'unknown' } });
        }
    },

    /* 当前页状态变化为隐藏时触发 */
    onHide: function(event) {

    },

    /* 此方法关闭窗体前发生 */
    onExit: function(event) {
        TP.PageTouchUninit(this);
        if (backlight_Timer != 0) {
            clearInterval(backlight_Timer);
            backlight_Timer = 0;
        }
    },

    /* 此方法点击页面时调用 */
    onPageTouch: function(event) { // 按键更新事件
        TP.PageTouchEvent(this, event,
            0,
            0, //R2L 
            0, //L2R
            0,
            0
        );
    },

    enterPage: function(event) {
        switch (event.type) {
            case "press":
                pm.redirectTo({ url: 'pages/Design_page/Design_page' })
                break;
        }
    },

    onCardChange: function(event) {
        this.menuIndex = event.detail.value;
        this.setData({ DotIndicator1: { value: event.detail.value } })
    },
});