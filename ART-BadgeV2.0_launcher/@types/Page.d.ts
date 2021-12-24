declare function Page(page: page): void

declare interface page {
  /**
   * 页面生命周期函数，在页面初始化完成后由系统调起，主要供用户在页面显示前针对页面元素做相关赋值初始化等。比如加载自定义面板、启动模块功能等。与页面生命周期函数 onExit 成对。
   */
  onLoad(): pageEvent;

  /**
   * 页面生命周期函数，在页面第一次显示完成之后由系统调起，主要用于延后加载某些和底层交互有关的数据等，以达到先显示页面后加载或初始化部分页面元素的效果。
   */
  onResume(): pageEvent;

  /**
   * 页面生命周期函数，在页面变更为显示状态时由系统调起。与 onHide 成对。
   */
  onShow(): pageEvent;

  /**
   * 页面生命周期函数，在页面变更为隐藏状态时由系统调起。与 onShow 成对。
   */
  onHide(): pageEvent;

  /**
   * 页面生命周期函数，在页面退出时由系统调起，主要用于当前页面相关资源的回收。比如定时器的销毁和已注册事件回调方法的移除等。与 onLoad 成对。
   */
  onExit(): pageEvent;

  /**
   * 页面生命周期函数，有以下两种情况可触发。
   * 1.主动调用 App 对象的 onUpdate(arg) 函数触发。详见参考文档中的onUpdate的介绍
   * 2.其他页面退出返回到当前页面，且有往回传递参数时触发。参数传递详见参考文档中的navigateBack介绍
   */
  onUpdate(): pageEvent;

  /**
   * 页面属性以及页面子控件属性配置接口，由用户调用来配置页面或者其中控件的属性。
   * @param data 对象中每条属性名对应属性配置的目标控件 ID（页面也是通过 ID 来配置），如：{id: { value: "123"}}
   * @param res 资源包路径 uri，如：internal://widgets#/res.prc，不填默认为当前应用资源包
   */
  setData(data: object, res?: string): void;

  /**
   * 页面属性以及页面子控件属性获取接口，由用户调用来获取页面或者其中控件的属性。
   * @param data 对象属性名为控件 ID，属性值为要获取的控件属性名，如：{id: "value"}
   */
  getData(data: object): any;
}

declare interface pageEvent {
  /**
   * 事件类型
   */
  type: string;

  /**
   * 事件触发时间戳
   */
  timeStamp: number;

  /**
   * 触发事件的控件的一些属性值集合，如：{ id: "Page1" }
   */
  target: object;

  /**
   * 当前组件的一些属性值集合，如：{ id: "Page1" }
   */
  currentTarget: object;

  /**
   * 触摸事件，触摸点信息的数组
   * identifier 触点ID; x,y 坐标值; type 事件类型 ¹ 有 touchstart touchmove touchlong touchend
   */
  touchs: touchInfo[]
}

declare interface touchInfo {
  /**
   * 触点ID
   */
  identifier: number;

  /**
   * x 坐标值
   */
  x: number;

  /**
   * y 坐标值
   */
  y: number;

  /**
   * 事件类型
   */
  type: string
}

export enum touchType {
  /**
   * 触摸开始时触发
   */
  touchstart = 'touchstart',

  /**
   * 触摸短距离移动时触发
   */
  touchmove = 'touchmove',

  /**
   * 长时间点击或短距离移动时触发
   */
  touchlong = 'touchlong',

  /**
   * 触摸结束时触发
   */
  touchend = 'touchend'
}
