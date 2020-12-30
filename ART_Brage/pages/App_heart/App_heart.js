var page = {
    rateDate: [32, 60, 19, 78, 56],
    dataTimer: 0,
    heartData:[],
    length:45,
    /* 此方法在第一次显示窗体前发生 */
    onLoad: function (event) {
        PM_REQUEST(1);
        var that = this;
        PageTouchInit(this);
    },

    /* 此方法展示窗体前发生 */
    onShow: function (event) {
        var that = this,start = null;
        this.msg = Message();
        this.msg.on("sec_tick", this.sec_tick = function (event) {
            that.setData({ heartRate: { value: bpmCount + "" } });
        })
        for (var i = 0; i < 5; i++) {
            var j = i + 1;
            var data = {};
            date["progressbar" + j] = { value: this.rateDate[i] };
            this.setData(date);
            date["rate" + j] = { value: this.rateDate[i] + "%" };
            this.setData(date);
        }

        for(var m=0;m<260;m++){
            var v = 99 - 25 - 50 * Math.random();
            that.heartData.push(v);
        }

        function renderFrame(timestamp) {
            that.drawCanvas();
            if(that.length<= 286){
                that.requestAnimationFrame(renderFrame);
                that.length += 50;
            }
        }

        that.requestAnimationFrame(renderFrame)

       
    },

    /* 此方法关闭窗体前发生 */
    onExit: function (event) {
        PM_REQUEST(0);
        this.msg.removeListener("sec_tick", this.sec_tick);
        PageTouchUninit(this);
    },

    onPageTouch: function (event) {
        PageTouchEvent(this, event,
            0,
            0,
            function () { pm.navigateBack() },
            0,
            0
        );
    },
    drawCanvas: function () {
        var that = this;
        var hours = date.getHours();
        this.setData({ Canvas: { buffer: true } });
        var ctx = pm.createCanvasContext('Canvas', this);
        /*线条设定*/
        ctx.setFillStyle('white')
        ctx.setLineWidth(0.5)
        ctx.setLineCap('round');

        ctx.moveTo(30, 10)     //线条起点
        ctx.lineTo(330, 10)    //线条终点

        ctx.moveTo(30, 40)     //线条起点
        ctx.lineTo(330, 40)    //线条终点

        ctx.moveTo(30, 70)     //线条起点
        ctx.lineTo(330, 70)    //线条终点
        ctx.stroke()

        ctx.setLineWidth(0.5)
        ctx.moveTo(30, 100)     //线条起点
        ctx.lineTo(330, 100)    //线条终点
        ctx.stroke()

        this.setData({
            lbl_hour1: ((hours - 1) % 24) + ":00",
            lbl_hour2: (hours % 24) + ":00",
            lbl_hour3: ((hours + 1) % 24) + ":00"
        })

        for (var i = 0; i < 11; i++) {
            ctx.moveTo(175 + i * 12, 100)     //线条起点
            ctx.lineTo(175 + i * 12, 105)     //线条终点
            ctx.moveTo(175 - i * 12, 100)     //线条起点
            ctx.lineTo(175 - i * 12, 105)     //线条终点
            ctx.stroke()
        }

        ctx.setFillStyle('#eb066f')
        ctx.setLineWidth(1.5)
        ctx.setLineCap('round')
        
        for (var j = 65; j <= that.length; j += 10) {
            var index = (j - 65)/10;
            if (j == 65) { 
                ctx.moveTo(j, that.heartData[index]) 
            }else { 
                ctx.lineTo(j, that.heartData[index]) 
            } //线条终点
           
        }
        ctx.stroke();
        ctx.draw();
       
    }
};

Page(page);

page = 0;
