export enum interpolator {
  linear = 'linear',
  accelerate = 'accelerate',
  negexp = 'negexp',
  bounce = 'bounce',
  anticipate = 'anticipate'
}

export enum timing {
  'ease-in' = 'ease-in',
  'ease-out' = 'ease-out',
  'ease-in-out' = 'ease-in-out'
}

export enum direction {
  normal = 'normal',
  reverse = 'reverse',
  alternate = 'alternate',
  'alternate-reverse' = 'alternate-reverse'
}

declare interface animator {
  /**
   * 设置动画持续的时间，单位为毫秒
   * @param duration 动画时长
   */
  duration(duration: number): void

  /**
   * 设置动画的帧间隔
   * @param interval 帧间隔
   */
  interval(interval: number): void

  /**
   * 设置动画的插值器，插值器的作用时决定动画的播放速度
   * @param interpolator 动画插值器
   */
  interpolator(interpolator: string | Function): void

  /**
   * 设置动画的播放速度趋势（缓动效果）
   * @param timing
   */
  timing(timing: string): void

  /**
   * 设置动画的方向
   * @param direction 动画的方向
   */
  direction(direction: string): void

  /**
   * 设置动画的重复次数
   * @param times 重复次数
   */
  repeat(times: number): void

  /**
   * 设置动画播放完成时的回调函数
   * @param callback 回调函数
   */
  finished(callback: Function): void

  /**
   * 在控件上绑定动画
   * @param id 控件 id
   */
  bind(id: string): void

  /**
   * 对已绑定的控件的宽度属性进行动画
   * @param tx 宽度的变化量，单位为像素（px）
   */
  wdith(tx: number): void

  /**
   * 对已绑定的控件的高度属性进行动画
   * @param th 高度的变化量，单位为像素（px）
   */
  height(th: number): void

  /**
   * 对已绑定的控件的水平位置进行动画
   * @param tx 水平位置变化量
   */
  translateX(tx: number): void

  /**
   * 对已绑定的控件的垂直位置进行动画
   * @param ty 垂直位置变化量
   */
  translateY(ty: number): void

  /**
   * 对已绑定的控件的位置进行动画
   * @param tx 水平位置变化量
   * @param ty 垂直位置变化量
   */
  translate(tx: number, ty: number): void

  /**
   * 对已绑定控件的位置和尺寸进行动画
   * @param tx 水平位置变化量
   * @param ty 垂直位置变化量
   * @param tw 宽度的变化量
   * @param th 高度的变化量
   */
  rectangle(tx: number, ty: number, tw: number, th: number): void

  /**
   * 对控件的透明度进行动画
   * @param opacity 透明度，取值范围为 0~255
   */
  opacity(opacity: number): void

  /**
   * 对控件的前景色进行动画
   * @param color 前景颜色
   */
  foreground(color: string): void

  /**
   * 开始动画
   */
  start(): void

  /**
   * 结束动画
   */
  stop(): void

  /**
   * 获取动画是否正运行
   */
  isPLay(): void
}
