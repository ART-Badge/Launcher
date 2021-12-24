module.exports = {

    formatDuration: function(duration) {
        return duration ? duration * 5 : 180;
    },

    /**
     * 列表 --> 表盘 : 列表 和 表盘 同时放大
     * 表盘 --> 列表 : 表盘 和 列表 同时缩小
     */
    dial2Applist: function(duration) {
        // console.log(" #  dial2Applist >>>>>>   " + duration)
        pm.transitions({
            zoomAnim: { scaleBg: true, exchange: true },
            enterAnim: { type: "zoom-out-in" },
            exitAnim: { type: "zoom-in-out" },
            duration: this.formatDuration(duration),
        });
    },

    /**
     * 列表 --> app : 表盘 和 app 同时放大
     * app --> 列表 : 表盘 和 app 同时缩小
     */
    applist2App: function(duration) {
        // console.log(" #  applist2App >>>>>>   " + duration)
        pm.transitions({
            zoomAnim: { scaleBg: true },
            enterAnim: { type: "zoom-in" },
            exitAnim: { type: "zoom-in-out" },
            duration: this.formatDuration(duration),
        });
    },


    appOrPageEnterAnim: function(enter, duration) {
        if (enter) {
            this.enterAppOrPage(duration);
        } else {
            this.exitAppOrPage(duration);
        }
    },

    /**
     * 目标页：从左到右完成进入
     * 原来页：从左到右完成退出
     */
    exitAppOrPage: function(duration) {
        pm.transitions({
            // zoomAnim: { scaleBg: true, exchange: false },
            enterAnim: { type: "slide-in-left" },
            exitAnim: { type: "zoom-out" },
            duration: this.formatDuration(duration),
        });
    },
    /**
     * 目标页：从右到左完成进入
     * 原来页：从右到左完成退出
     */
    enterAppOrPage: function(duration) {
        pm.transitions({
            // zoomAnim: { scaleBg: true, exchange: false },
            enterAnim: { type: "zoom-in" },
            exitAnim: { type: "zoom-out" },
            duration: this.formatDuration(duration),
        });
    },

}