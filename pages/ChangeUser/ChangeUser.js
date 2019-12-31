// pages/ChangeUser/ChangeUser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    knownUser:{},
    userName:'',
    userPhone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      // knownUser: JSON.parse(options.knownUser)
      knownUser: JSON.parse(options.knownUser),
   })
   this.setData({
     userName: this.data.knownUser.userName,
     userPhone: this.data.knownUser.userPhone
   })
    console.log(this.data.knownUser);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

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
    } else if (e.detail.value.userPhone == '') {
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      console.log(e.detail.value);
      var user = e.detail.value;
      user.userOpenid = app.globalData.openid;
      console.log(user);
      wx.request({
        //url: 'http://47.100.248.211:7230/aiya/user/save',
        url: app.globalData.localpath + '/aiya/user/save',
        method: "POST",
        data: user,
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
          } else if (res.data.code == 0) {
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