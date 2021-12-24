declare module "tsdb" {
  /**
   * 连接数据库
   * @param param
   */
  export function connect(param: {
    uri: string,
    maxLen: number,
    maxSize: number,
    success: Function,
    fail: Function,
    complete: Function,
  }): void

  /**
   * 往数据库中追加数据
   * @param param
   */
  export function append(param: {
    data: any,
    success: Function,
    fail: Function,
    complete: Function,
  }): void

  /**
   * 查询时序数据库
   * @param param
   */
  export function query(param: {
    startTime: number,
    endTime: number,
    success: Function,
    fail: Function,
    complete: Function,
  }): void

  /**
   * 删除符合条件的数据，实际调用时函数名需要换成 delete
   * @param param
   */
  export function del(param: {
    startTime: number,
    endTime: number,
    success: Function,
    fail: Function,
    complete: Function,
  }): void

  /**
   * 清空数据库
   * @param param
   */
  export function clean(param: {
    success: Function,
    fail: Function,
    complete: Function,
  }): void

  /**
   * 断开数据库连接
   */
  export function disconnect(): void

}
