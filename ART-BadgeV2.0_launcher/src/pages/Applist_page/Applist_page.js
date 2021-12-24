var TP = require('modules/touch.js');
var Anim = require("modules/transitions.js");

Page({
    menuIndex: 0,
    installedAppList: {},
    install_appsize: 0,

    /* 此方法在第一次显示窗体前发生 */
    onLoad: function(event) {
        // Anim.dial2Applist(5)
        // console.log("now page name:", pm.getPageName())
        // console.log("current page has:", pm.getPages());
        TP.PageTouchInit(this);
        this.setData({ setting_card: { duration: 20 } });
        //
        this.refreshInstalledAppList()
        this.setData({ DotIndicator1: { num: this.install_appsize } })
    },

    onPageTouch: function(event) {
        var page = this
        TP.PageTouchEvent(this, event, 0,
            function() {
                if (page.installedAppList < page.menuIndex) {
                    return
                }
                app.launch("prc://" + page.installedAppList[page.menuIndex].url)
            }, /* 小程序跳转 */
            function() {
                pm.redirectTo({
                    url: 'pages/Display_page/Display_page',
                    value: choose_ruicon_index
                })
            },
            0, /* T2D */
            0 /* D2T */
        )
    },

    /* 刷新已安装的 app 表单 */
    refreshInstalledAppList: function() {
        var obj = app.listAppInstalled();
        // console.dir(obj)
        var arr = []
        for (var i in obj) {
            arr.push(obj[i])
        }
        this.install_appsize = arr.length;
        this.installedAppList = arr
        var that = this;
        that.setData({ setting_card: { empty: true } }); /* 清空 setting_card 中的项（子控件） */
        for (var x in that.installedAppList) {
            this.setData({
                setting_card: { /* setting_card 控件 id */
                    card: {
                        page: this,
                        /* page 属性，值为 panel 所在 page 对象 */
                        items: [ /* items 属性，数组 */ {
                            xml: 'panels/AppListCustomPanel',
                            /* xml 属性，自定义面板 URL */
                            items: [ /* items 属性，数组 */ { /* 添加自定义面板 appListItem 到 setting_card 中，并修改 id*/
                                AppIcon: { background: that.installedAppList[x].url + "/" + that.installedAppList[x].icon },
                                AppName: { value: that.installedAppList[x].name },
                                // AppButton: { id: that.installedAppList[x].id }
                            }]
                        }]
                    }
                }
            })
        }
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
        // Anim.enterAppOrPage(1)
        TP.PageTouchUninit(this);
    },

    onCardChange: function(event) {
        this.menuIndex = event.detail.value;
        this.setData({ DotIndicator1: { value: event.detail.value } })
    },
});