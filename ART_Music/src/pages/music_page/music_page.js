var TP = require('modules/touch.js')
var hws = require("modules/hardware.js");

Page({
    index: 0,
    play_mc_flag: false,
    process_data: 0, //播放进度条    
    process_data2: 0,
    music_Timer: 0,
    procerss_data: 0,
    music_number: 7,

    music_image1: ["images/music1.png"],

    music_image2: [
        "images/badapple1.png", "images/badapple2.png", "images/badapple3.png", "images/badapple4.png", "images/badapple5.png",
        "images/badapple6.png", "images/badapple7.png", "images/badapple8.png", "images/badapple9.png",
        "images/badapple11.png", "images/badapple12.png", "images/badapple14.png",
        "images/badapple16.png", "images/badapple17.png", "images/badapple18.png", "images/badapple20.png",
        "images/badapple21.png", "images/badapple22.png", "images/badapple23.png", "images/badapple24.png", "images/badapple25.png",
        "images/badapple26.png", "images/badapple28.png", "images/badapple29.png",
        "images/badapple31.png", "images/badapple32.png", "images/badapple33.png", "images/badapple34.png",
        "images/badapple36.png", "images/badapple37.png", "images/badapple39.png", "images/badapple40.png",
        "images/badapple42.png", "images/badapple43.png", "images/badapple45.png",
        "images/badapple46.png", "images/badapple48.png", "images/badapple49.png",
        "images/badapple51.png", "images/badapple52.png", "images/badapple54.png", "images/badapple55.png",
        "images/badapple56.png", "images/badapple57.png", "images/badapple58.png", "images/badapple59.png", "images/badapple60.png",
        "images/badapple61.png", "images/badapple62.png", "images/badapple63.png", "images/badapple65.png",
        "images/badapple66.png", "images/badapple67.png",
    ],

    music_image3: ["images/music3.png"],

    music_image4: ["images/music4.png"],

    music_image5: ["images/music5.png"],

    music_image6: ["images/music6.png"],

    music_image7: ["images/music7.png"],

    musicName: [
        { name: "极乐净土" },
        { name: "bad apple" },
        { name: "超级玛丽" },
        { name: "天空之城" },
        { name: "帝国进行曲" },
        { name: "黑人TG" },
        { name: "千本樱" },
    ],

    /***************music List Item******************/

    /* 此方法在第一次显示窗体前发生 */
    onLoad: function(event) {
        TP.PageTouchInit(this);
        this.setData({ animatedImage1: { value: this.music_image1 } });
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
        hws.stopmusic();
        hws.Reset_music();
        TP.PageTouchUninit(this);
        if (this.music_Timer) {
            clearInterval(this.music_Timer);
            this.music_Timer = 0;
        }
    },

    onPageTouch: function(event) {
        var that = this
        TP.PageTouchEvent(this, event,
            0,
            function() { that.pause_play(that.play_mc_flag = !that.play_mc_flag) },
            function() { app.exit() }, //L2R
            function() { that.pre_music() },
            function() { that.next_music() }
        );
    },

    // 上一首
    pre_music: function() {
        this.play_mc_flag = true;
        this.index--;
        this.index < 0 ? this.index = this.music_number - 1 : null;
        // 上一首
        hws.play_prev_music(1);
        if (this.music_Timer) {
            clearInterval(this.music_Timer);
            this.music_Timer = 0;
        }
        // 播放音乐
        this.pause_play(true);
        // 获取音乐时长
        var music_length = hws.getmusic_duration();
        this.choose_gif_picture(this.index);
        this.setData({
            music_lable: { value: music_length },
            title: { value: this.musicName[this.index].name },
            pre_btn: { value: "images/pre_mc_on.png" },
            next_btn: { value: "images/next_mc.png" },
        });
    },

    // 下一首
    next_music: function() {
        this.play_mc_flag = true;
        this.index++;
        this.index > this.music_number - 1 ? this.index = 0 : null;
        // 下一首
        hws.play_next_music(0);
        if (this.music_Timer) {
            clearInterval(this.music_Timer);
            this.music_Timer = 0;
        }
        // 播放音乐
        this.pause_play(true);
        // 获取音乐时长
        var music_length = hws.getmusic_duration();
        this.choose_gif_picture(this.index);
        this.setData({
            music_lable: { value: music_length },
            title: { value: this.musicName[this.index].name },
            next_btn: { value: "images/next_mc_on.png" },
            pre_btn: { value: "images/pre_mc.png" },
            progressbar1: { value: 0 }
        });
    },

    // 暂停播放
    pause_play: function(value) {
        if (value == true) {
            this.procerss_data = 0
            hws.playmusic();
            if (this.music_Timer) {
                clearInterval(this.music_Timer);
                this.music_Timer = 0;
            }
            this.procress_run();
            // 获取音乐时长
            var music_length = hws.getmusic_duration();
            this.setData({
                play_btn: { norImg: "images/start.png" },
                music_lable: { value: music_length },
                animatedImage1: 'start'
            });
        } else {
            this.setData({
                play_btn: { norImg: "images/stop.png" },
                animatedImage1: 'pause'
            });
            hws.stopmusic();
            if (this.music_Timer) {
                clearInterval(this.music_Timer);
                this.music_Timer = 0;
            }
        }
    },

    procress_run: function() {
        var that = this;
        that.music_Timer = setInterval(function() {
            /*刷新进度条*/
            var time = parseInt(hws.getmusic_progress());
            that.process_data = time;
            // 播放完成
            if (that.process_data >= 100) {
                that.play_mc_flag = false;
                that.setData({
                    play_btn: { norImg: "images/stop.png" },
                    progressbar1: { value: that.process_data }
                });
                if (that.music_Timer) {
                    clearInterval(that.music_Timer);
                    that.music_Timer = 0;
                }
            } else {
                /*更新progressbar的进度和label的显示文本*/
                that.setData({ progressbar1: { value: that.process_data } });
            }
        }, 750)
    },

    choose_gif_picture: function(index) {
        var that = this
        switch (index) {
            case 0:
                /* 重新设置播放的图片集 */
                that.setData({ animatedImage1: { value: that.music_image1 } });
                break;
            case 1:
                that.setData({ animatedImage1: { value: that.music_image2 } });
                that.setData({ animatedImage1: { value: 'start' } });
                break;
            case 2:
                that.setData({ animatedImage1: { value: that.music_image3 } });
                break;
            case 3:
                that.setData({ animatedImage1: { value: that.music_image4 } });
                break;
            case 4:
                that.setData({ animatedImage1: { value: that.music_image5 } });
                break;
            case 5:
                that.setData({ animatedImage1: { value: that.music_image6 } });
                break;
            case 6:
                that.setData({ animatedImage1: { value: that.music_image7 } });
                break;
        }
    }
});