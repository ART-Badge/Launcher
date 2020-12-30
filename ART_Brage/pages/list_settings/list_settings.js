var page = {
    menuIndex: 0,
    /* 此方法在第一次显示窗体前发生 */
    onLoad:function(event){
        PageTouchInit(this);
        this.refreshInstalledAppList();
    },
    onResume:function(event){
    },

    /* 此方法展示窗体前发生 */
    onShow:function(event){
    },

    /* 此方法关闭窗体前发生 */
    onExit:function(event){ 
        PageTouchUninit(this);
    },

    onPageTouch:function(event){
        var page = this
        PageTouchEvent(this, event, 0,
            function() {
                if (page.installedAppList < page.menuIndex) {
                    return
                }
                app.launch("prc://" + page.installedAppList[page.menuIndex].url)
            },                                              /* 小程序跳转 */
            function() {pm.navigateTo("pages/main/main")},  /* L2R */
            0,                                              /* T2D */
            0                                               /* D2T */
        )
    },

    /* 刷新已安装的 app 表单 */
    refreshInstalledAppList: function(){
        var obj = app.listAppInstalled()
        var arr = []
        for (var i in obj) {
            arr.push(obj[i])
        }
        this.installedAppList = arr
        var that = this;
        that.setData({ setting_card: { empty: true } });            /* 清空 setting_card 中的项（子控件） */
        for (var x in that.installedAppList) {
            this.setData({
                setting_card: {                                     /* setting_card 控件 id */
                    card: {
                        page: this,                                 /* page 属性，值为 panel 所在 page 对象 */
                        items: [                                    /* items 属性，数组 */
                            {
                                xml: 'panels/AppListCustomPanel',   /* xml 属性，自定义面板 URL */
                                items: [                            /* items 属性，数组 */
                                    {                               /* 添加自定义面板 appListItem 到 setting_card 中，并修改 id*/
                                        appListItem: {
                                            id: that.installedAppList[x].id,
                                            gesture: "TAP | LONGPRESS",
                                            refresh: true
                                        },
                                        AppIcon: { background: that.installedAppList[x].url + "/" + that.installedAppList[x].icon },
                                        AppName: { value: that.installedAppList[x].name },
                                        AppButton : { id: that.installedAppList[x].id }
                                    }]
                            }]
                    }
                }
            })
        }
    },

    onCardChange : function(event){
        this.menuIndex = event.detail.value;
    },
};

Page(page);

page = 0;
