//@ts-nocheck

declare namespace pm {
  function request(params: {
    url: string;
    data?: string | object;
    header?: object;
    method?: string;
    success?: Function;
    complete?: Function;
    fail?: Function;
  }): void

  /**
   * 获取 WiFi 对象
   */
  function createWifi(): wifi;

  /**
   * 创建音频播放器上下文
   */
  function createAudioContext(): audio;

  /**
   * 创建 videoPlayer 控件的上下文，该 API 时控制 VideoPlyer 控件的，所以必须传递 VideoPlyer 控件的 id
   * @param id VideoPlayer控件的控件名称
   * @param page VideoPlayer控件所在的Page对象，一般填this
   */
  function createVideoContext(id: string, page: page): videoPlayer;

  /**
   * 创建画布上下文
   * 注意： 画布上下文必须对画布控件（canva）进行创建，否则会引起程序崩溃
   * @param id 画布控件（canvas） 的 id
   * @param page 当前 page 对象，一般为 this
   */
  function createCanvasContext(id: string, page: page): canvas;

  /**
   * 创建动画对象
   * @param duration 动画的总时长
   * @param interval 动画的帧间隔
   */
  function createAnimator(duration?: number, interval?: number): animator;

  /**
   * 获取全局唯一的文件管理器接口
   */
  function getFileSystemManager(): FileSystemManager;

  /**
   * 打开 I2C 设备接口
   * @param param port:要打开的设备名
   */
  function openIICPort(param: { port: string }): IIC;

  /**
   * language setting
   * @param lan
   */
  function setSysLanguage(lan: string): void

  /**
   * Get the current system language
   */
  function getSysLanguage(): string

  /**
   * 此方法返回一个时间戳，单位为毫秒。此时间一般是从系统启动开始计算的时间，可以通过两次调用 pm.clock() 方法的返回值来计算时间差
   */
  function clock(): number

  /**
   * 保留当前页面，跳转到新页面
   * @param url 页面路径字符串或者对象
   */
  function navigateTo(url: string | { path: string, value?: any }): void

  /**
   * 关闭当前页面，跳转到新页面
   * @param url 关闭当前页面跳转到新页面
   */
  function redirectTo(url: string | { path: string, value?: any }): void

  /**
   * 返回到当前一级或多级上一级的 Page，并关闭当前一级或者多级 Page
   * @param value 传递的参数
   * @param number 返回页面的层数
   */
  function navigateBack(value?: any, number?: number): void

  /**
   * 关闭指定 Page 页面，参数 name 为要关闭的 Page 页面的名称
   * @param pageName 页面名称
   */
  function closePage(pageName: string): void

  /**
   * 获取当前的页面栈，用于获取当前存在的 Page 个数
   */
  function getPages(): number

  /**
   * 获取当前页面的名称
   */
  function getPageName(): string

  /**
   * 获取当前已打开的页面的名称
   */
  function getPagesName(): string[]

  /**
   * 获取当前页面对象
   */
  function getPageObject(): object

  /**
   * 设置背光亮度
   * @param value 亮度值 取值范围为 0-100
   */
  function setScreenBrightness(value: number): void

  /**
   * 获取当前背光亮度
   */
  function getScreenBrightness(): number

  /**
   * 打开一个串口设备
   */
  function openSerialPort(port: string, baud: number): uart

  /**
   * 解压本地 tar 包
   * @param tar 对象，内含五个属性，分别为：
   * 1.tar 包路径
   * 2.dir 指定文件解压路径
   * 3.success 接口调用成功回调函数（可选）
   * 4.fail 接口调用失败回调函数（可选）
   * 5.complete 接口调用完成回调函数 调用成功或失败都会执行（可选）
   */
  function untar(tar: {tar:string, dir:string, success?:Function, fail?:Function, complete?:Function}): untar

  /**
   * 显示消息提示框
   * @param param
   */
  function showToast(param: {
    title: string,
    duration?: number,
    mask?: boolean,
    width?: number,
    rowHeight?: number,
    hMargin?: number,
    vMargin?: number,
    fgColor?: number,
    bgColor?: number,
    maskColor?: number,
  }): void

  /**
   * 隐藏消息提示框,只能隐藏当前正在显示的消息提示框
   */
  function hideToast(): void
}
