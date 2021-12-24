
declare module "emq" {
  /**
   * 创建一个消息接收端点，返回消息队列操作 API
   */
  export function createEP(): queue

  /**
   * 发送数据至 HUB 的一个通道上
   * @param hubName
   * @param data
   */
  export function send(hubName: string, data: any): boolean

  export interface queue {
    /**
     * 监听一个 HUB 上面的一个通道。
     * @param hubName
     * @param callback
     */
    onMessage(hubName: string, callback: Function): boolean

    /**
     * 取消监听
     * @param hubName
     * @param callback
     */
    offMessage(hubName: string, callback: Function): boolean

    /**
     * 关闭接收端点
     */
    close(): boolean
  }
}
