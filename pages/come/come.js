const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) { }
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
  bindGetUserInfo: function (e) {
    var js_code
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      wx.getUserInfo({
        success(res) {
          var nickname = res.userInfo.nickName
          var avatarUrl = res.userInfo.avatarUrl
        }
      })
      wx.login({
       /* success: function (res) {
          wx.request({
            //获取openid接口
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: app.globalData.appid,
              secret: app.globalData.secret,
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            
            method: 'GET',
            success: function (res) {
              console.log(res.data)
              app.globalData.openid = res.data.openid;//获取到的openid
              app.globalData.session_key = res.data.session_key;//获取到session_key
              console.log(app.globalData.appid)
              console.log(app.globalData.session_key)
            }
          })
        }*/
        success (res) {
          var code = res.code;//登录凭证
          console.log(res.code);
          if (code) {
            //2、调用获取用户信息接口
            wx.getUserInfo({
              success: function (res) {
                console.log({ encryptedData: res.encryptedData, iv: res.iv, code: code })
                //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
                wx.request({
                  // url: 'http://47.100.248.211:8080/Test_OpenId/getopenid',//自己的服务接口地址
                  url: 'https://www.fourmbkf.xyz/Test_OpenId/getopenid',//自己的服务接口地址
                  method: 'get',
                  header: {
                    "Content-Type": "applciation/json"
                  },
                  data: { 
                   // encryptedData: res.encryptedData,
                    // iv: res.iv, 
                     code: code,
                   // wxspappid: app.globalData.appid,
                   // wxspsecret:app.globalData.secret
                     },

                  success: function (data) {
                      console.log(data); 
                      app.globalData.openId=data.data.openid;
                    console.log(app.globalData.openId); 

                      
                    //4.解密成功后 获取自己服务器返回的结
                  },
                  fail: function () {
                    console.log('系统错误')
                  }
                })
              },
              fail: function () {
                console.log('获取用户信息失败')
              }
            })
          } else {
            console.log('获取用户登录态失败！' + r.errMsg)
          }
        },
        fail: function () {
          console.log('登陆失败')
        }


      })
      wx.redirectTo({
        url: '../in/in',
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
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