
declare module "sensor" {
  /**
   * 获取加速度ID值,如 51（0x33)
   */
  export function getAccelerometerID(): number

  /**
   * 获取加速度三轴数据
   */
  export function getAccelerometerData(): any

  /**
   * 打开加速度传感器
   */
  export function openAccelerometer(): boolean

  /**
   * 关闭加速度传感器
   */
  export function closeAccelerometer(): boolean

  /**
   * 开启监听：加速度值变化
   * @param callback
   */
  export function onAccelerometerDataChange(callback: Function): boolean

  /**
   * 取消监听：加速度值变化
   * @param callback
   */
  export function offAccelerometerDataChange(callback: Function): boolean

  /**
   * 获取 Gyroscope传感器数据
   */
  export function getGyroscope(): any

  /**
   * 获取 Gyroscope 传感器Sensor ID
   */
  export function getGyroscopeId(): number

  /**
   * 打开 Gyroscope传感器
   */
  export function openGyroscope(): boolean

  /**
   * 关闭 Gyroscope传感器
   */
  export function closeGyroscope(): boolean

  /**
   * 开启监听：Gyroscope值变化
   * @param callback
   */
  export function onGyroscopeChange(callback: Function): boolean

  /**
   * 取消监听：Gyroscope值变化
   * @param callback
   */
  export function offGyroscopeChange(callback: Function): boolean

  /**
   * 获取 磁传感器数据
    */
  export function getMagnetometer(): number

  /**
   * 获取 磁传感器 sensor ID
   */
  export function getMagnetometerId(): number

  /**
   * 开启磁传感器
   */
  export function openMagnetometer(): boolean

  /**
   * 关闭磁传感器
   */
  export function closeMagnetometer(): boolean

  /**
   * 开始监听：磁传感器数据
   * @param callback
   */
  export function onMagnetometerChange(callback: Function): boolean

  /**
   * 取消监听：磁传感器数据
   * @param callback
   */
  export function offMagnetometerChange(callback: Function): boolean

  /**
   * 获取当前温度
   */
  export function getTemperature(): number

  /**
   * 获取温度Sensor ID
   */
  export function getTemperatureId(): number

  /**
   * 开启温度检测
   */
  export function openTemperature(): boolean

  /**
   * 关闭温度检测
   */
  export function closeTemperature(): boolean

  /**
   * 开启监听：温度的变化
   * @param callback
   */
  export function onTemperatureChange(callback: Function): boolean

  /**
   * 取消监听：温度的变化
   * @param callback
   */
  export function offTemperatureChange(callback: Function): boolean

  /**
   * 获取湿度值
   */
  export function getHumidity(): number

  /**
   * 获取湿度传感器ID
   */
  export function getHumidityId(): number

  /**
   * 开启湿度检测
   */
  export function openHumidity(): boolean

  /**
   * 关闭湿度检测
   */
  export function closeHumidity(): boolean

  /**
   * 开启监听：湿度值变化
   * @param callback
   */
  export function onHumidityChange(callback: Function): boolean

  /**
   * 取消监听：湿度值变化
   * @param callback
   */
  export function offHumidityChange(callback: Function): boolean

  /**
   * 获取气压值
   */
  export function getBarometer(): number

  /**
   * 获取气压传感器ID
   */
  export function getBarometerId(): number

  /**
   * 开启气压传感器
   */
  export function openBarometer(): boolean

  /**
   * 关闭气压传感器
   */
  export function closeBarometer(): boolean

  /**
   * 开启监听：气压值变化
   * @param callback
   */
  export function onBarometerChange(callback: Function): boolean

  /**
   * 取消监听：气压值变化
   * @param callback
   */
  export function offBarometerChange(callback: Function): boolean

  /**
   * 获取亮度值
   */
  export function getLight(): number

  /**
   * 获取Light传感器ID
   */
  export function getLightId(): number

  /**
   * 开启亮度检测
   */
  export function openLightDetect(): boolean

  /**
   * 关闭亮度检测
   */
  export function closeLightDetect(): boolean

  /**
   * 开启监听：亮度值变化
   * @param callback
   */
  export function onLightChange(callback: Function): boolean

  /**
   * 取消监听：亮度值变化
   * @param callback
   */
  export function offLightChange(callback: Function): boolean

  /**
   * 获取距离
   */
  export function getProximity(): number

  /**
   * 获取距离传感器ID
   */
  export function getProximityId(): number

  /**
   * 开启距离检测
   */
  export function openProximity(): boolean

  /**
   * 关闭距离检测
   */
  export function closeProximity(): boolean

  /**
   * 开启监听：距离
   * @param callback
   */
  export function onProximityChange(callback: Function): boolean

  /**
   * 取消监听：距离
   * @param callback
   */
  export function offProximityChange(callback: Function): boolean

  /**
   * 获取心率数据
   */
  export function getHeartRate(): number

  /**
   * 获取心率传感器ID
   */
  export function getHeartRateId(): number

  /**
   * 开启心率检测
   */
  export function openHeartRateDetect(): boolean

  /**
   * 关闭心率检测
   */
  export function closeHeartRateDetect(): boolean

  /**
   * 开启监听：获取心率数据
   * @param callback
   */
  export function onHeartRateChange(callback: Function): boolean

  /**
   * 取消监听：获取心率数据
   * @param callback
   */
  export function offHeartRateChange(callback: Function): boolean

  /**
   *  获取TVOC 数据
   */
  export function getTVOC(): number

  /**
   *  获取TVOC 传感器ID
   */
  export function getTVOCId(): number

  /**
   * 开启TVOC
   */
  export function openTVOC(): boolean

  /**
   * 关闭TVOC
   */
  export function closeTVOC(): boolean

  /**
   * 开启监听：TVOC
   * @param callback
   */
  export function onTVOCChange(callback: Function): boolean

  /**
   * 取消监听：TVOC
   * @param callback
   */
  export function offTVOCChange(callback: Function): boolean

  /**
   *  获取Noise数据
   */
  export function getNoise(): number

  /**
   *  获取Noise传感器ID
   */
  export function getNoiseId(): number

  /**
   * 开启Noise检测
   */
  export function openNoise(): boolean

  /**
   * 关闭Noise检测
   */
  export function closeNoise(): boolean

  /**
   * 开启监听：Noise
   * @param callback
   */
  export function onNoiseChange(callback: Function): boolean

  /**
   * 取消监听：Noise
   * @param callback
   */
  export function offNoiseChange(callback: Function): boolean

  /**
   *  获取计步数据
   */
  export function getStepCounter(): number

  /**
   *  获取计步传感器ID
   */
  export function getStepCounterId(): number

  /**
   * 开启计步
   */
  export function openStepCounter(): boolean

  /**
   * 关闭计步
   */
  export function closeStepCounter(): boolean

  /**
   * 开启监听：计步数据
   * @param callback
   */
  export function onStepChange(callback: Function): boolean

  /**
   * 取消监听：计步数据
   * @param callback
   */
  export function offStepChange(callback: Function): boolean

  /**
   *  获取压力传感器数据
   */
  export function getForce(): number

  /**
   *  获取压力传感器ID
   */
  export function getForceId(): number

  /**
   * 开启压力传感器
   */
  export function openForce(): boolean

  /**
   * 关闭压力传感器
   */
  export function closeForce(): boolean

  /**
   * 开启监听：压力
   * @param callback
   */
  export function onForceChange(callback: Function): boolean

  /**
   * 取消监听：压力
   * @param callback
   */
  export function offForceChange(callback: Function): boolean

  /**
   *  获取血氧
   */
  export function getSPO2(): number

  /**
   *  获取血氧传感器ID
   */
  export function getSPO2Id(): number

  /**
   * 开启血氧
   */
  export function openSPO2(): boolean

  /**
   * 关闭血氧
   */
  export function closeSPO2(): boolean

  /**
   * 开启监听：血氧变化
   * @param callback
   */
  export function onSPO2Change(callback: Function): boolean

  /**
   * 取消监听：血氧变化
   * @param callback
   */
  export function offSPO2Change(callback: Function): boolean
}
