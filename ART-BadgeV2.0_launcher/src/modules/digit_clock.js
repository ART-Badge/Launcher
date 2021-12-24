var digit_clock = function (that, date) {
    var hourStr;
    var minStr;
    var secStr;

    if (date.getHours() < 10) {
        hourStr = "0" + date.getHours()
    } else {
        hourStr = date.getHours()
    }
    if (date.getMinutes() < 10) {
        minStr = "0" + date.getMinutes()
    } else {
        minStr = date.getMinutes()
    }
    if (date.getSeconds() < 10) {
        secStr = "0" + date.getSeconds()
    } else {
        secStr = date.getSeconds()
    }

    console.log("get system date:" + date)
    that.setData({ time_label: { value: hourStr + ":" + minStr, refresh: true } });
    that.setData({ date_label: { value: (date.getMonth() + 1) + "/" + date.getDate(), refresh: true } })
}

var IsLeapYear = function (year) {
    if (((year) % 4 == 0 && (year) % 100 != 0) || (year) % 400 == 0)
        return 1;
    return 0;
}

var getWEEK = function (year, month, week, date) {
    var YY = 0;
    var MM = 0;
    if (month == 1 || month == 2) {
        MM = month + 12;
        YY = year - 1;
    } else {
        MM = month;
        YY = year;
    }
    week = ((date + 2 * MM + 3 * (MM + 1) / 5 + YY + YY / 4 - YY / 100 + YY / 400) % 7) + 1;
}

var TimestampToNormalTime = function (Timestamp) {
    var yr, mon, dy, hr, min, sec;
    var year = 1970;
    var Counter = 0, CounterTemp = 0;
    var Moth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    while (Counter <= Timestamp) {
        CounterTemp = Counter;
        Counter += 31536000; // 加上今年（平年）的秒数
        if (IsLeapYear(year)) {
            Counter += 86400; // 闰年多加一天
        }
        year++;
    }
    yr = year - 1;
    Moth[1] = (IsLeapYear(yr) ? 29 : 28);
    Counter = Timestamp - CounterTemp;       // 记录xx年已过去总秒数
    CounterTemp = parseInt(Counter / 86400); // 记录xx年已过去天数 284
    Counter -= CounterTemp * (24 * 3600);
    // console.log("Counter2: " + Counter)
    hr = parseInt(Counter / 3600);
    min = parseInt(Counter % 3600 / 60);
    sec = parseInt(Counter % 60);
    for (i = 0; i < 12; i++) {
        if (CounterTemp < Moth[i]) {
            mon = i + 1;
            dy = CounterTemp + 1;
            break;
        }
        CounterTemp -= Moth[i];
    }
    return {
        year: yr, month: mon, date: dy, hour: hr, minute: min, second: sec
    }
}

//module.exports = digit_clock;
module.exports = TimestampToNormalTime;
