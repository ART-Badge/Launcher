declare interface FileSystemManager {
  /**
   * 判断文件/目录是否存在
   * @param path 需要判断的文件/目录的路径
   * @param success 调用成功回调函数（可选）
   * @param fail 调用失败回调函数（可选，接受错误信息作为参数）
   * @param complete 调用结束回调函数（成功或失败都会执行，可选）
   */
  access(path: string, success?: Function, fail?: Function, complete?: Function): void

  /**
   * 在指定文件末尾追加内容，如果文件不存在则创建文件后写入
   * @param path 文件路径
   * @param data 需要写入的内容，
   * @param success 写入成功回调函数（可选）
   * @param fail 写入失败回调函数（可选）
   * @param complete 调用完成回调函数（成功或失败都会调用，可选）
   */
  appendFile(path: string, data: string | Buffer, success?: Function, fail?: Function, complete?: Function): void

  /**
   * 获取已保存的本地文件列表
   * @param success 调用成功回调函数（可选）
   * @param fail 调用失败回调函数（可选，接受错误信息作为参数）
   * @param complete 调用结束回调函数（成功或失败都会执行，可选）
   */
  // getFileList(success?: Function, fail?: Function, complete?: Function): []

  /**
   * 删除文件
   * @param path 要删除的文件路径
   * @param success 调用成功回调函数（可选）
   * @param fail 调用失败回调函数（可选，接受错误信息作为参数）
   * @param complete 调用结束回调函数（成功或失败都会执行，可选）
   */
  // removeFile(path: string, success?: Function, fail?: Function, complete?: Function)

  /**
   * 复制文件。如果目标路径下存在同名文件则进行覆盖
   * @param srcPath 源文件路径
   * @param targetPath 目标文件路径
   * @param success 调用成功回调函数（可选）
   * @param fail 调用失败回调函数（可选，接受错误信息作为参数）
   * @param complete 调用结束回调函数（成功或失败都会执行，可选）
   */
  copyFile(srcPath: string, targetPath: string, success?: Function, fail?: Function, complete?: Function): void

  /**
   * 获取文件信息
   * @param path 文件路径
   * @param success 调用成功回调函数（可选）
   * @param fail 调用失败回调函数（可选，接受错误信息作为参数）
   * @param complete 调用结束回调函数（成功或失败都会执行，可选）
   */
  getFileInfo(path: string, success?: Function, fail?: Function, complete?: Function): void

  /**
   * 创建目录
   * @param path 需要创建目录的路径
   * @param recursive 是否在递归创建该目录的上级目录后再创建该目录（选填，默认 false 不递归）
   * @param success 调用成功回调函数（可选）
   * @param fail 调用失败回调函数（可选，接受错误信息作为参数）
   * @param complete 调用结束回调函数（成功或失败都会执行，可选）
   */
  mkdir(path: string, recursive?: boolean, success?: Function, fail?: Function, complete?: Function): void

  /**
   * 读取目录内文件列表
   * @param path 需要读取的目录路径
   * @param success 调用成功回调函数（可选）
   * @param fail 调用失败回调函数（可选，接受错误信息作为参数）
   * @param complete 调用结束回调函数（成功或失败都会执行，可选）
   */
  readdir(path: string, success?: Function, fail?: Function, complete?: Function): void

  /**
   * 读取文件
   * @param path 文件路径
   * @param encoding 指定读取文件的字符编码，默认为使用 Buffer 读取
   * @param position 从文件指定位置开始读，如果不指定，则从文件头开始读（选填）
   * @param length 指定文件的读取长度，如果不指定，则读到文件末尾（选填）
   * @param success 调用成功回调函数（可选）
   * @param fail 调用失败回调函数（可选，接受错误信息作为参数）
   * @param complete 调用结束回调函数（成功或失败都会执行，可选）
   */
  readFile(path: string, encoding?: string, position?: number, length?: number, success?: Function, fail?: Function, complete?: Function): void

  /**
   * 重命名文件
   * @param oldPath 原文件路径
   * @param newPath 新文件路径
   * @param success 调用成功回调函数（可选）
   * @param fail 调用失败回调函数（可选，接受错误信息作为参数）
   * @param complete 调用结束回调函数（成功或失败都会执行，可选）
   */
  rename(oldPath: string, newPath: string, success?: Function, fail?: Function, complete?: Function): void

  /**
   *
   * @param path 删除目录
   * @param rescurise 是否递归删除目录包括该目录下的所有子目录和文件
   * @param success 调用成功回调函数（可选）
   * @param fail 调用失败回调函数（可选，接受错误信息作为参数）
   * @param complete 调用结束回调函数（成功或失败都会执行，可选）
   */
  rmdir(path: string, rescurise: boolean, success?: Function, fail?: Function, complete?: Function): void

  /**
   * 获取文件 Stats 对象
   * @param path 文件/目录路径
   * @param recursive 是否递归获取目录下的每个文件的 Stats 信息
   * @param success 调用成功回调函数（可选）
   * @param fail 调用失败回调函数（可选，接受错误信息作为参数）
   * @param complete 调用结束回调函数（成功或失败都会执行，可选）
   */
  stat(path: string, recursive: boolean, success?: Function, fail?: Function, complete?: Function): void

  /**
   * 删除文件
   * @param path 文件路径
   * @param success 调用成功回调函数（可选）
   * @param fail 调用失败回调函数（可选，接受错误信息作为参数）
   * @param complete 调用结束回调函数（成功或失败都会执行，可选）
   */
  unlink(path: string, success?: Function, fail?: Function, complete?: Function): void

  /**
   * 写文件，如果文件不存在则创建该文件，存在时覆盖写入
   * @param path 文件路径
   * @param data 需要写入的数据
   * @param success 调用成功回调函数（可选）
   * @param fail 调用失败回调函数（可选，接受错误信息作为参数）
   * @param complete 调用结束回调函数（成功或失败都会执行，可选）
   */
  writeFile(path: string, data: string | Buffer, success?: Function, fail?: Function, complete?: Function): void
}
