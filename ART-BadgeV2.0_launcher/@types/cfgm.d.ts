
declare module "cfgm" {
  /**
   * 设置系统配置。当配置不存在时，会创建新的配置项
   * @param item
   * @param value
   */
  export function setSystemCfg(item: string, value: string): boolean

  /**
   * 获取系统配置项。当配置不存在时，返回 UNDEFINED
   * @param item
   */
  export function getSystemCfg(item: string): string

  /**
   * 设置应用配置。当配置不存在时，会创建新的配置项。应用配置与系统配置独立，应用间也独立。
   * @param item
   * @param value
   */
  export function setApplicationCfg(item: string, value: string): boolean

  /**
   * 获取系统配置项。当配置不存在时，返回 UNDEFINED
   * @param item
   */
  export function getApplicationCfg(item: string): string
}
