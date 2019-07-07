const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {}
          })
        }
      },
      fail: function (res) {
        wx.navigateTo({
          url: '../../pages/error/error'
        })
      },
    })
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var nickname
      var avatarUrl
      var code
      var flag
      wx.getUserInfo({
        success(res) {
          nickname = res.userInfo.nickName
          avatarUrl = res.userInfo.avatarUrl
        }
      })
      wx.login({
        success(res) {
          if (res.code) {
            code = res.code
            // 发起网络请求
            //判断是否已注册
            wx.request({
              url: app.globalData.URL + "/user/login_find",
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                code: code,
              },
              success: function(res) {
                
                //未注册则注册
                if (!res.data) {
                  
                  wx.request({
                    url: app.globalData.URL + "/user/login",
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                      code: code,
                      name: nickname,
                      avatarUrl: avatarUrl
                    },
                    success: function(res) {

                      console.log(res.data)

                      if (res.data == "null") {
                        wx.switchTab({
                          url: '../error/error',
                        })
                      } else {
                        app.globalData.openid = res.data

                        wx.switchTab({
                          url: '../index/index',
                        })
                      }
                    },
                    fail:function(){
                      
                      wx.switchTab({
                        url: '../error/error',
                      })
                    },
                  })
                } else {
                  app.globalData.openid = res.data
                  console.log("")
                  wx.switchTab({
                    url: '../index/index',
                  })
                }
              },
              fail: function() {
                
                wx.switchTab({
                  url: '../error/error',
                })
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        },
        fail: function (res) {
          wx.navigateTo({
            url: '../../pages/error/error'
          })
        },
      })
    }
  },
})