
declare interface IIC {
  /**
   * 读取数据
   * @param addr 要读取数据的设备的地址
   * @param buffer 存放读取到的数据的buffer，包含要读取的数据的长度，即 buffer 的大小
   */
  read(addr: number, buffer: Buffer): void

  /**
   * 读取数据，先写命名再读取数据
   * @param addr 要读取数据的设备的地址
   * @param buffer1 要写入的命名的 buffer 对象
   * @param buffer2 读取到的数据的 buffer，包含 buffer 的大小
   */
  read(addr: number, buffer1: Buffer, buffer2: Buffer): void

  /**
   * 读取数据，先写命名再读取数据
   * @param addr 要读取数据的设备的地址
   * @param buffer1 要写入的命名的 buffer 对象
   * @param buffer2 读取到的数据的 buffer，包含 buffer 的大小
   * @param flags flags 配置
   */
  read(addr: number, buffer1: Buffer, buffer2: Buffer, flags: number): void

  /**
   * 写入数据
   * @param addr 需要写入数据的设备地址
   * @param buffer 需要写入的数据，包含数据的长度
   */
  write(addr: number, buffer: Buffer): void

  /**
   * 写入数据
   * @param addr 需要写入数据的设备地址
   * @param buffer1 需要写入的数据，包含数据的长度
   * @param buffer2 读取到的数据的 buffer，包含 buffer 的大小(可选)
   */
  write(addr: number, buffer1: Buffer, buffer2?: Buffer): void

  /**
   * 写入数据
   * @param addr 需要写入数据的设备地址
   * @param buffer1 需要写入的数据，包含数据的长度
   * @param buffer2 读取到的数据的 buffer，包含 buffer 的大小(可选)
   * @param flag flags 配置（可选）
   */
  write(addr: number, buffer1: Buffer, buffer2?: Buffer, flag?: number): void

}
