
declare class MVVM{
  constructor(options?: object)

  /**
   * 初始化 mvvm，需传入一个 options 对象
   * @param options
   */
  init(options: object): void

  /**
   * 往当前页面中插入自定义面板
   * @param mountedNodeName 自定义面板要挂载的节点
   * @param panels 要插入的自定义面板
   * @param widgets 自定义面板中 widgets 信息（符合 mvvm 要求的格式）
   */
  insertCustomPanel(mountedNodeName: string, panels: object, widgets: object): void
}

declare module "MVVM" {
  export = MVVM
}
