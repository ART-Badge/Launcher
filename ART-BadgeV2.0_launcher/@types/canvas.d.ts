
export enum lineCap{
  butt = 'butt',
  square = 'square',
  round = 'round'
}

export enum fontAlign{
  left = 'left',
  right = 'right',
  center = 'center'
}

export enum textBaseLine{
  top = 'top',
  center = 'center',
  bottom = 'bottom',
  normal = 'normal'
}


declare interface canvas {
  /**
   * 设置填充样式
   * @param color 接受六位的十六进制和英文单词
   */
  setFillStyle(color: string): void

  /**
   * 设置前景图片
   * @param url 图片路径 不传入该参数时会清除上下文中的前景图片
   */
  setSourceImage(url?: string): void

  /**
   * 设置绘制线条的宽度
   * @param width 绘制线条的宽度 支持小数 单位为像素（px）
   */
  setLineWidth(width: number): void

  /**
   * 设置线帽形状
   * @param lineCap 线帽形状
   */
  setLineCap(lineCap: string): void

  /**
   * 设置字体大小
   * @param fontSize 字体大小
   */
  setFontSize(fontSize: number): void

  /**
   * 设置文本水平对齐方式
   * @param fontAlign 文本水平对齐方式
   */
  setTextAlign(fontAlign: string): void

  /**
   * 设置文本的竖向对齐方式
   * @param baseLine
   */
  setTextBaseline(baseLine: string): void

  /**
   * 移动画笔到当前位置
   * @param x x 坐标
   * @param y y 坐标
   */
  moveTo(x: number, y: number): void

  /**
   * 绘制一条直线，该直线从上一个顶点开始，到当前顶点结束
   * @param x 终点 x 坐标
   * @param y 终点 y 坐标
   */
  lineTo(x: number, y: number): void

  /**
   * 绘制一个矩形，该矩形从上一个顶点开始，到当前顶点结束
   * 当前坐标与上一个顶点为对角关系
   * @param x
   * @param y
   */
  rectTo(x: number, y: number): void

  /**
   * 绘制一个弧
   * @param xc 圆弧中心 x 坐标
   * @param yc 圆弧中心 y 坐标
   * @param rx 圆弧横轴半径
   * @param ry 圆弧纵轴半径
   * @param amgle1 圆弧的起始角度
   * @param angle2 圆弧的结束角度
   */
  arc(xc: number, yc: number, rx: number, ry: number, amgle1: number, angle2: number): void

  /**
   * 绘制二次贝塞尔曲线
   * @param x1 第一个控制点的 x 坐标
   * @param y1 第一个控制点的 y 坐标
   * @param x2 第二个控制点的 x 坐标
   * @param y2 第二个控制点的 y 坐标
   */
  curve2(x1: number, y1: number, x2: number, y2: number): void

  /**
   * 绘制三次贝塞尔曲线
   * @param x1 第一个控制点的 x 坐标
   * @param y1 第一个控制点的 y 坐标
   * @param x2 第二个控制点的 x 坐标
   * @param y2 第二个控制点的 y 坐标
   * @param x3 第三个控制点的 x 坐标
   * @param y3 第三个控制点的 y 坐标
   */
  curve3(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void

  /**
   * 在当前画笔位置绘制一段文本
   * @param text 文本字符串
   */
  text(text: string): void

  /**
   * 在当前画笔位置绘制一段文本,可以设定文本的弯曲半径和旋转角度
   * @param text 文本字符串
   * @param radius 文本的弯曲半径
   * @param rotate 旋转角度（可选）
   */
  arctext(text: string, radius?: number, rotate?: number): void

  /**
   * 对路径进行平移变换
   * @param tx 水平方向上的平移像素
   * @param ty 垂直方向上的平移像素
   */
  translate(tx: number, ty: number): void

  /**
   * 对路径进行旋转变换
   * @param angle 旋转角度
   */
  rotate(angle: number): void

  /**
   * 对路径进行缩放变换
   * @param sx 水平方向上的缩放比例
   * @param sy 垂直方向上的缩放比例
   */
  scale(sx: number, sy: number): void

  /**
   * 对路径进行错切变换
   * @param sh 水平方向上的错切量
   * @param sv 垂直方向上的错切量
   */
  shear(sh: number, sv: number): void

  /**
   * 复位所有的路径变换操作
   */
  transformReset(): void

  /**
   * 路径分组命令，将当前的所有路径分组并保存
   */
  stroke(): void

  /**
   * 将当前所有的路径分组并保存，与 stroke 方法不同的是，fill 会使用填充的方式来绘制，
   * 且该方法会将所有的路径闭合起来（所有被绘填充的路径必须是闭合的）。
   */
  fill(): void

  /**
   * 与 stroke 方法相似，只不过它会将所有的路径闭合起来
   */
  closePath(): void

  /**
   * 调用该方法后会保存当前画布上下文的所有路径并在画布控件重绘时绘制
   */
  draw(): void
}

