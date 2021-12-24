var hws = require("modules/hardware.js");

module.exports = {
    TouchMode: {
        cancel: 0,
        press: 1, // 长按
        move: 2, // 移动
    },

    PageTouchInit: function(page) {
        page.touchStartY = 0; // panel中触摸的Y坐标
        page.touchStartPosition = 0; // page中开始触摸的坐标
        page.touchEndPosition = 0; // page中结束触摸的坐标
        page.touchStatus = this.TouchMode.cancel;
        page.touchTimer = 0;
        page.navigateEnable = true;
    },

    PageTouchUninit: function(page) {
        var that = page;
        if (that.touchTimer != 0) {
            clearTimeout(that.touchTimer);
            that.touchTimer = 0;
        }
    },

    PageTouchEvent: function(page, event, longPress, R2L, L2R, T2D, D2T) {
        var that = page;
        var touchItem = event.touchs[0];

        // 触摸开始时触发
        if (touchItem.type == "touchstart") {
            if (button_fb_open)
                hws.openBeep() // 反馈
            is_touch = 1;
            that.touchStatus = this.TouchMode.press;
            /**长按操作**/
            that.touchStartPosition = {
                x: touchItem.x,
                y: touchItem.y
            };

            if (that.touchTimer != 0) {
                clearTimeout(that.touchTimer);
                that.touchTimer = 0;
            }

            // 1s超时定时器
            that.touchTimer = setTimeout(function() {
                clearTimeout(that.touchTimer);
                that.touchTimer = 0;
                // 若参数为函数则执行
                if (typeof(longPress) == "function") {
                    longPress();
                }
            }, 1500);
        }

        // 触摸短距离移动时触发
        else if (touchItem.type == "touchmove") {
            that.touchStatus = this.TouchMode.move;
            that.touchEndPosition = {
                x: touchItem.x,
                y: touchItem.y
            };
        }
        // 触摸结束时触发
        else if (touchItem.type == "touchend") {
            if (that.touchStatus == this.TouchMode.move) {
                var d_ValueX = that.touchEndPosition.x - that.touchStartPosition.x
                var d_ValueY = that.touchEndPosition.y - that.touchStartPosition.y

                if (d_ValueY > 50 && that.navigateEnable == true) {
                    if (typeof(T2D) == "function") {
                        T2D();
                        is_touch = 1;
                        return;
                    }
                } else if (d_ValueY < -50 && that.navigateEnable == true) {
                    if (typeof(D2T) == "function") {
                        D2T();
                        is_touch = 1;
                        return;
                    }
                }

                if (d_ValueX > 50 && that.navigateEnable == true) {
                    if (typeof(L2R) == "function") {
                        L2R();
                        is_touch = 1;
                        return;
                    }
                } else if (d_ValueX < -50 && that.navigateEnable == true) {
                    if (typeof(R2L) == "function") {
                        R2L();
                        is_touch = 1;
                        return;
                    }
                }
            }

            that.touchStatus = this.TouchMode.cancel;
            if (that.touchTimer != 0) {
                clearTimeout(that.touchTimer);
                that.touchTimer = 0;
            }
        } else if (touchItem.type == "touchcancel") {
            if (that.touchTimer != 0) {
                clearTimeout(that.touchTimer);
                that.touchTimer = 0;
            }
        }
    }
};