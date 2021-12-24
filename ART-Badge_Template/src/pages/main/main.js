var TP = require('modules/touch.js')

Page({
    /* 页面加载时触发该函数 */
    onLoad: function(event) {
        TP.PageTouchInit(this)
    },

    /* 此方法展示窗体后发生 */
    onResume: function(event) {},

    /* 页面显示时触发该函数 */
    onShow: function(event) {},

    /* 页面隐藏时触发该函数 */
    onHide: function(event) {},

    /* 页面退出时触发该函数 */
    onExit: function(event) {
        TP.PageTouchUninit(this)
    },


    onPageTouch: function(event) {
        TP.PageTouchEvent(this, event,
            0,
            0,
            function() { app.exit() }, //右滑，退出并关闭 app
            0,
            0
        )
    },
});