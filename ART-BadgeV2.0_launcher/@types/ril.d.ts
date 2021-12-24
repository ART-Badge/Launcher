declare module "ril" {
  /**
   * 返回一个数值，表示GSM信号强度，有效值为（0-31，99）
   */
  export function getGsmSignalStrength(): any

  /**
   * 开启监听：信号强度变化
   * @param callback
   */
  export function onSignalStrengthChange(callback: Function): any

  /**
   * 取消监听信号强度变化
   * @param callback
   */
  export function offSignalStrengthChange(callback: Function): any

  /**
   * 获取信号强度等级（0~4）
   */
  export function getSignalStrengthLevel(): any

  /**
   * 获取cdma、gsm、lte、wcdma等信号强度
   */
  export function getSignalStrengthInfo(): any

  /**
   * 返回周围基站信息
   */
  export function getNeighborCellInfo(): any

  /**
   * 获取当前小区信息，如频段，强度，PLMN, celID
   */
  export function getCellInfo(): any

  /**
   * 开启监听：设备服务状态更改
   * @param callback
   */
  export function onServiceStateChanged(callback: Function): any

  /**
   * 取消监听：设备服务状态更改
   * @param callback
   */
  export function offServiceStateChanged(callback: Function): any

  /**
   * 获取GSM网络信息：RAT/PLMN
   */
  export function getNetworkInfo(): any

  /**
   * 获取当前的网络模式
   */
  export function getSeviceSelection(): any

  /**
   * 获取当前注册的运营商信息
   */
  export function getOperatorInfo(): any

  /**
   * 获取GSM 设备信息，如漫游、语音等
   */
  export function getServiceState(): any

  /**
   * 设置网络服务
   */
  export function setSeviceSelection(param: any): any

  /**
   * 设置网络服务商信息
   */
  export function setOperatorInfo(param: any): any

  /**
   * 设置设备的语音、漫游等状态
   */
  export function setServiceState(param: any): any

  /**
   * 获取所有联系人账号信息，SIM卡、设备存储。
   * @param callback
   */
  export function getAllContactInfo(callback: Function): any

  /**
   * 添加联系人账号信息到SIM卡或设备存储
   */
  export function addContactInfo(param: any): any

  /**
   * 修改联系人账号信息
   */
  export function editContactInfo(param: any): any

  /**
   * 删除联系人账号信息
   */
  export function deleteContactInfo(param: any): any

  /**
   * 获取常用（收藏）联系人账号信息。
   * @param callback
   */
  export function getFrequentContactInfo(callback: Function): any

  /**
   * 开启监听：短信或彩信接收
   * @param callback
   * @param option
   */
  export function onReceiveMessage(callback: Function, option: any): any

  /**
   * 取消监听短信或彩信接收状态
   * @param callback
   */
  export function offReceiveMessage(callback: Function): any

  /**
   * 发送短信或彩信
   * @param param
   * @param callback
   */
  export function sendSmsMessage(param: {sms: string, phone: string, option?: number}, callback: Function): any

  /**
   * 获取短信或彩信信息
   * @param param
   */
  export function getSmsMessage(param: any): any

  /**
   * 删除短信或彩信信息
   * @param param
   */
  export function deleteSmsMessage(param: {
    index: number,
    phone?: string,
    callback?: Function,
  }): any

  /**
   * 设置短信或彩信服务中心地址
   * @param param
   */
  export function setSmsService(param: {
    phone: string,
    option?: number,
  }): any

  /**
   * 设置短信或彩信存储位置
   * @param param
   */
  export function setSmsStorage(param: any): any

  /**
   * 开启监听来电状态
   * @param callback
   */
  export function onCallChange(callback: Function): any

  /**
   * 取消监听来电状态
   * @param callback
   */
  export function offCallChange(callback: Function): any

  /**
   * 获取通话状态：接听、线路繁忙、挂断等
   * @param call 绑定的call 对象
   */
  export function getCallState(call: any): any

  /**
   * 暂停（保持）通话
   * @param call 绑定的call 对象
   */
  export function holdCall(call: any): any

  /**
   * 取消暂停（保持）通话
   * @param call 绑定的call 对象
   */
  export function unholdCall(call: any): any

  /**
   * 多方通话
   * @param call 绑定的call 对象
   */
  export function mergeCall(call: any): any

  /**
   * 紧急呼叫
   * @param call 绑定的call 对象
   */
  export function emergencyCall(call: any): any

  /**
   * 接听电话
   * @param call 绑定的call 对象
   */
  export function answerCall(call: any): any

  /**
   * 挂断电话
   * @param call 绑定的call 对象
   */
  export function disconnectCall(call: any): any

  /**
   * 获取通话信息
   * @param call 绑定的call 对象
   */
  export function getCallDetails(call: any): any

  /**
   * 注册通话回调，返回通话状态
   * @param callback
   * @param call 绑定的call 对象
   */
  export function registerCall(callback: Function, call: any): any

  /**
   * 取消通话状态的监听
   * @param callback
   * @param call 绑定的call 对象
   */
  export function unregisterCall(callback: Function, call: any): any

  /**
   * 拒绝通话
   * @param call 绑定的call 对象
   */
  export function rejectCall(call: any): any

  /**
   * 获取历史通话记录
   * @param call 绑定的call 对象
   */
  export function getCallHistory(call: any): any

  /**
   * 设置来电振动、振铃参数
   * @param call 绑定的call 对象
   */
  export function setCallRing(call: any): any

  /**
   * 设置通话音量
   * @param call 绑定的call 对象
   */
  export function setCallVolume(call: any): any

  /**
   * 获取当前通话音量
   */
  export function getCallVolume(): any

  /**
   * 设置振动参数
   */
  export function setVibrate(param: any): any

  /**
   * 通话参数设置
   */
  export function callSetting(param: any): any

  /**
   * 通话过程中输入提示指令
   */
  export function setCallHintCommand(param: any): any

  /**
   * 蓝牙多方通话
   */
  export function bluetoothCall(call: any): any

  /**
   * 获得蓝牙名称
   */
  export function getBluetoothName(call: any): any

  /**
   * 蓝牙拨号
   * @param callback
   */
  export function bluetoothDial(callback: Function): any

  /**
   * 蓝牙挂断
   * @param call
   */
  export function closeBluetoothDial(call: any): any

  /**
   * 拨号
   * @param call
   * @param callback
   */
  export function openDial(call: { phone: string, option?: number }, callback: Function): any

  /**
   * 关闭拨号
   * @param call
   * @param callback
   */
  export function closeDial(call?: { phone: string, option?: number }, callback?: Function): any

  /**
   * 开启监听拨号后的状态
   * @param callback
   */
  export function onDialChange(callback?: Function): any

  /**
   * 取消监听拨号的状态改变
   * @param callback
   */
  export function offDialChange(callback?: Function): any

  /**
   * 设置拨号提示音
   * @param ring
   */
  export function setDialRing(ring: any): any

  /**
   * 返回一个常数，指示默认SIM卡的状态
   */
  export function getSimState(): any

  /**
   * 设置SIM卡PIN码
   * @param code SIM卡PIN码
   */
  export function setSimPINCode(code: any): any

  /**
   * 获取SIM卡PIN码状态
   */
  export function getSimPINCodeStatus(): any

  /**
   * 添加SIM卡、ESIM卡
   * @param param SIM卡、ESIM卡
   */
  export function addSimCard(param: any): any

  /**
   * 添删除SIM卡、ESIM卡
   * @param param SIM卡、ESIM卡
   */
  export function deleteSimCard(param: any): any

  /**
   * 激活SIM卡、ESIM卡
   * @param param SIM卡、ESIM卡
   */
  export function activeSimCard(param: any): any

  /**
   * 反激活SIM卡、ESIM卡
   * @param param SIM卡、ESIM卡
   */
  export function deactiveSimCard(param: any): any

  /**
   * 获取SIM卡MEID
   * @param param SIM卡、ESIM卡
   */
  export function getMEID(param: any): any

  /**
   * 获取SIM卡ICCID
   * @param param SIM卡、ESIM卡
   */
  export function getIccID(param: any): any

  /**
   * 获取SIM卡MCC
   * @param param SIM卡、ESIM卡
   */
  export function getMCC(param: any): any

  /**
   * 获取SIM卡MNC
   * @param param SIM卡、ESIM卡
   */
  export function getMNC(param: any): any

  /**
   * 获取SIM卡SPN
   * @param param SIM卡、ESIM卡
   */
  export function getSPN(param: any): any

  /**
   * 获取SIM卡GID
   * @param param SIM卡、ESIM卡
   */
  export function getGID(param: any): any

  /**
   * esimLPA 设置
   * @param esim
   */
  export function esimLPA(esim: any): any

  /**
   * 获取网络接入点：APN
   */
  export function getAPN(): any

  /**
   * 设置网络接入点：APN
   * @param apn
   */
  export function setAPN(apn: any): any

  /**
   * 返回一个IMEI号，类型string，如 “357396012183170”
   */
  export function getIMEI(): string

  /**
   * 设置IMEI号，类型string，如 “357396012183170”
   * @param imei
   */
  export function setIMEI(imei: string): string

  /**
   * 返回一个international mobile subscriber identity号，类型string，如 “460010222028133”
   */
  export function getIMSI(): string

  /**
   * 设置飞行模式
   * @param param
   */
  export function setAirPlaneMode(param: any): string

  /**
   * 设置正常模式
   */
  export function setNormalMode(): any

  /**
   * 返回 level of functionality in the ME。
   */
  export function getFunctionality(): number

  /**
   * 设置 level of functionality in the ME。
   * @param param
   */
  export function setFunctionality(param: any): any

  /**
   * 返回网络注册状态
   */
  export function getNetworkRegistration(): any

  /**
   * 设置飞行模式
   * @param callback
   */
  export function openDataService(callback: Function): any

  /**
   * 关闭数据服务
   * @param callback
   */
  export function closeDataService(callback: Function): any

  /**
   * 获取数据服务开启状态
   */
  export function getDataServiceStatus(): any

  /**
   * 查询是否能访问外部网络
   */
  export function getNetworkAccessStatus(): any

  /**
   * 开启modem功能
   * @param callback
   */
  export function openModem(callback: Function): any

  /**
   * 关闭modem功能
   * @param callback
   */
  export function closeModem(callback: Function): any

  /**
   * 获取当前modem状态
   * @param modem
   */
  export function getModemStatus(modem: any): any

  /**
   * 开启数据流量监控
   * @param callback
   */
  export function dataFlowOnchange(callback: Function): any

  /**
   * 关闭数据流量监控
   * @param callback
   */
  export function dataFlowOffchange(callback: Function): any

  /**
   * 开启高清语音通话
   * @param callback
   */
  export function enableVolte(callback: Function): any

  /**
   * 开启监听：高清语音通话 状态改变
   * @param callback
   */
  export function onImsStateChanged(callback: Function): any

  /**
   * 取消监听：高清语音通话 状态改变
   * @param callback
   */
  export function offImsStateChanged(callback: Function): any

  /**
   * 获取高清语音通话状态
   */
  export function getImsState(): any
}
