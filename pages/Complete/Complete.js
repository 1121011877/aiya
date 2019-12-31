// pages/detail/detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ishidden: false,
    user: {},
    mark: false,
    isadd: "",
    hiddenpeople: true,
    // job详细信息
    jobDetail: null,
    // 返回的病人信息
    jobuser: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   jobDetail: JSON.parse(options.jobDetail)
    // })
    // console.log("detail:jobDetail: ", this.data.jobDetail);
    // this.showUser();
  },

  // 添加病人按钮
  // addpeople: function () {
  //   // 弹出搜索部分
  //   this.setData({
  //     ishidden: !this.data.ishidden
  //   })
  // },
  // 输入手机号搜索
  submit: function (e) {
    var that = this;
    var phone_number = e.detail.value.phone;
    // phone_number=123;
    console.log("phone: " + phone_number);
    wx.request({
      url: app.globalData.localpath + '/aiya/user',
      method: 'get',
      data: { phone_number },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        if (res.data != "") {
          that.setData({
            user: res.data,
            mark: true
          })
        } else {
          that.setData({
            mark: false,
            hiddenpeople: false
          })
        }
        console.log(that.data.user);
      }
    })
  },
  // 点击病人信息修改病人详细信息
  changeuser: function () {
    var that = this;
    var userjson = JSON.stringify(that.data.user);
    this.setData({
      isadd: true
    }),
    
      wx.navigateTo({
      url: '../../pages/ChangeUser/ChangeUser?knownUser=' + userjson,
      })
      // wx.request({
      //   url: app.globalData.localpath + '',
      //   method: 'post',
      //   header: {
      //     'content-type': 'application/json'
      //   },
      //   data: {},
      //   success: function (res) {
      //     console.log(res);
      //     if (res.data.code == 0) {
      //       wx.showToast({
      //         title: '添加失败！',
      //         icon: 'loading',
      //         duration: 1500
      //       })
      //     } else {
      //       wx.showToast({
      //         title: '添加成功！',
      //         icon: 'success',
      //         duration: 1000
      //       })
      //       that.showUser();
      //     }
      //   }
      // })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})