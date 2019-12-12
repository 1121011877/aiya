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
    state: '',
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var that = this;
    // that.setData({
    //   dCode: options.dCode,
    // })
  },
  onUnload: function () {
    // wx.navigateTo({
    //   url: '../in/in',//指定界面
    // })
  },
  /**
    * 获取验证码
    */
    tijiao: function(){
      wx.redirectTo({
        url: '../Dmy/Dmy',
      })

    },
  // return_home: function (e) {
  //   wx.navigateTo({
  //     url: '/pages/login/login',
  //   })

  // },
   handleInputPhone: function (e) {
     this.setData({
       phone: e.detail.value
     })
  },
  handleVerificationCode: function (e) {
   // console.log(e);
    this.setData({
      Code: e.detail.value
    })
  },
  handleNewChanges: function (e) {
    //console.log(e);
    this.setData({
      NewChanges: e.detail.value
    })
  },
  handleNewChangesAgain: function (e) {
   // console.log(e);
    this.setData({
      NewChangesAgain: e.detail.value
    })

  },
  // 提交表单
  submit: function(e){
    // 判断文字内容
    if (e.detail.value.dName.length == 0 || e.detail.value.dName.length>=8){
      wx.showToast({
        title: '姓名不能为空或过长！',
        icon: 'none',
        duration: 1500
      })
    }else if(e.detail.value.dPhone.length == 0){
      wx.showToast({
        title: '手机号不能为空！',
        icon: 'none',
        duration: 1500
      })
    }else if(e.detail.value.dMail.length == 0){
      wx.showToast({
        title: '邮箱不能为空！',
        icon: 'none',
        duration: 1500
      })}
    // else if(e.detail.value.dHospital.length == 0){
    //   wx.showToast({
    //     title: '医院不能为空！',
    //     icon: 'none',
    //     duration: 1500
    //   })
    // }else if (e.detail.value.dOffice.length == 0) {
    //   wx.showToast({
    //     title: '科室不能为空！',
    //     icon: 'none',
    //     duration: 1500
    //   })
    // }
    else{
      var doctor=e.detail.value;
      doctor.dHospital = "第四军医大口腔医院";
      doctor.dOffice = "口腔科";
      doctor.dOpenid = app.globalData.openid;
      console.log(doctor);
      console.log("dOpenid: "+doctor.dOpenid);
      wx.request({
        url: app.globalData.localpath +'/aiya/doctor/save',
        header: {
          "Content-Type": "application/json"
        },
        method: "POST",
        data:doctor,
        success: function(res){
          console.log(res.data);
          if(res.data.code == 2){
            wx.showToast({
              title: res.data.msg,
              icon: 'loading',
              duration: 1500
            })
          }else if(res.data.code == 0){
            wx.showToast({
              title: '提交成功！',
              icon: 'success',
              duration: 1000
            }),
            app.globalData.doctorId = res.data.data.dId;
            //跳转到医生个人中心
            wx.redirectTo({
              url: '../Dmy/Dmy',
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