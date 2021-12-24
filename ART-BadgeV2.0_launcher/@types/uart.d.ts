declare interface uart {
  /**
   * 设置串口接受数据接口函数
   * @param func
   */
  onData(func: Function): void

  /**
   * 发送数据
   * @param buffer buffer 类型数据
   */
  write(buffer: Buffer): void

  /**
   * 关闭串口设备
   */
  close(): void
}
