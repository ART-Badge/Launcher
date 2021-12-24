/**
 * 引入一个模块
 * @param name 模块名，具体规则见参考资料的开发指南
 * @param res 资源包路径 uri，如：internal://widgets#/res.prc，不填默认为当前应用资源包
 */
export declare function require(name: string, res?: string): void

/**
 * 从缓存中移除模块实例
 * @param module 模块实例，即 require 返回值
 */
export declare function unrequire(module: string | object): void

/**
 * 单次定时器
 * @param handler 定时器回调函数
 * @param timeout 定时器定时时长，单位毫秒 ms
 * @param name 定时器名称
 */
declare function setTimeout(handler: Function, timeout: number, name?: string): object

/**
 * 重复定时器
 * @param handler 定时器回调函数
 * @param timeout 定时器定时时长，单位毫秒 ms
 * @param name 定时器名称
 */
declare function setInterval(handler: Function, timeout: number, name?: string): object

