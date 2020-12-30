var notifi_lib = require("notification");

var page = {
    call_back_name:"msgpage_call_back",
    call_back: null,

    /* 此方法在第一次显示窗体前发生 */
    onLoad: function (event) {
        PageTouchInit(this);
        var msg = event;
        this.loadMsg(msg);
        
        var that = this;
        notifi_lib.onNotification(this.call_back = function(event) {   
            var msg_obj = event
            that.loadMsg(msg_obj);
        });

    },

    loadMsg: function (msg) {
        this.setData({title_lab: { value: msg.title}, icon_image: { value : msg.icon_path} });
        if (msg.msg_type == "TextMsg")
            this.setData({content_lab: { hide : false, value : msg.text_content}, content_image: { hide : true}});
        else if(msg.msg_type == "PictureMsg")
            this.setData({content_image: { value : msg.image_context_path, hide : false}, content_lab: { hide : true}});
        else if(msg.msg_type == "ScheduleMsg") {
            // do something
        }
    },

    /* 此方法展示窗体后发生 */
    onResume: function (event) {

    },

    /* 当前页状态变化为显示时触发 */
    onShow: function (event) {
      
    },

    /* 当前页状态变化为隐藏时触发 */
    onHide: function (event) {

    },

    /* 此方法关闭窗体前发生 */
    onExit: function (event) {
        notifi_lib.offNotification(this.call_back);
        PageTouchUninit(this);
    },

    onPageTouch:function(event){
        PageTouchEvent(this, event,
            0,
            0,
            function(){ pm.navigateBack()},
            0,
            0
        );
    },
};

Page(page);

page = 0;
