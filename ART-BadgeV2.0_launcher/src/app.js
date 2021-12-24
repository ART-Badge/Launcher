var date = new Date();
var hw = require("modules/hardware.js");

is_touch = 0;
choose_ruicon_index = 0;
low_power_timer = true;
button_fb_open = false;
pwr_time = 180;

App({
    data: {
        /* 全局设定 */
        mainPage: 0,
        date: new Date(),
        isSaveMode: false,
        ble_mac: null,
        user_name: null,
        weather: null,
    },

    page: "pages/Setup_page/Setup_page",
    shutdown_Timer: 0,
    backlight_Timer: 0,
    screen_time: 0,

    /* app 加载完成触发该函数 */
    onLaunch: function(e) {
        var that = this;
        hw.getBatteryLevel(); // 采集电压
        that.shutdown_Timer = setInterval(function() {
            if (low_power_timer == true) {
                that.screen_time++;
                now_light = hw.getScreenBrightness();
                // 超时但有触摸
                if (is_touch == 1) {
                    is_touch = 0
                    that.screen_time = 0
                    if (now_light < 9) {
                        // 有触摸但屏幕熄灭了
                        that.Backlight_SetGradual(10, 100, now_light)
                    }
                } else if (now_light > 1 && that.screen_time >= 180) {
                    that.screen_time = 0
                    that.Backlight_SetGradual(1, 100, now_light)
                }
            }
        }, 1000)
    },

    Backlight_SetGradual: function(target, time, now_light) {
        var backlight_Timer = setInterval(function() {
            hw.setScreenBrightness(now_light);
            target == 1 ? now_light-- : now_light++;
            switch (now_light) {
                case 0:
                    now_light = 10;
                    if (backlight_Timer != 0) {
                        clearInterval(backlight_Timer);
                        backlight_Timer = 0;
                    }
                    break;
                case 10:
                    now_light = 1;
                    if (backlight_Timer != 0) {
                        clearInterval(backlight_Timer);
                        backlight_Timer = 0;
                    }
                    break;
            }
        }, time);
    },

    onShow: function(e) {

    },

    onHide: function() {

    },

    /* app 退出触发该函数 */
    onExit: function() {},

});