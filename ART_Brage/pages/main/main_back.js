var pointer_clock = require("module/pointer_clock.js");
var digit_clock = require("module/digit_clock.js");
var dcmlib = require("dcm")
var notifi_lib = require("notification");

var data_pool; // dcmlib data pool 

var date = GetApp().data.date;
var stepCount = GetApp().data.stepCount;
var bpmCount = GetApp().data.bpmCount;
var Flag = GetApp().data.flag;

var page = {
    inTouch: false,
    menuIndex: 0,
    msg_index: 0,
    /* 此方法在第一次显示窗体前发生 */
    call_back: null,

    onLoad: function (event) {
        var that = this;
        PageTouchInit(that);
        if(Flag == 0){
            that.setData({ card: { buffer: false, gesture : "NONE", duration: 1 } });
        }else{
            that.setData({ card: { buffer: false, duration: 200} });
        }
        
        that.setData({ clock_panel: { panel: { page: this, xml: 'panels/pointerClock'} } });
        pointer_clock(that,date);
        digit_clock(that,date);
    
        data_pool = dcmlib.Open("system")
        data_pool.onChange("realtime", function (event) { // Update time
            var int_time = data_pool.getItem("realtime"); 
            var current_time = new Date(int_time * 1000);
            date.setYear(current_time.getFullYear());
            date.setMonth(current_time.getMonth());
            date.setDate(current_time.getDate());
            date.setHours(current_time.getHours());
            date.setMinutes(current_time.getMinutes());
            date.setSeconds(current_time.getSeconds());

            pointer_clock(that,date);
            digit_clock(that,date);
        })
      
        this.msg = Message();
        this.msg.on("sec_tick", this.sec_tick = function (event) {
            that.setData({ heartRate: { value: bpmCount + "" } });
        })
      
    },

    onHide: function (event) {
        notifi_lib.offNotification(this.call_back);
    },

    /* 此方法展示窗体前发生 */
    onShow: function (event) {

     
    },

    /* 此方法关闭窗体前发生 */
    onExit: function (event) {
        notifi_lib.offNotification(this.call_back);
    },

    onUpdate: function (event) {
        this.inTouch = false
    },

    onPageTouch: function (event) {
        var that = this;
        if (event.touchs[0].type == "touchcancel") {
            this.inTouch = true;
            PageTouchUninit(this);
            return;
        } else if (event.touchs[0].type == "touchmove") {
            this.isMove = true;
        }
        if (that.menuIndex == 0) {
            if(Flag == 0){
                PageTouchEvent(this, event,
                    function () { if (that.menuIndex == 0) pm.navigateTo({ url: "pages/App_more_watchPanel/App_more_watchPanel", value: true }) },
                    function () { that.setData({ card: { next: true } }) },
                    function () { that.setData({ card: { next: false } }) },
                    function () {/* if (that.menuIndex == 0) pm.navigateTo("pages/Top_message/Top_message") */},
                    function () { if (that.menuIndex == 0) pm.navigateTo("pages/appList/appList") }
                )
            }else{
                PageTouchEvent(this, event,
                    function () { if (that.menuIndex == 0) pm.navigateTo({ url: "pages/App_more_watchPanel/App_more_watchPanel", value: true }) },
                    0,
                    0,
                    function () {/* if (that.menuIndex == 0) pm.navigateTo("pages/Top_message/Top_message") */},
                    function () { if (that.menuIndex == 0) pm.navigateTo("pages/appList/appList") }
                )
            }
           

        } else {
            var touchItem = event.touchs[0];
            if (touchItem.type == "touchend") {
                if (!this.isMove) {
                    switch (that.menuIndex) {
                        case 1: // step page
                           // pm.navigateTo("App_heart");
                            break;
                        case 2: // bpm page
                            break;
                        case 3:
                            break;
                        default:
                            break;
                    }
                } else {
                    this.isMove = false;
                }
            }
            if(Flag == 0){
                PageTouchEvent(this, event,
                    0,
                    function () { that.setData({ card: { next: true } }) },
                    function () { that.setData({ card: { next: false } }) },
                    0,
                    0
                )
            }
            
        }
        

    },
    onCardChange: function (event) {
        this.inTouch = false;
        this.menuIndex = event.detail.value;
    }
  
};

Page(page);

page = 0;
