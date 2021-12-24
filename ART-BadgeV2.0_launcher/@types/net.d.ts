declare module "net" {
  /**
   * 使用键值对形式设置缓存
   * @param options 连接设定选项
   * @param connectionListener 事件 Connection 的 Listener
   */
  export function createServer(options?: {
    allowHalfOpen?: boolean,
    readable?: boolean,
    writeable?: boolean
  }, connectionListener?: Function): server

  export interface server {
    /**
     * 启动一个TCP服务监听
     * @param port 客户端连接的 port
     * @param host 客户端连接的 host，默认 'localhost'
     * @param backlog 最大连接数，默认 511
     * @param listenListener 事件 listening 的 Listener
     */
    listen(port: number, host?: string, backlog?: number, listenListener?: Function): void

    /**
     * 启动一个TCP服务监听
     * @param options
     * @param listenListener 事件 listening 的 Listener
     */
    listen(options: { port: number, host?: string, backlog?: number }, listenListener?: Function): void

    /**
     * 停止接收新的客户端，当已连接的客户端都关闭后，将触发 'close' 事件
     * @param closeListener 事件 close 的 Listener
     */
    close(closeListener: Function): void
  }


  /**
   * 创建一个新的 net.Socket 并自动根据 options 执行 socket.connect() 进行连接。成功后，connectListener 则会成为事件 connect 的 listener。
   * 当 socket 连接成功后，每当收到数据，将触发 data 事件。
   * 当 socket 收到 FIN package 后，将触发 end 事件
   * @param options
   * @param connectListener
   */
  export function connect(options: { port: number, host?: string, family?: number }, connectListener: Function): void

  /**
   * 创建一个新的 net.Socket 并自动根据 options 执行 socket.connect() 进行连接。成功后，connectListener 则会成为事件 connect 的 listener。
   * 当 socket 连接成功后，每当收到数据，将触发 data 事件。
   * 当 socket 收到 FIN package 后，将触发 end 事件
   * @param options
   * @param connectListener
   */
  export function createConnections(options: { port: number, host?: string, family?: number }, connectListener: Function): void

  /**
   * 创建一个新的 net.Socket ,并根据指定 port 和 host 执行 socket.connect() 进行连接。成功后，connectListener 则会成为事件 connect 的 listener
   * @param port 指定连接的 port
   * @param host 指定连接的 host，默认 'localhost'
   * @param connectListener 事件 connect 的 Listener
   */
  export function connection(port: number, host?: string, connectListener?: Function): void

  /**
   * 创建一个新的 net.Socket ,并根据指定 port 和 host 执行 socket.connect() 进行连接。成功后，connectListener 则会成为事件 connect 的 listener
   * @param port 指定连接的 port
   * @param host 指定连接的 host，默认 'localhost'
   * @param connectListener 事件 connect 的 Listener
   */
  export function createConnection(port: number, host?: string, connectListener?: Function): void

  /**
   * 根据选项，创建一个 socket
   * @param option
   */
  export function socket(option: {
    allowHalfOpen?: boolean,
    readable?: boolean,
    writeable?: boolean
  }): socket

  export interface socket {
    /**
     * 根据 options 执行 socket.connect() 进行连接。成功后，connectListener 则会成为事件 connect 的 listener
     * @param options
     * @param connectListener
     */
    connect(options: { port: number, host?: string, family?: number }, connectListener: Function): void

    /**
     * 根据指定 port 和 host 执行 socket.connect() 进行连接。成功后，connectListener 则会成为事件 connect 的 listener
     * @param port
     * @param host
     * @param connectListener
     */
    connect(port: number, host?: string, connectListener?: Function): void

    /**
     * 发送数据 data，发送完毕后执行 callback
     * @param data 需要发送的数据
     * @param callback 发送完毕后，执行的回调函数
     */
    write(data: string | Buffer, callback?: Function): void

    /**
     * 发送数据 data 后，执行 callback。最后执行 socket.destory() 销毁 socket
     * @param data 需要发送的数据
     * @param callback 发送完毕后，执行的回调函数
     */
    end(data: string | Buffer, callback?: Function): void

    /**
     * 确保在该 socket 上不再有 I/O 活动后，销毁 socket
     */
    destroy(): void

    /**
     * 停止读取数据
     */
    pause(): void

    /**
     * 用于执行 socket.pause() 后，恢复读取数据
     */
    resume(): void

    /**
     * 当 socket 在指定时间内不活动，即没有读写操作，将触发 timeout 事件
     * @param timeout 指定 Timeout 的大小，单位:毫秒
     * @param callback 事件 timeout 的 Listener
     */
    setTimeout(timeout: number, callback?: Function): void

    /**
     * 当 socket 连接后，返回远程客户端连接的本地 IP 地址字符串
     */
    localAddress(): string

    /**
     * 当 socket 连接后，返回用数字表示的本地端口
     */
    localPort(): number

    /**
     * 当 socket 连接后，返回用字符串表示的远程 IP 地址
     */
    remoteAddress(): string

    /**
     * 当 socket 连接后，返回用字符串表示的远程 IP 协议族。'IPv4' 或 'IPv6'
     */
    remoteFamily(): string

    /**
     * 当 socket 连接后，返回用数字表示的远程端口
     */
    remotePort(): number
  }
}
