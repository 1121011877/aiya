var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '获取验证码', //按钮文字
    currentTime: 61, //倒计时
    disabled: false, //按钮是否禁用
    phone: '', //获取到的手机栏中的值
    VerificationCode: '',
    Code: '',
    NewChanges: '',
    NewChangesAgain: '',
    success: false,
    state: ''
  },
  /**
    * 获取验证码
    */

    tijiao(){
      wx.redirectTo({
        url: '../Ucenter/Ucenter',
      })
    },
  return_home: function (e) {
    wx.navigateTo({
      url: '/pages/login/login',
    })

  },
  handleInputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  handleVerificationCode: function (e) {
    console.log(e);
    this.setData({
      Code: e.detail.value
    })
  },
  handleNewChanges: function (e) {
    console.log(e);
    this.setData({
      NewChanges: e.detail.value
    })
  },
  handleNewChangesAgain: function (e) {
    console.log(e);
    this.setData({
      NewChangesAgain: e.detail.value
    })

  },
  submit: function (e) {
    if (e.detail.value.userName == '') {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else if (e.detail.value.userAge == '') {
      wx.showToast({
        title: '年龄不能为空',
        icon: 'loading',
        duration: 2000
      })
    }else if (e.detail.value.userPhone == '') {
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'loading',
        duration: 2000
      })
    }else {
      console.log(e.detail.value);
      var user = e.detail.value;
      user.userOpenid = app.globalData.openid;
      console.log(user);
      wx.request({
        //url: 'http://47.100.248.211:7230/aiya/user/save',
        url: app.globalData.localpath +'/aiya/user/save',
        method: "POST",
        data:user,
        header: {
          "content-type": "application/json"
        },
        //成功
        success: function (res) {
          console.log(res);
          
          if (res.data.code == 2) {
            wx.showToast({
              title: res.data.msg,
              icon: 'loading',
              duration: 1500
            })
          } else if (res.data.code == 0){
            wx.showToast({
              title: '提交成功！',
              icon: 'success',
              duration: 1000
            }),
            app.globalData.userId = res.data.data.userId;
            //跳转到病人个人中心
            wx.redirectTo({
              url: '../Ucenter/Ucenter',
            })
          } else if (res.data.code != 0) {
            wx.showToast({
              title: '提交失败！',
              icon: 'loading',
              duration: 1500
            })
          }
        }
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})