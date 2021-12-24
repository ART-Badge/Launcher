declare interface untar{
  /**
   * 解压本地 tar 包
   * @param tar tar 包路径
   * @param dir 指定文件解压路径
   * @param success 接口调用成功回调函数（可选）
   * @param fail 接口调用失败回调函数（可选）
   * @param complete 接口调用完成回调函数 调用成功或失败都会执行（可选）
   */

  /**
   * 监听解压进度变化事件
   * @param callback 回调函数
   */
  onProgressUpdate(callback:Function): void

  /**
   * 取消监听解压进度变化事件
   */
  offProgressUpdate(): void
}
