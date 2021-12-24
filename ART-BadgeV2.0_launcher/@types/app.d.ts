export enum listAppInstalledArgv {
  system = "system",
  user = "user",
}

declare namespace app {
  /**
   * 启动 APP 并切换到前台
   * 当 APP 在前台时不做任何操作；当 APP 在后台时切换到前台；当 APP 前后台都不在时启动 APP
   *
   * @param {string} uri APP 路径
   * @returns {boolean}
   */
  function launch(uri?: string): boolean

  /**
   * 关闭退出当前前台 APP 并返回 launcher APP
   * 注意：严禁在 APP 的生命周期回调函数中使用
   */
  function exit(): void

  /**
   * 获取 APP 的 app.json 数据
   *
   * @returns {object} app.json 对象
   * @param id: APP 唯一 ID，不填时获取当前前台 APP 的 app.json 数据
   */
  function getInfo(id?: string): object

  /**
   * 获取当前已经安装的应用，包括系统应用和用户应用。系统应用安装路径 /system/apps，用户应用安装路径 /user/apps
   *
   * @param argv: 默认不填获取当前已经安装的应用；有效参数 system 或 user，分别对应获取系统应用或者用户应用
   * @returns {object}
   */
  function listAppInstalled(argv?: string): object

  /**
   * 获取当前已经启动的应用，包含所有前后台应用，不包含 launcher APP
   */
  function listAppRunning(): string[]

  /**
   * Get the object instance of the current foreground APP
   *
   * @returns {object}
   */
  function getInstance(): object

  /**
   * User application installation
   * installation directory /user/apps
   * asynchronous installation
   * @param pramas
   */
  function appInstall(pramas: { path: string; success?: Function; fail?: Function; complete?: Function }): void

  /**
   * Uninstall user applications
   * uninstall synchronously
   * @param id
   * @returns {boolean}
   */
  function appUninstall(id: string): boolean

  /**
   * Analyze the application installation package, and successfully return an object containing application configuration information
   * and application icon temporary cache directory
   * @param prc
   */
  function parse(prc: string): object | string
}

