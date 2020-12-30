var notifi_lib = require("notification");
var msg_items = [];

var page = {
    anim: 0,
    touchStartY : 0, // panel中触摸的Y坐标
    touchStartX : 0, // panel中触摸的Y坐标
    touchStartPosition : 0,// page中开始触摸的坐标
    touchEndPosition : 0, // page中结束触摸的坐标
    direction: false,
    title:"",

    msg_items: [],
    call_back: null,
    /* 此方法在第一次显示窗体前发生 */
    onLoad:function(event){
        PageTouchInit(this);
        
    },
    refreshMsg: function () {
        msgs = notifi_lib.getMsgs("NotRead");
        for (var i = 0; i < msgs.length; ++i) {
            var item = msgs[i];
            var index = msg_items.indexOf(item);
            if (index == -1)
            {
                msg_items.push(item);//
            }
        }
        this.loadMsg(msg_items);

    },
    loadMsg: function (items) {
        this.setData({ listctrl: { empty: true } });
        var array = [];
        for (var i = 0, len = items.length; i < len; i++) {
            var data = {};
            var content = "";
            var const_length = 18;
            if (items[i].text_content.length > const_length)
                content = items[i].text_content.substring(0, const_length) + "...";
            else
                content = items[i].text_content;

            data["id"] = items[i].id;
            data["content"] = { id: "content" + i, value: content};
            data["icon"] = { id: "icon" + i, value: items[i].icon_path };
            data["title"] = { id: "title" + i, value: items[i].title };
            data["button1"]={id: "btn_" + items[i].id, value:""}
            array.push(data);
        }

        this.setData({ listctrl: { list: { page: this, items: [{ xml: 'Panels/Top_message_item', items: array }] } } })
    },

     /* 当前页状态变化为隐藏时触发 */
    onHide: function (event) {
        notifi_lib.offNotification(this.call_back);
    },

    /* 此方法展示窗体前发生 */
    onShow:function(event){
        var that = this;
        notifi_lib.onNotification(this.call_back = function(event) {   
            var count =  notifi_lib.getCount("NotRead");
            if (count > 0)
                that.refreshMsg();
        });
        that.refreshMsg();
    },

    /* 此方法关闭窗体前发生 */
    onExit:function(event){
        PageTouchUninit(this);
    },
    onPageTouch: function (event) {
        PageTouchEvent(this, event,
            0,
            0,
            function () { pm.navigateBack() },
            0,
            0
        )
    },
    
    // 添加之后不能更新
    onSwitch:function(event) {

    },
    onClick: function (event) {
        console.dir(event);
        var id =  event.target.id
        var str_id = id.substring(4, id.length);
        for (var index = 0; index < msg_items.length; index ++)
        {
            if (msg_items[index].id == str_id)
            {
                item = msg_items[index];
                notifi_lib.updateMsgReadStatus(str_id);
                msg_items.splice(index, 1); 
                notifi_lib.offNotification(this.call_back);
                pm.navigateTo({url : 'MessagePage/MessagePage', value : item})
                break;  
            }
        }

    },
};

Page(page);

page = 0;
