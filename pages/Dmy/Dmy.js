const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {


    items: [
      {
        icon: '../../img/icon_job_publish.png',
        text: '添加疾病种类',
        path: 'post'
      },
      {
        icon: '../../img/icon_job_continue.png',
        text: '已添加疾病种类',
        path: 'continue'
      },
      {
        icon: '../../img/icon_job_complete.png',
        text: '完善病人信息',
        path: 'complete',
      },
    ],
  
    message: [{
      icon: '../../img/icon_message.png',
      text: '消息通知',
      path: 'message'
    }],
    // // 医生id
    // doctorId:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success(res) { }
          })
        }
      }
    })
  },
  jump: function (e) {
    var type = e.currentTarget.dataset.text
    var urldata = '../../pages/out/out'
    console.log(type)
    if(type=="post"){
      var urldata ='../../pages/out/out'
    }
    else if(type=="continue"){
      var urldata = '../../pages/Areadyout/Areadyout'
    }
    else if(type=="complete"){
      var urldata = '../../pages/Complete/Complete'
    }
    wx.navigateTo({
      url: urldata,
    })
  },

  jump1: function (e) {
    wx.navigateTo({
      url: '../../pages/message/message',
    })
  },

  jump2: function (e) {
    wx.navigateTo({
      url: '../../pages/account/account',
    })
  },

})