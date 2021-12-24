
declare module "hardware" {
  /**
   * 获取时间戳
   */
  export function getRealTime(): number

  /**
   * 设置时间戳
   * @param timestamp
   */
  export function setRealTime(timestamp: number): boolean

  /**
   * 开启监听：realtime 时间戳变化
   * @param callback 注册的onChange回调函数，数据变化后执行
   */
  export function onRealTimeChange(callback: Function): boolean

  /**
   * 取消监听：realtime 时间戳变化
   * @param callback 注册的onChange回调函数，数据变化后执行
   */
  export function offRealTimeChange(callback: Function): boolean

  /**
   * 获取屏幕模式，返回值：Normal：0； AOD: 1；Other：其他
   */
  export function getScreenMode(): number

  /**
   * 设置屏幕模式
   * @param mode Normal：0； AOD: 1；Other：其他
   */
  export function setScreenMode(mode: number): boolean

  /**
   * 打开屏幕
   */
  export function openScreen(): boolean

  /**
   * 关闭屏幕
   */
  export function closeScreen(): boolean

  /**
   * 获取当前（LCD）屏幕状态，屏幕的状态 0：灭屏， 1：亮屏，2：其他
   */
  export function getScreenStatus(): number

  /**
   * 开启监听：屏幕状态改变
   * @param callback
   */
  export function onScreenPowerChange(callback: Function): boolean

  /**
   * 取消监听：屏幕状态改变
   * @param callback
   */
  export function offScreenPowerChange(callback: Function): boolean

  /**
   * 获取屏幕亮度，屏幕亮度值，范围 0 ~ 100。0 最暗，100 最亮
   */
  export function getScreenBrightness(): number

  /**
   * 设置屏幕亮度
   * @param value
   */
  export function setScreenBrightness(value: number): boolean

  /**
   * 打开触摸屏
   */
  export function openTouchPanel(): boolean

  /**
   * 关闭触摸屏
   */
  export function closeTouchPanel(): boolean

  /**
   * 获取当前（TP）触摸屏状态， TP的状态 0：关， 1：开
   */
  export function getTouchPanelStatus(): number

  /**
   * 监听触摸屏（TP）状态改变
   * @param callback
   */
  export function onTouchPanelPowerChange(callback: Function): boolean

  /**
   * 关闭监听触摸屏（TP）状态改变
   * @param callback
   */
  export function offTouchPanelPowerChange(callback: Function): boolean

  /**
   * 振动：使电机转动
   * @param onTime 开启时间 (ms)
   * @param offTime 停止时间 (ms)
   * @param repeat 重复次数
   */
  export function vibrate(onTime: number, offTime: number, repeat: number): void

  /**
   * 系统重启（reboot）
   */
  export function reboot(): void

  /**
   * 系统关机（shutdown）
   */
  export function powerOff(): void

  /**
   * 获取电池电量 0-100
   */
  export function getBatteryLevel(): number

  /**
   * 开启监听：电量变化
   * @param callback
   */
  export function onBatteryLevelChange(callback: Function): boolean

  /**
   * 取消监听：电量变化
   * @param callback
   */
  export function offBatteryLevelChange(callback: Function): boolean

  /**
   * 获取充电状态，0：不充电 1：充电 2：充满
   */
  export function getChargeStatus(): number

  /**
   * 开启监听：充电状态变化
   * @param callback
   */
  export function onBatteryChargeChange(callback: Function): boolean

  /**
   * 关闭监听：充电状态变化
   * @param callback
   */
  export function offBatteryChargeChange(callback: Function): boolean

  /**
   * 获取当前信息，如版本号等
   */
  export function getInfo(): any

  /**
   * 监听按键事件
   * @param callback
   */
  export function onKeyChange(callback: Function): boolean

  /**
   * 关闭监听：按键事件
   * @param callback
   */
  export function offKeyChange(callback: Function): boolean
}
