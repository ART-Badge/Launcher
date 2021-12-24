
declare module "mqtt" {
  /**
   * 根据 endpoint 与 options,创建一个 MQTT Client。 返回：mqtt.client 对象
   * @param endpoint broker 的URL地址
   * @param options 设定选项
   */
  export function Client(endpoint: string, options?: {
    keepalive?: number,
    clientId?: string,
    clean?: boolean,
    reconnectPeriod?: number,
    connectTimeout?: number,
    username?: string,
    password?: string,
    will?: {
      topic: string,
      payload: string,
      qos?: number,
      retain?: boolean,
    },
  }): client

  /**
   * 根据 endpoint 与 options,创建一个 MQTT Client,并连接。 返回：mqtt.client 对象
   * @param endpoint broker 的URL地址
   * @param options 设定选项
   */
  export function Client(endpoint: string, options?: {
    keepalive?: number,
    clientId?: string,
    clean?: boolean,
    reconnectPeriod?: number,
    connectTimeout?: number,
    username?: string,
    password?: string,
    will?: {
      topic: string,
      payload: string,
      qos?: number,
      retain?: boolean,
    },
  }): client

  export interface client {
    /**
     * 根据之前设定选项连接指定 MQTT 的 Broker,连接成功时，将触发 connect 事件
     */
    connect(): void

    /**
     * 推送消息
     * @param topic 指定需要推送消息的 Topic
     * @param message 需要推送的消息
     * @param options 推送设定
     * @param callback 在 QoS 处理完成时触发的回调函数，或者在下一个标记处激发（如果 QoS 为 0）。如果客户端正在断开连接，则会发生错误
     */
    publish(topic: string, message: string | Buffer, options?:{
      qos?: number,
      dup?: boolean,
      retain?: boolean,
    }, callback?: Function): void

    /**
     * 订阅指定 Topic
     * @param topic 指定订阅的 Topic
     * @param options 推送设定
     * @param callback 订阅成功后的回调函数
     */
    subscribe(topic: string, options?:{ qos?: number }, callback?: Function): void

    /**
     * 取消订阅指定 Topic
     * @param topic 指定取消订阅的 Topic
     * @param callback 取消订阅成功后的回调函数
     */
    unsubscribe(topic: string, callback?: Function): void

    /**
     * 关闭 Client
     * @param callback 关闭 Client 成功后的回调函数
     */
    end(callback?: Function): void

    /**
     * 根据之前的设定，重新连接
     */
    reconnect(): void
  }
}
