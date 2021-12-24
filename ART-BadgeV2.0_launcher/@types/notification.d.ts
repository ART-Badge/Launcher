
declare module "notification" {
  /**
   * 从未读通知队列中取出指定位置的通知
   * @param index 要获取通知的下标
   */
  export function getMsg(index: number): object

  /**
   * 按照获取规则取出通知数组
   * @param select_mode select_mode 为选择类型，可用值为：“NotRead”，“HeaveRead”，“SelectAll”
   */
  export function getMsgs(select_mode: string): object

  /**
   * 添加新的通知到 js 通知队列中
   * @param msg_obj 要发送的通知对象
   */
  export function pushMsg(msg_obj: object): boolean

  /**
   * 从通知队列中删除指定id对象
   * @param id 要删除通知对象的ID
   */
  export function deleteMsg(id: number): boolean

  /**
   * 删除通知队列所有通知
   */
  export function deleteAll(): void

  /**
   * 获取通知队列中通知数量
   * @param select_mode select_mode 为选择类型，可用值为：“NotRead”，“HeaveRead”，“SelectAll”
   */
  export function getCount(select_mode: string): number

  /**
   * 设置排序模式
   * @param mode SordMode 排序模式，可用值为：“TimeMode”，“PriorityMode”
   */
  export function setSortMode(mode: string): boolean

  /**
   * 将指定通知标记为已读
   * @param id 要更新通知对象的 ID
   */
  export function updateMsgReadStatus(id: number): boolean

  /**
   * 提供page注册通知监听函数
   */
  export function onNotification(callback: Function): boolean

  /**
   * page注销监听函数
   */
  export function offNotification(callback: Function): boolean
}
