/**
 * 运用场景：启动小程序时，启动页可能会根据app.js执行的结果来进行后续操作
 * 如：app.js中有异步请求，启动页监听某个值来执行相应的函数
 */

// app.js自定义watch函数
// App()表示注册一个小程序，必须在app.js中调用，并且只能调用一次
App({
  watch: function(cb) {
    const obj = this.globalData;
    Object.defineProperty(obj, 'isRestart', {
      configurable: true,
      enumerable: true,
      set: function(val) {
        this._isRestart = val;
        cb(val);
      },
      get: function() {
        return this._isRestart;
      }
    })
  },
  globalData: {
    _isRestart: false
  }
})

// 首页监听 isRestart 来进行后续操作
Page({
  data: {
    showShareModal: false
  },
  onLoad: function () {
    getApp().watch(this.watchBack)
  },
  watchBack(val) {
    this.setData({ showShareModal: val })
  }
})
