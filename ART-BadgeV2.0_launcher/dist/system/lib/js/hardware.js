"use strict";
var dcmlib = require("dcm"),
    emqlib = require("emq");

function _interopDefaultLegacy(e) { return e && "object" == typeof e && "default" in e ? e : { default: e } }
var data_pool, dcmlib__default = _interopDefaultLegacy(dcmlib),
    emqlib__default = _interopDefaultLegacy(emqlib),
    ID_LCD_ON = 1569,
    ID_LCD_OFF = 1570,
    ID_LCD_SET_MODE = 1571,
    ID_LCD_SET_BRIGHTNESS = 1572,
    ID_TP_ON = 1585,
    ID_TP_OFF = 1586,
    ID_REBOOT = 1601,
    ID_SHUTDOWN = 1602,
    ID_VIBRATE = 1603,
    emq_key_channel = "key.0",
    emq_tp_channel = "hws.2",
    emq_lcd_channel = "hws.3",
    emq_pm_channel = "hws.4",
    dcm_pool_name = "hws",
    realtime_dcm_name = "realtime",
    lcdpower_dcm_name = "lcdpower",
    lcdmode_dcm_name = "lcdmode",
    brightness_dcm_name = "brightness",
    tppower_dcm_name = "tppower",
    battery_dcm_name = "battery",
    charge_dcm_name = "charge",
    vibstart_dcm_name = "vibstart",
    vibstop_dcm_name = "vibstop",
    vibcount_dcm_name = "vibcount",
    sysinfo_dcm_name = "sysinfo",
    key_change_arr = [],
    screen_func_arr = [],
    touch_func_arr = [],
    battery_func_arr = [],
    charge_func_arr = [],
    realtime_func_arr = [];

function emqHWOnChange(t, _, e) { var n = { fun: null, ch: null, ep: null }; return null != t && (null != _ && (null != e && (t.forEach(function(e, n, a) { if (_ == t[n].fun) return !0 }), n.fun = _, n.ch = e, n.ep = emqlib__default.default.createEP(), n.ep.onMessage(e, _), t.push(n), !0))) }

function emqHWOffChange(t, _) { return null != t && (null != _ && (t.forEach(function(e, n, a) { if (_ == t[n].fun) return t[n].ep.offMessage(t[n].ch, t[n].fun), t.splice(n, 1), !0 }), !0)) }

function dcmHWOnChange(t, _, e) { var n = { name: null, fun: null, pool: null }; return null != t && (null != _ && (null != e && (t.forEach(function(e, n, a) { if (_ == t[n].fun) return !0 }), n.name = e, n.fun = _, n.pool = dcmlib__default.default.Open(dcm_pool_name), n.pool.onChange(e, _), t.push(n), !0))) }

function dcmHWOffChange(_, l) { return null != _ && (null != l && (_.forEach(function(e, n, a) { if (l == _[n].fun) { var t = _[n].name; return _[n].pool.offChange(t), _.splice(n, 1), !0 } }), !0)) }

function getRealTime() { var e = (data_pool = dcmlib__default.default.Open(dcm_pool_name)).getItem(realtime_dcm_name); return null != e && "undefine" != e || (data_pool.setItem(realtime_dcm_name, "1601366586"), e = data_pool.getItem(realtime_dcm_name)), e }

function setRealTime(e) { var n = (data_pool = dcmlib__default.default.Open(dcm_pool_name)).getItem(realtime_dcm_name); return null != n && "undefine" != n || data_pool.setItem(realtime_dcm_name, e), !0 }

function onRealTimeChange(e) { return dcmHWOnChange(realtime_func_arr, e, realtime_dcm_name) }

function offRealTimeChange(e) { return dcmHWOffChange(realtime_func_arr, e) }

function getScreenStatus() { var e = (data_pool = dcmlib__default.default.Open(dcm_pool_name)).getItem(lcdpower_dcm_name); return null != e ? e : 0 }

function getScreenMode() { var e = (data_pool = dcmlib__default.default.Open(dcm_pool_name)).getItem(lcdmode_dcm_name); return null != e ? (console.log("getScreenMode:" + e), e) : null }

function setScreenMode(e) { return (data_pool = dcmlib__default.default.Open(dcm_pool_name)).setItem(lcdmode_dcm_name, e), emqlib__default.default.send(emq_lcd_channel, ID_LCD_SET_MODE), console.log("[hardware.js] setScreenMode"), 0 }

function openScreen() { return emqlib__default.default.send(emq_lcd_channel, ID_LCD_ON), !0 }

function closeScreen() { return emqlib__default.default.send(emq_lcd_channel, ID_LCD_OFF), !0 }

function onScreenStatusChange(e) { return dcmHWOnChange(screen_func_arr, e, lcdpower_dcm_name) }

function offScreenStatusChange(e) { return dcmHWOffChange(screen_func_arr, e) }

function getScreenBrightness() { var e = (data_pool = dcmlib__default.default.Open(dcm_pool_name)).getItem(brightness_dcm_name); return null != e ? e : 0 }

function setScreenBrightness(e) { return (data_pool = dcmlib__default.default.Open(dcm_pool_name)).setItem(brightness_dcm_name, e), emqlib__default.default.send(emq_lcd_channel, ID_LCD_SET_BRIGHTNESS), console.log("setScreenBrightness:" + e), !0 }

function getTouchPanelStatus() { var e = (data_pool = dcmlib__default.default.Open(dcm_pool_name)).getItem(tppower_dcm_name); return null != e ? e : 0 }

function openTouchPanel() { return emqlib__default.default.send(emq_tp_channel, ID_TP_ON), !0 }

function closeTouchPanel() { return emqlib__default.default.send(emq_tp_channel, ID_TP_OFF), !0 }

function onTouchPanelStatusChange(e) { return dcmHWOnChange(touch_func_arr, e, tppower_dcm_name) }

function offTouchPanelStatusChange(e) { return dcmHWOffChange(touch_func_arr, e) }

function getBatteryLevel() { var e = (data_pool = dcmlib__default.default.Open(dcm_pool_name)).getItem(battery_dcm_name); return null != e ? e : 0 }

function onBatteryLevelChange(e) { return dcmHWOnChange(battery_func_arr, e, battery_dcm_name) }

function offBatteryLevelChange(e) { return dcmHWOffChange(battery_func_arr, e) }

function getChargeStatus() { var e = (data_pool = dcmlib__default.default.Open(dcm_pool_name)).getItem(charge_dcm_name); return null != e ? e : 0 }

function onChargeChange(e) { return dcmHWOnChange(charge_func_arr, e, charge_dcm_name) }

function offChargeChange(e) { return dcmHWOffChange(charge_func_arr, e) }

function reboot() { return emqlib__default.default.send(emq_pm_channel, ID_REBOOT), !0 }

function powerOff() { return emqlib__default.default.send(emq_pm_channel, ID_SHUTDOWN), !0 }

function vibrate(e, n, a) { return (data_pool = dcmlib__default.default.Open(dcm_pool_name)).setItem(vibstart_dcm_name, e), data_pool.setItem(vibstop_dcm_name, n), data_pool.setItem(vibcount_dcm_name, a), emqlib__default.default.send(emq_pm_channel, ID_VIBRATE), !0 }

function onKeyChange(e) { return emqHWOnChange(key_change_arr, e, emq_key_channel) }

function onItemKeyChange(e, n) { return emqHWOnChange(key_change_arr, n, e) }

function offKeyChange(e) { return emqHWOffChange(key_change_arr, e) }

function getInfo() { var e = (data_pool = dcmlib__default.default.Open(dcm_pool_name)).getItem(sysinfo_dcm_name); return null != e ? e : null }
var hardware = { getRealTime: getRealTime, setRealTime: setRealTime, onRealTimeChange: onRealTimeChange, offRealTimeChange: offRealTimeChange, getScreenStatus: getScreenStatus, getScreenMode: getScreenMode, setScreenMode: setScreenMode, openScreen: openScreen, closeScreen: closeScreen, onScreenStatusChange: onScreenStatusChange, offScreenStatusChange: offScreenStatusChange, getScreenBrightness: getScreenBrightness, setScreenBrightness: setScreenBrightness, getTouchPanelStatus: getTouchPanelStatus, openTouchPanel: openTouchPanel, closeTouchPanel: closeTouchPanel, onTouchPanelStatusChange: onTouchPanelStatusChange, offTouchPanelStatusChange: offTouchPanelStatusChange, getBatteryLevel: getBatteryLevel, onBatteryLevelChange: onBatteryLevelChange, offBatteryLevelChange: offBatteryLevelChange, getChargeStatus: getChargeStatus, onChargeChange: onChargeChange, offChargeChange: offChargeChange, reboot: reboot, powerOff: powerOff, vibrate: vibrate, onKeyChange: onKeyChange, onItemKeyChange: onItemKeyChange, offKeyChange: offKeyChange, getInfo: getInfo };
module.exports = hardware;