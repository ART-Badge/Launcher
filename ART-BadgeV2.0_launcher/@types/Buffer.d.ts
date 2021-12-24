
export enum encoding{
  utf8 = 'utf8',
  ascii = 'ascii',
  hex = 'hex'
}

/**
 * Buffer 类
 * @param pramas 需要创建的 buffer 数据或者长度
 * @param encoding 编码格式
 */
declare class Buffer {
  /**
   * 使用array分配一个新的 Buffer，array 类型为数字类型，比如：
   * var arr = [0x01, 0x02, 0x03, 0x04, 0x05];
   * var bufferObj = new Buffer(arr);
   *
   * @param array
   */
  constructor(array: number[])

  /**
   * 新建一个大小为 size 字节的 Buffer。encoding 参数制定字符串编码
   * @param size 新建 Buffer 的长度
   * @param encoding 字符串编码('utf8','ascii','hex')。 默认： 'utf8'
   */
  constructor(size: number, encoding?: string)

  /**
   * 创建一个包含给定字符串为 string 的 Buffer。encoding 参数制定字符串编码
   * @param string 要编码的字符串
   * @param encoding 字符串编码('utf8','ascii','hex')。 默认： 'utf8'
   */
  constructor(string: string, encoding?: string)

  /**
   * 读取有符号的一个字节
   * @param offset 读取的偏移量
   */
  static readInt8(offset?: number): number

  /**
   * 读取无符号的一个字节
   * @param offset 读取的偏移量
   */
  static readUInt8(offset?: number): number

  /**
   * 读取大端有符号的两个字节
   * @param offset 读取的偏移量
   */
  static readInt16BE(offset?: number): number

  /**
   * 读取大端无符号的两个字节
   * @param offset 读取的偏移量
   */
  static readUInt16BE(offset?: number): number

  /**
   * 读取小端有符号的两个字节
   * @param offset 读取的偏移量
   */
  static readInt16LE(offset?: number): number

  /**
   * 读取小端无符号的两个字节
   * @param offset 读取的偏移量
   */
  static readUInt16LE(offset?: number): number

  /**
   * 读取大端有符号的四个字节
   * @param offset 读取的偏移量
   */
  static readInt32BE(offset?: number): number

  /**
   * 读取大端无符号的四个字节
   * @param offset 读取的偏移量
   */
  static readUInt32BE(offset?: number): number

  /**
   * 读取小端有符号的四个字节
   * @param offset 读取的偏移量
   */
  static readInt32LE(offset?: number): number

  /**
   * 读取小端无符号的四个字节
   * @param offset 读取的偏移量
   */
  static readUInt32LE(offset?: number): number

  /**
   * 写入一个无符号的字节
   * @param value 写入的值
   * @param offset 写入的偏移量
   */
  static writeUInt8(value: number, offset?: number): number

  /**
   * 写入两个大端无符号的字节
   * @param value 写入的值
   * @param offset 写入的偏移量
   */
  static writeUInt16BE(value: number, offset?: number): number

  /**
   *写入两个小端无符号的字节
   * @param value 写入的值
   * @param offset 写入的偏移量
   */
  static writeUInt16LE(value: number, offset?: number): number

  /**
   * 写入四个大端无符号的字节
   * @param value 写入的值
   * @param offset 写入的偏移量
   */
  static writeUInt32BE(value: number, offset?: number): number

  /**
   * 写入四个小端无符号的字节
   * @param value 写入的值
   * @param offset 写入的偏移量
   */
  static writeUInt32LE(value: number, offset?: number): number

  /**
   * buffer 的长度
   */
  length(): number

  /**
   * 将 [offset, end] 这个闭区间内填充value，如果未指定 offset 和 end，则填充整个 buf
   * @param value 用来填充 buffer 的值
   * @param offset 填充的开始位置
   * @param end 填充的结束位置
   * @param encoding 编码
   */
  fill(value: string | Buffer | number, offset?: number, end?: number, encoding?: string): Buffer

  /**
   * 拷贝 buf 的一个区域的数据到 target 的一个区域，即便 target 的内存区域与 buf 的重叠
   * @param target 目标区域
   * @param targetStart 目标区域的起始位置
   * @param sourceStart 需要拷贝的 buffer 的起始位置
   * @param sourceEnd 需要拷贝的 buffer 的结束位置
   */
  copy(target: Buffer, targetStart?: number, sourceStart?: number, sourceEnd?: number): number

  /**
   * 根据 encoding 指定的字符编码解码 buf 成一个字符串
   * @param encoding 编码格式
   * @param start 开始解码的位置
   * @param end 结束解码的位置
   */
  toString(encoding?: encoding, start?: number, end?: number): string

  /**
   * 根据 encoding 的字符编码将 string 从 buf 的 offset 位置开始写入
   * @param string 需要写入的 buffer 字符串
   * @param offset 开始写入 string 前要跳过的字节数
   * @param length 写入的字节数
   * @param encoding 字符编码
   */
  write(string: string, offset?: number, length?: number, encoding?: string): number

  /**
   * 合并 buffer
   * @param target
   */
  concat(target: Buffer): Buffer

  /**
   * 把 bufder 中的一段数据转换成JSON对象(该段数据为 json 字符串)
   * @param start 指定要转换成JSON对象的数据的起始位置
   * @param end 指定要转换成JSON对象的数据的结束位置
   */
  jsonParse(start?: number, end?: number): object
}


