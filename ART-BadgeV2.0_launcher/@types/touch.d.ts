//@ts-nocheck

declare module "touch" {
  /**
   * 页面触摸初始化
   * @param page page 对象
   */

  export function PageTouchInit(page: page): void

  /**
   * 页面触摸初始化
   * @param page page 对象
   */
  export function PageTouchUninit(page: page): void

  /**
   * 页面触摸初始化
   * @param page page 对象
   * @param event 事件对象
   * @param longPress 支持长按
   * @param R2L 从右向左
   * @param L2R 从左向右
   * @param T2D 从上到下
   * @param D2T 从下到上
   */
  export function PageTouchEvent(page: page, event: Function, longPress: Function | Number, R2L: Function | Number, L2R: Function | Number, T2D: Function | Number, D2T: Function | Number): void
}
