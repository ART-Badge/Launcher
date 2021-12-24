var TP = require('modules/touch.js')
var Anim = require("modules/transitions.js");

Page({
    current_icon: 0,

    /* 此方法在第一次显示窗体前发生 */
    onLoad: function(event) {
        TP.PageTouchInit(this);
        // this.setData({ card1: { duration: 30 } });
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
        TP.PageTouchUninit(this);
    },

    onPageTouch: function(event) {
        var that = this;
        TP.PageTouchEvent(this, event,
            0,
            function() { that.enter_display_func() }, //R2L 
            0, //L2R
            0, //T2D
            0 //D2T
        );
    },

    // 按键 右
    enter_display_func: function() {
        console.log("enter display page >>>")
        pm.redirectTo({ url: 'pages/Display_page/Display_page', value: this.current_icon })
    },

    onCardChange: function(event) {
        this.current_icon = event.detail.value
    },
});