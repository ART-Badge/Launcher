/* JS API For HardWare */

var dcmlib = require("dcm");
var emqlib = require("emq");

var ID_BEEP_ON = 0x0651;
var ID_BEEP_OFF = 0x0652;
var ID_BEEP_SET_PERIOD_DUTY = 0x0653;

var ID_MUSIC_PLAY = 0x0654;
var ID_MUSIC_SUSPEND = 0x0655;
var ID_MUSIC_NEXT = 0x0656;
var ID_MUSIC_PREV = 0x0657;
var ID_MUSIC_DURT = 0x0658;
var ID_MUSIC_PROG = 0x0659;

var ID_battery_msg = 0x0671;

var emq_beep_channel = "hws.5";

var dcm_pool_name = "hws";

/* 打开蜂鸣器 */
function openBeep() {
    emqlib.send(emq_beep_channel, ID_BEEP_ON);
    //console.log("JS OnBeep be invoked");
    return true;
}

/* 关闭蜂鸣器 */
function closeBeep() {
    emqlib.send(emq_beep_channel, ID_BEEP_OFF);
    //console.log("JS closeBeep be invoked");
    return true;
}


module.exports = {
    closeBeep: closeBeep,
    openBeep: openBeep,
}