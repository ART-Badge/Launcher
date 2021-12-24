
declare module "assert" {
  /**
   * 获取 Assert 模块错误触发统计次数。
   */
  export function errorTimes(): number

  /**
   * 重置错误触发统计次数
   */
  export function clearErrorTimes(): void

  /**
   * value 为 false 时用给定的操作及错误信息抛出错误(AssertionError).
   * @param value 测试值
   * @param message 在抛出错误时显示的消息.
   * @param blocking 触发异常时是否阻塞，默认不阻塞
   */
  export function assert(value: any, message?: any, blocking?: boolean): void

  /**
   * 当实际值不等于期待值时抛出异常，并给出提示信息
   * @param actual 实际值
   * @param expected 期待值
   * @param message 提示信息
   * @param blocking 触发异常时是否阻塞，默认不阻塞
   */
  export function equal(actual: any, expected: any, message?: any, blocking?: boolean): void

  /**
   * 当实际值跟期待值同时抛出异常并给出提示信息
   * @param actual 实际值
   * @param expected 期待值
   * @param message 提示信息
   * @param blocking 触发异常时是否阻塞，默认不阻塞
   */
  export function notEqual(actual: any, expected: any, message?: any, blocking?: boolean): void

  /**
   * 当实际值跟期待值全等（===）时抛出异常信息并给出异常信息
   * @param actual 实际值
   * @param expected 期待值
   * @param message 提示信息
   * @param blocking 触发异常时是否阻塞，默认不阻塞
   */
  export function notStrictEqual(actual: any, expected: any, message?: any, blocking?: boolean): void

  /**
   * 当实际值跟期待值不全等（!==）时抛出异常信息并给出异常信息
   * @param actual 实际值
   * @param expected 期待值
   * @param message 提示信息
   * @param blocking 触发异常时是否阻塞，默认不阻塞
   */
  export function strictEqual(actual: any, expected: any, message?: any, blocking?: boolean): void

  /**
   * 测试给定的函数是否抛出预期的异常，如果没有则抛出给定的异常信息
   * @param block  抛出错误的函数
   * @param expected 预期的错误类型
   * @param message 要显示的信息
   */
  export function throws(block: Function, expected: Function, message: any): void

  /**
   * 测试给定的函数是否不抛出任何异常。否则会抛出异常，并提示给定的提示信息
   * @param block 抛出错误的函数
   * @param message 异常提示信息
   */
  export function doesNotThrow(block: Function, message?: any): void
}
