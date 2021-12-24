declare function Event(): Event

declare interface Event {
  /**
   * 配置 name 名称事件的回调模式，当没有对事件进行配置时，默认模式为事件触发时回调所有注册函数
   * @param name 事件名称
   * @param mode 事件触发模式
   */
  mode(name: string, mode: boolean): void

  /**
   * 注册回调函数
   * @param name 事件名称
   * @param func 回调函数
   */
  on(name: string, func: Function): void

  /**
   * 注册回调函数
   * @param name 事件名称
   * @param func 回调函数
   */
  addListener(name: string, func: Function): void

  /**
   * 触发事件
   * @param name 事件名称
   * @param args
   */
  emit(name: string, ...args: any): void

  /**
   * 移除指定名称的事件的回调函数
   * @param name 事件名称
   * @param func 回调函数名称
   */
  removeListener(name: string, func: Function): void

  /**
   * 移除指定名称的所有事件的回调函数
   * @param name 事件名称
   */
  removeAllListeners(name: string): void

  /**
   * 移除指定的事件名称和所有对应的回调函数
   * @param name
   */
  removeEvent(name: string): void

  /**
   * 获取所有的事件名称
   */
  eventNames(): string[]

  /**
   * 销毁事件对象
   */
  destroy(): void
}
