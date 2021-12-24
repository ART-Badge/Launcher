declare interface wifi {
  /**
   * 扫描获取周围的 Wifi 热点信息
   * 扫描成功返回 true 否则返回 false
   */
  scan(): boolean

  /**
   * 监听扫描 WiFi 结束事件
   * @param callback 回调函数
   */
  onScanEvent(callback: Function): void

  /**
   * 连接指定的 WiFi 网络
   * @param param wifi 信息对象{ssid: wifi 设备 ssid, bssid: wifi 设备 bssid, password: wifi 设备密码}
   */
  connect(param: { ssid: string, bssid: string, password: string }): boolean

  /**
   * 监听连接 WiFi 事件
   * @param callback 回调函数
   */
  onConnectEvent(callback: Function): void

  /**
   * 监听网络连接事件
   * @param callback 回调函数
   */
  onNetworkEvent(callback: Function): void

  /**
   * 断开 WiFi 链接
   */
  disconnect(): boolean

  /**
   * 获取已连接的 WiFi信息
   */
  getConnected(): boolean

  /**
   * 销毁 WiFi 对象
   */
  destroy(): void
}
