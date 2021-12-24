
declare module "storage" {
  /**
   * 使用键值对形式设置缓存
   * @param key
   * @param data
   */
  export function setStorageSync(key: string, data: any): boolean

  /**
   * 通过 key 值从缓存中获取指定的 data
   * @param key
   */
  export function getStorageSync(key: string): any

  /**
   * 通过 key 值在缓存中删除指定的数据
   * @param key
   */
  export function removeStorageSync(key: string): boolean
}
