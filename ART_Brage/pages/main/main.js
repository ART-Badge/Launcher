var pointer_clock = require("modules/pointer_clock.js");
var dcmlib = require('dcm')
var hw = require("hardware");

var data_pool;  /* dcmlib data pool */

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
        var page = this;
        var sysdcm = dcmlib.Open('system')
        /* 绑定职务字段值修改回调 */
        sysdcm.onChange('m.p.id.post', function(event) {
            var v = sysdcm.getItem(event) + ''
            console.log('v: ' + v)
            page.setData({ PostLabel: v });
        })
        /* 绑定姓名字段值修改回调 */
        sysdcm.onChange('m.p.id.name', function(event) {
            var v = sysdcm.getItem(event) + ''
            console.log('v: ' + v)
            page.setData({ NameLabel: v });
        })
        /* 绑定计步数值修改回调 */
        sysdcm.onChange('m.p.sport.step', function(event) {
            var v = sysdcm.getItem(event) + ''
            console.log('v: ' + v)
            page.setData({ StepsLabel: v });
        })
        this.sysdcm = sysdcm

        PageTouchInit(page);
        if(Flag == 0){
            page.setData({ card: { buffer: true, gesture : "NONE", duration: 1 } });
        }else{
            page.setData({ card: { buffer: true, duration: 200} });
        }

        page.setData({ clock_panel: { panel: { page: this, xml: 'panels/pointerClock'} } });
        pointer_clock(page,date);

        page.timer = setInterval(function(){
            // console.log('getRealTime'+ hw.getRealTime())
            // console.log('time'+  page.time)
            page.time = hw.getRealTime() % (12 * 3600);
            // console.log('time'+  page.time)
            page.setData({Clock : {value : page.time}});
            page.time++;
        }, 1000)

        this.msg = Message();
        this.msg.on("sec_tick", this.sec_tick = function (event) {
            page.setData({ heartRate: { value: bpmCount + "" } });
        })

    },

    onHide: function (event) {
    //    notifi_lib.offNotification(this.call_back);
    },

    /* 此方法展示窗体前发生 */
    onShow: function (event) {
        /* 获取职务 */
        var v = this.sysdcm.getItem('m.p.id.post')
        if(v != null) {
            console.log('svp: ' + v)
            this.setData({ PostLabel: v });
        }

        v = this.sysdcm.getItem('m.p.id.name')
        if(v != null){
            console.log('svn: ' + v)
            this.setData({ NameLabel: v });
        }
    },

    /* 此方法关闭窗体前发生 */
    onExit: function (event) {
    //    notifi_lib.offNotification(this.call_back);
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
                    0,
                    function () { that.setData({ card: { next: true } }) },
                    function () { that.setData({ card: { next: false } }) },
                    0,
                    function () { if (that.menuIndex == 0) pm.navigateTo("pages/list_settings/list_settings") }
                )
            } else {
                PageTouchEvent(this, event,
                    0,
                    0,
                    0,
                    0,
                    function () { if (that.menuIndex == 0) pm.navigateTo("pages/list_settings/list_settings") }
                )
            }
           

        } else {
            var touchItem = event.touchs[0];
            if (touchItem.type == "touchend") {
                if (!this.isMove) {
                    switch (that.menuIndex) {
                        case 1:
                            break;
                        case 2:
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
            if (Flag == 0){
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
