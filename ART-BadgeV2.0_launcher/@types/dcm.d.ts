
declare module "dcm" {
  /**
   * 创建数据池，数据池名字全局唯一。创建成功返回 true，创建失败返回 false
   * @param name
   */
  export function Create(name: string): boolean

  /**
   * 打开数据池，数据池存在时返回数据池操作 API，数据池不存时返回 UNDEFINED
   * @param name
   */
  export function Open(name: string): pool

  export interface pool {
    /**
     * 存放数据到数据池中。只支持原生类型且能够序列化的对象
     * @param key 关键字
     * @param data 数据，支持 JS 原生对象
     */
    setItem(key: string, data: any): boolean

    /**
     * 从数据池中获取数据。获取成功返回 JS 原生对象，获取失败返回 UNDEFINED
     * @param key
     */
    getItem(key: string): any

    /**
     * 从数据池中删除数据项。删除成功返回 true，失败返回 false
     * @param key
     */
    removeItem(key: string): boolean

    /**
     * 设置数据改变监听回调。监听成功返回 true，失败返回 false
     * @param key 关键字
     * @param callback 回调函数
     */
    onChange(key: string, callback: Function): boolean

    /**
     * 解绑数据改变回调。解绑成功返回 true，失败返回 false
     * @param key 关键字
     * @param callback 回调函数
     */
    offChange(key: string, callback?: Function): boolean

    /**
     * 设置数据删除监听回调。监听成功返回 true，失败返回 false
     * @param key 关键字
     * @param callback 回调函数
     */
    onDelete(key: string, callback: Function): boolean

    /**
     * 解绑数据删除监听回调。解绑成功返回 true，失败返回 false
     * @param callback 回调函数
     */
    offDelete(callback: Function): boolean

    /**
     * 关闭数据池。返回 UNDEFINED
     */
    close(): void
  }
}
