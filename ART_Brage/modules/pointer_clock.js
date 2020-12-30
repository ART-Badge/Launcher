

var pointer_clock =  function (that,date) {
  that.setData({ Clock: { second: { x: 4, y: 96 }, minute: { x: 5, y: 82 }, hour: { x: 10, y: 72 } }});
  that.time = date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds();
  that.setData({ Clock: { value: that.time }});
}


module.exports = pointer_clock;
