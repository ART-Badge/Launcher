
declare module "http" {
  /**
   * 使用键值对形式设置缓存
   * @param params
   */
  export function request(params: {
    url: string;
    data?: string | object;
    header?: object;
    method?: string;
    success?: Function;
    complete?: Function;
    fail?: Function;
  }): void
}
