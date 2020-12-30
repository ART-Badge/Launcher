var digit_clock = function (that,date) {
  var hourStr;
  var minStr;
  var secStr;
  if(date.getHours() < 10)
  {
      hourStr = "0" + date.getHours()
  }else{
      hourStr = date.getHours()
  }
  if(date.getMinutes() < 10)
  {
      minStr = "0" + date.getMinutes()
  }else{
      minStr = date.getMinutes()
  }
  if(date.getSeconds() < 10)
  {
    secStr = "0" + date.getSeconds()
  }else{
    secStr = date.getSeconds()
  }
  that.setData({ time_label : { value : hourStr + ":" + minStr, refresh : true}});
  that.setData({ date_label : { value : date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate(), refresh : true}})
}

module.exports = digit_clock;