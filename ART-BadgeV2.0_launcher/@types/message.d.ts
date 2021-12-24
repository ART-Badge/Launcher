// import {Buffer} from './Buffer'

declare function Message(): message

declare interface message {
  /**
   * js 想 底层发送数据
   * @param name 名称
   * @param value 需要发送的数据
   */
  send(name: string, value: string | Buffer): void

  /**
   * 监听底层发送过来的信息（消息回调）
   * @param name 事件名称
   * @param func 回调函数
   */
  on(name: string, func: Function): void
}
