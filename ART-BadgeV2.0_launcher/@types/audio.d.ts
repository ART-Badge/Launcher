
declare interface audio{
  /**
   * 设置音量。开机默认为上次设定值，断电保存
   * @param volume 整数 0-100
   */
  setVolume(volume: number): void

  /**
   * 获取当前音量
   */
  getVolume (): number

  /**
   * 设置播放音频文件的路径。一般将音频文件放在与 app.js 同级的 resource 文件夹内，那么相对路径为“./resource/xx.mp3”，绝对路径为“/gui/resource/xx.mp3”
   * @param url 音频文件相对于 app.js 的相对路径，也可设为绝对路径
   */
  setSrc (url: string): void

  /**
   * 播放
   */
  play (): void

  /**
   * 跳转到指定位置
   * @param params 指定跳转的事件位置 精确到秒（s）
   */
  seek (params: number): void

  /**
   * 暂停播放
   */
  pause (): void

  /**
   * 停止播放
   */
  stop (): void

  /**
   * 监听音频播放事件
   * @param callBack 回调函数 接受音频文件的时长作为参数
   */
  onPlay (callBack: Function): void

  /**
   * 取消监听
   */
  offPlay (): void

  /**
   * 监听音频暂停事件
   * @param callback 回调函数 接受音频暂停位置作为参数（number类型，单位毫秒（ms））
   */
  onPause (callback: Function): void

  /**
   * 取消监听音频暂停事件
   */
  offPause (): void

  /**
   * 监听音频播放结束事件
   * @param callback 回调函数 没有参数
   */
  onEnded (callback: Function): void

  /**
   * 取消监听音频播放结束事件
   */
  offEnded (): void

  /**
   * 监听音频播放进度事件
   * @param callback 回调函数 音频播放进度作为参数 单位毫秒（ms）
   */
  onTimeUpdate (callback: Function): void

  /**
   * 取消监听音频播放进度事件
   */
  offTimeUpdate (): void

  /**
   * 监听音频播放错误事件
   */
  onError (callback: Function): void

  /**
   * 取消监听音频播放错误事件
   */
  offError (): void

  /**
   * 监听音频完成 seek 操作事件
   */
  onSeeked (callback: Function): void

  /**
   * 取消监听音频完成 seek 操作事件
   */
  offSeeked (): void

  /**
   * 监听音频停止事件
   */
  onStop (callback: Function): void

  /**
   * 取消监听音频停止事件
   */
  offStop (): void

  /**
   * 取消监听所有事件
   */
  offEvent (): void

  /**
   * 销毁 audio 对象
   */
  destroy (): void
}
