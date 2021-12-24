declare interface videoPlayer {
  /**
   * 退出全屏模式
   */
  exitFullScreen(): void

  /**
   * 进入全屏模式
   */
  requestFullScreen(): void

  /**
   * 播放视频
   */
  play(): void

  /**
   * 暂停视频
   */
  pause(): void

  /**
   * 跳转到指定位置
   * @param position 需要跳转到的位置
   */
  seek(position: number): void

  /**
   * 停止视频播放
   */
  stop(): void
}
