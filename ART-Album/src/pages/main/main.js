var TP = require('modules/touch.js');

Page({
    /* 页面加载时触发该函数 */
    onLoad: function(event) { TP.PageTouchInit(this); },

    /* 此方法展示窗体后发生 */
    onResume: function(event) {},

    /* 页面显示时触发该函数 */
    onShow: function(event) {},

    /* 页面隐藏时触发该函数 */
    onHide: function(event) {},

    /* 页面退出时触发该函数 */
    onExit: function(event) { TP.PageTouchUninit(this); },

    onPanelTouch: function(event) {
        TP.PageTouchEvent(this, event,
            0,
            0, //R2L 
            function() { app.exit() }, //L2R
            0,
            0
        );
    },
});