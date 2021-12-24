var dcmlib = require('dcm')
var TP = require('modules/touch.js')
var hw = require("modules/hardware.js");
var TimestampToNormalTime = require("modules/digit_clock.js");
var Clock_Timer = 0;

var update_dtime = function(Timestamp) {
    var hourStr;
    var minStr;
    var secStr;
    var time_obj = TimestampToNormalTime(Timestamp);
    if (time_obj.hour < 10) {
        hourStr = "0" + time_obj.hour;
    } else {
        hourStr = time_obj.hour;
    }
    if (time_obj.minute < 10) {
        minStr = "0" + time_obj.minute;
    } else {
        minStr = time_obj.minute;
    }
    if (time_obj.second < 10) {
        secStr = "0" + time_obj.second;
    } else {
        secStr = time_obj.second;
    }
    return {
        year: time_obj.year,
        month: time_obj.month,
        date: time_obj.date,
        hourStr: hourStr,
        minStr: minStr,
        secStr: secStr
    }
}

Page({
    menuIndex: 0,
    AgendaIndex: 0,
    ruicon_index: 0,
    adc_update_time: 0,

    ruicon_image1: [
        "images/gif1.png", "images/gif2.png", "images/gif3.png", "images/gif4.png", "images/gif5.png",
        "images/gif6.png", "images/gif7.png", "images/gif8.png", "images/gif9.png", "images/gif10.png"
    ],

    ruicon_image2: [
        "images/gif11.png", "images/gif12.png", "images/gif13.png", "images/gif14.png", "images/gif15.png",
        "images/gif16.png", "images/gif17.png", "images/gif18.png"
    ],

    ruicon_image3: [
        "images/gif20.png", "images/gif21.png", "images/gif22.png", "images/gif23.png", "images/gif24.png",
        "images/gif25.png", "images/gif26.png", "images/gif27.png", "images/gif28.png", "images/gif29.png",
        "images/gif30.png", "images/gif31.png", "images/gif32.png", "images/gif33.png", "images/gif34.png",
        "images/gif35.png"
    ],

    /* 此方法在第一次显示窗体前发生 */
    onLoad: function(event) {
        var page = this;
        TP.PageTouchInit(page);
        page.setData({ battery: { value: hw.getBatteryLevel() } }); // 采集电压

        // 选择形象
        choose_ruicon_index = page.ruicon_index = event;
        page.choose_gificon(this.ruicon_index);

        // card切换速度
        // page.setData({ card: { duration: 20 } });
        // page.setData({ Agenda_card: { duration: 20 } })

        /////////////// DCM START ///////////////
        var sysdcm = dcmlib.Open('system')

        /* 绑定姓名修改回调 */
        sysdcm.onChange('m.p.id.name', function(event) {
            var v = sysdcm.getItem(event) + ''
            if (pm.getPageName() == "Display_page")
                page.setData({ user_name: v });
        });

        /* 绑定天气修改回调 */
        sysdcm.onChange('m.p.id.day_weather', function(event) {
            var v = sysdcm.getItem(event) + ''
            if (pm.getPageName() == "Display_page")
                page.setData({ city: v });
        });

        /* 获取姓名 */
        var v = sysdcm.getItem('m.p.id.name')
        if (v != null) {
            page.setData({ user_name: v });
        }

        /* 获取天气 */
        var v = sysdcm.getItem('m.p.id.day_weather')
        if (v != null) {
            page.setData({ city: v });
        }

        /* 功耗测试！！！！ */
        var v = localStorage.getItem("battery")
        if (v != null) {
            console.log("@js localStorage battery:: ", v)
        }

        this.sysdcm = sysdcm;

        page.time = hw.getRealTime();
        var dt_time = update_dtime(page.time);
        page.setData({
            second_label: { value: dt_time.secStr },
            time_label: { value: dt_time.hourStr + ":" + dt_time.minStr },
            date_label: { value: dt_time.month + "/" + dt_time.date }
        });
        /////////////// DCM END ///////////////

        // 更新时间
        Clock_Timer = setInterval(function() {
            page.time = hw.getRealTime();
            var dt_time = update_dtime(page.time);
            page.adc_update_time++;
            if (page.adc_update_time >= 30) {
                page.adc_update_time = 0;
                if (pm.getPageName() == "Display_page" && page.menuIndex == 0)
                    page.setData({ battery: { value: hw.getBatteryLevel() } }); // 采集电压

                // var last_battery = localStorage.getItem("battery") | 0;
                // if (last_battery != undefined && hw.getBatteryLevel() < 30) {
                //     console.log("battery is low 10%!!")
                //     localStorage.setItem("battery", dt_time.hourStr + ":" + dt_time.minStr);
                // }
            }
            if (pm.getPageName() == "Display_page" && page.menuIndex == 0) {
                page.setData({
                    second_label: { value: dt_time.secStr },
                    time_label: { value: dt_time.hourStr + ":" + dt_time.minStr },
                    date_label: { value: dt_time.month + "/" + dt_time.date }
                });
            }
            page.time++;
        }, 1000)
    },

    choose_gificon: function(index) {
        var that = this
        switch (index) {
            case 0:
                /* 重新设置播放的图片集 */
                that.setData({ animatedImage1: { value: that.ruicon_image1 } });
                break;
            case 1:
                that.setData({ animatedImage1: { value: that.ruicon_image2, interval: 170 } });
                break;
            case 2:
                that.setData({ animatedImage1: { value: that.ruicon_image3, interval: 200 } });
                break;
        }
        that.setData({ animatedImage1: { value: 'start' } });
    },

    /* 此方法展示窗体后发生 */
    onResume: function(event) {},

    /* 当前页状态变化为显示时触发 */
    onShow: function(event) {
        /* 获取姓名 */
        var v = this.sysdcm.getItem('m.p.id.name')
        if (v != null) {
            this.setData({ user_name: v });
        }
    },

    /* 当前页状态变化为隐藏时触发 */
    onHide: function(event) {},

    /* 此方法关闭窗体前发生 */
    onExit: function(event) {
        // Anim.exitAppOrPage(1)
        TP.PageTouchUninit(this);
        if (Clock_Timer != 0) {
            clearInterval(Clock_Timer);
            Clock_Timer = 0;
        }
    },

    onPageTouch: function(event) {
        var that = this
        TP.PageTouchEvent(this, event,
            0,
            0, //R2L 
            0, //L2R
            0, //T2D
            function() { that.enter_applist_func() } //D2T
        );
    },

    enter_applist_func: function() {
        // console.log("enter applist page >>>");
        pm.redirectTo({ url: 'pages/Applist_page/Applist_page' });
    },

    onCardChange: function(event) {
        this.menuIndex = event.detail.value;
        switch (this.menuIndex) {
            case 0:
                this.setData({ animatedImage1: 'start' })
                break;
            default:
                this.setData({ animatedImage1: 'pause' })
                break;
        }
    },

    onAgendaChange: function(event) {
        this.AgendaIndex = event.detail.value;
        this.setData({ animatedImage1: 'pause' })
    },
});